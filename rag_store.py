# -*- coding: utf-8 -*-
"""Lightweight RAG over Feishu knowledge markdown (no vector DB dependency).

Design follows the ingested RAG handbook: ingest → sliding-window chunk →
sparse retrieve (BM25) → inject into generation. Embedding/vector store can
be swapped in later without changing the Agent call sites.
"""
from __future__ import annotations

import math
import re
import threading
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List, Optional, Tuple

BASE_DIR = Path(__file__).resolve().parent
KB_DIR = BASE_DIR / "knowledge" / "feishu"

# Noise lines left by Feishu block dump heuristics
_NOISE = re.compile(
    r"^(heading\d+|bullet|ordered|divider|callout|page|center|left|right|"
    r"image(\.png)?|image/png|text|sheet|auto|fire|rgb\([^)]+\)|"
    r"[0-9a-f]{4,8}|Overview|Indexing)$",
    re.I,
)


@dataclass
class Chunk:
    id: str
    source: str
    title: str
    text: str
    tokens: List[str]


def _clean_doc(text: str) -> str:
    lines = []
    for raw in (text or "").splitlines():
        s = raw.strip()
        if not s:
            continue
        if _NOISE.fullmatch(s):
            continue
        if s.startswith(">") and ("wiki_token" in s or "obj_token" in s or "分享密码" in s):
            continue
        lines.append(s)
    return "\n".join(lines)


def _tokenize(text: str) -> List[str]:
    text = (text or "").lower()
    # CJK chars as unigrams + bigrams; latin/digits as words
    toks: List[str] = []
    for m in re.finditer(r"[\u4e00-\u9fff]+|[a-z0-9_#+.-]+", text):
        w = m.group(0)
        if re.fullmatch(r"[\u4e00-\u9fff]+", w):
            toks.extend(list(w))
            if len(w) >= 2:
                toks.extend(w[i : i + 2] for i in range(len(w) - 1))
        else:
            if len(w) >= 2:
                toks.append(w)
    return toks


def _sliding_chunks(text: str, size: int = 500, overlap: int = 100) -> List[str]:
    """Sliding-window chunking as described in RAG handbook."""
    text = re.sub(r"\n{3,}", "\n\n", text).strip()
    if not text:
        return []
    if len(text) <= size:
        return [text]
    step = max(1, size - overlap)
    out: List[str] = []
    for i in range(0, len(text), step):
        piece = text[i : i + size].strip()
        if len(piece) < 40:
            continue
        out.append(piece)
        if i + size >= len(text):
            break
    return out


class KnowledgeRAG:
    def __init__(self, kb_dir: Path = KB_DIR):
        self.kb_dir = kb_dir
        self.chunks: List[Chunk] = []
        self.df: Dict[str, int] = {}
        self.avgdl: float = 0.0
        self._lock = threading.Lock()
        self._loaded = False

    def ensure_loaded(self) -> None:
        if self._loaded:
            return
        with self._lock:
            if self._loaded:
                return
            self._build()
            self._loaded = True

    def reload(self) -> dict:
        with self._lock:
            self._build()
            self._loaded = True
        return self.stats()

    def stats(self) -> dict:
        sources = sorted({c.source for c in self.chunks})
        return {
            "docs": len(sources),
            "chunks": len(self.chunks),
            "sources": sources,
            "kb_dir": str(self.kb_dir),
        }

    def _build(self) -> None:
        self.chunks = []
        self.df = {}
        files = sorted(self.kb_dir.glob("*.md")) if self.kb_dir.exists() else []
        for fp in files:
            if fp.name.startswith("_"):
                continue
            raw = fp.read_text(encoding="utf-8", errors="ignore")
            title = fp.stem
            m = re.search(r"^#\s+(.+)$", raw, re.M)
            if m:
                title = m.group(1).strip()
            cleaned = _clean_doc(raw)
            for i, piece in enumerate(_sliding_chunks(cleaned, size=520, overlap=120)):
                toks = _tokenize(piece)
                if len(toks) < 8:
                    continue
                ch = Chunk(
                    id=f"{fp.stem}#{i}",
                    source=fp.stem,
                    title=title,
                    text=piece,
                    tokens=toks,
                )
                self.chunks.append(ch)
                for t in set(toks):
                    self.df[t] = self.df.get(t, 0) + 1
        n = len(self.chunks) or 1
        self.avgdl = sum(len(c.tokens) for c in self.chunks) / n

    def search(self, query: str, top_k: int = 5) -> List[dict]:
        self.ensure_loaded()
        q_toks = _tokenize(query)
        if not q_toks or not self.chunks:
            return []
        # BM25
        k1, b = 1.5, 0.75
        N = len(self.chunks)
        scores: List[Tuple[float, Chunk]] = []
        q_set = set(q_toks)
        for ch in self.chunks:
            # cheap prefilter: require at least one query token hit
            if not (q_set & set(ch.tokens)):
                continue
            tf: Dict[str, int] = {}
            for t in ch.tokens:
                tf[t] = tf.get(t, 0) + 1
            score = 0.0
            dl = len(ch.tokens)
            for t in q_toks:
                if t not in tf:
                    continue
                df = self.df.get(t, 0) or 1
                idf = math.log(1 + (N - df + 0.5) / (df + 0.5))
                freq = tf[t]
                denom = freq + k1 * (1 - b + b * dl / (self.avgdl or 1))
                score += idf * (freq * (k1 + 1)) / denom
            if score > 0:
                scores.append((score, ch))
        scores.sort(key=lambda x: x[0], reverse=True)
        # diversify by source
        picked: List[Tuple[float, Chunk]] = []
        seen_src: Dict[str, int] = {}
        for sc, ch in scores:
            if seen_src.get(ch.source, 0) >= 2:
                continue
            seen_src[ch.source] = seen_src.get(ch.source, 0) + 1
            picked.append((sc, ch))
            if len(picked) >= top_k:
                break
        if len(picked) < top_k:
            for sc, ch in scores:
                if any(ch.id == p.id for _, p in picked):
                    continue
                picked.append((sc, ch))
                if len(picked) >= top_k:
                    break
        return [
            {
                "id": ch.id,
                "source": ch.source,
                "title": ch.title,
                "text": ch.text[:900],
                "score": round(sc, 4),
            }
            for sc, ch in picked
        ]

    def format_context(self, hits: List[dict], max_chars: int = 4500) -> str:
        if not hits:
            return ""
        parts = []
        used = 0
        for i, h in enumerate(hits, 1):
            block = f"### [{i}] {h['title']}（{h['source']}）\n{h['text']}"
            if used + len(block) > max_chars:
                break
            parts.append(block)
            used += len(block)
        return "\n\n".join(parts)


_rag: Optional[KnowledgeRAG] = None


def get_rag() -> KnowledgeRAG:
    global _rag
    if _rag is None:
        _rag = KnowledgeRAG()
    return _rag
