# -*- coding: utf-8 -*-
"""联网岗位检索：优先公司官方招聘 API（真实岗位 URL + 完整 JD），搜索引擎为辅。

可被 FastAPI 与本地 MCP 工具共用。
"""
from __future__ import annotations

import json
import os
import re
import time
import urllib.error
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import asdict, dataclass
from html import unescape
from typing import Dict, Iterable, List, Optional, Sequence, Set

UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
)

JOB_SITES = [
    {"id": "tencent", "name": "腾讯招聘", "domain": "careers.tencent.com"},
    {"id": "jd", "name": "京东招聘", "domain": "zhaopin.jd.com"},
    {"id": "remotive", "name": "Remotive", "domain": "remotive.com"},
    {"id": "jobicy", "name": "Jobicy", "domain": "jobicy.com"},
    {"id": "zhipin", "name": "BOSS直聘", "domain": "zhipin.com"},
    {"id": "liepin", "name": "猎聘", "domain": "liepin.com"},
    {"id": "lagou", "name": "拉勾", "domain": "lagou.com"},
]

FAME_TIERS: Dict[str, List[str]] = {
    "large": [
        "字节跳动", "字节", "抖音", "TikTok", "阿里巴巴", "阿里", "蚂蚁", "淘宝", "天猫", "高德",
        "腾讯", "微信", "华为", "华为云", "百度", "美团", "京东", "拼多多", "PDD", "网易",
        "小米", "快手", "哔哩哔哩", "B站", "滴滴", "微软", "Microsoft", "Google", "谷歌",
        "Apple", "苹果", "Amazon", "亚马逊", "NVIDIA", "英伟达", "Meta", "OpenAI",
        "商汤", "旷视", "依图", "云从", "科大讯飞", "寒武纪", "地平线", "理想汽车", "蔚来",
        "小鹏", "比亚迪", "宁德时代", "中兴", "中国移动", "中国电信", "中国联通",
        "工商银行", "建设银行", "招商银行", "平安", "人保",
    ],
    "mid": [
        "小红书", "得物", "识装", "知乎", "携程", "同程", "去哪儿", "贝壳", "链家",
        "顺丰", "满帮", "货拉拉", "叮咚买菜", "瑞幸", "米哈游", "莉莉丝", "完美世界",
        "三七互娱", "网易游戏", "盛趣", "OPPO", "vivo", "传音", "大疆", "DJI",
        "用友", "金蝶", "金山", "WPS", "360", "奇虎", "搜狐", "新浪", "微博",
        "汽车之家", "途虎", "贝壳找房", "Keep", "喜马拉雅", "荔枝", "虎牙", "斗鱼",
        "阅文", "中文在线", "中科创达", "涂鸦智能", "云从科技", "第四范式", "明略科技",
        "汇川", "汇川技术", "中兴通讯", "海康威视", "大华", "商越", "Shopee", "SHEIN",
        "Temu", "Lazada", "Grab", "Uber", "Salesforce", "Oracle", "SAP", "IBM",
        "Thoughtworks", "埃森哲", "德勤", "PwC", "KPMG", "EY",
    ],
}

# 常用公司预设（含别名，便于筛选）
COMPANY_PRESETS: List[dict] = [
    {"name": "腾讯", "aliases": ["腾讯", "微信", "Tencent", "混元", "元宝"], "fetcher": "tencent"},
    {"name": "京东", "aliases": ["京东", "JD", "京东零售", "京东物流"], "fetcher": "jd"},
    {"name": "字节跳动", "aliases": ["字节跳动", "字节", "抖音", "TikTok", "飞书"], "fetcher": ""},
    {"name": "阿里巴巴", "aliases": ["阿里巴巴", "阿里", "蚂蚁", "淘宝", "天猫", "高德", "钉钉"], "fetcher": ""},
    {"name": "美团", "aliases": ["美团", "美团点评"], "fetcher": ""},
    {"name": "百度", "aliases": ["百度", "Baidu"], "fetcher": ""},
    {"name": "华为", "aliases": ["华为", "华为云", "Huawei"], "fetcher": ""},
    {"name": "网易", "aliases": ["网易", "网易游戏", "NetEase"], "fetcher": ""},
    {"name": "小米", "aliases": ["小米", "Xiaomi"], "fetcher": ""},
    {"name": "快手", "aliases": ["快手", "Kuaishou"], "fetcher": ""},
    {"name": "拼多多", "aliases": ["拼多多", "PDD", "Temu"], "fetcher": ""},
    {"name": "小红书", "aliases": ["小红书", "RED"], "fetcher": ""},
    {"name": "得物", "aliases": ["得物", "识装"], "fetcher": ""},
    {"name": "米哈游", "aliases": ["米哈游", "miHoYo"], "fetcher": ""},
    {"name": "大疆", "aliases": ["大疆", "DJI"], "fetcher": ""},
    {"name": "微软", "aliases": ["微软", "Microsoft"], "fetcher": ""},
    {"name": "NVIDIA", "aliases": ["NVIDIA", "英伟达"], "fetcher": ""},
]

_COMPANY_ALIAS_MAP: Dict[str, List[str]] = {}
for _p in COMPANY_PRESETS:
    _COMPANY_ALIAS_MAP[_p["name"]] = list(_p["aliases"])
    for _a in _p["aliases"]:
        _COMPANY_ALIAS_MAP.setdefault(_a, list(_p["aliases"]))


def expand_company_aliases(companies: Sequence[str]) -> List[str]:
    """把用户输入的公司名扩展为别名列表（去重保序）。"""
    out: List[str] = []
    seen: Set[str] = set()
    for raw in companies or []:
        name = (raw or "").strip()
        if not name:
            continue
        aliases = _COMPANY_ALIAS_MAP.get(name) or [name]
        # 也尝试模糊：用户写「字节」命中预设
        if aliases == [name]:
            for p in COMPANY_PRESETS:
                if name in p["aliases"] or name in p["name"] or p["name"] in name:
                    aliases = list(p["aliases"])
                    break
        for a in aliases:
            key = a.lower()
            if key not in seen:
                seen.add(key)
                out.append(a)
        if name.lower() not in seen:
            seen.add(name.lower())
            out.append(name)
    return out


def hit_matches_companies(hit: "JobHit", aliases: Sequence[str]) -> bool:
    if not aliases:
        return True
    blob = f"{hit.company_guess} {hit.title} {hit.source} {hit.jd_text} {hit.url}".lower()
    return any((a or "").lower() in blob for a in aliases if a)


def list_company_presets() -> List[dict]:
    return [{"name": p["name"], "aliases": p["aliases"]} for p in COMPANY_PRESETS]


@dataclass
class JobHit:
    title: str
    url: str
    snippet: str
    source: str
    company_guess: str = ""
    fame_tier: str = "small"  # large | mid | small
    fame_label: str = "小厂"
    jd_text: str = ""
    salary: str = ""
    city: str = ""
    match_score: str = ""
    match_reason: str = ""


_JOB_DETAIL_RES = [
    re.compile(r"zhipin\.com/job_detail/[A-Za-z0-9_\-]+\.html", re.I),
    re.compile(r"liepin\.com/(?:job|a)/\d+", re.I),
    re.compile(r"lagou\.com/jobs/\d+", re.I),
    re.compile(r"zhaopin\.com/(?:jobdetail|jobs)/\S+", re.I),
    re.compile(r"51job\.com/[^\s\"']+\.html", re.I),
    re.compile(r"nowcoder\.com/jobs/(?:detail|)\d+", re.I),
    re.compile(r"linkedin\.com/jobs/view/\d+", re.I),
    re.compile(r"maimai\.cn/job/(?:b|)\w+", re.I),
    re.compile(r"jobs\.bytedance\.com/\S+/position/\S+", re.I),
    re.compile(r"careers\.tencent\.com/jobdesc\.html\?postId=", re.I),
    re.compile(r"zhaopin\.jd\.com/web/job_detail\?positionId=\d+", re.I),
    re.compile(r"talent\.alibaba\.com/off-campus/position-detail\S+", re.I),
    re.compile(r"remotive\.com/remote-jobs/", re.I),
    re.compile(r"jobicy\.com/job/", re.I),
    re.compile(r"arbeitnow\.com/view/", re.I),
]


def is_job_posting_url(url: str) -> bool:
    u = (url or "").strip()
    if not u.startswith("http"):
        return False
    low = u.lower()
    if any(
        b in low
        for b in (
            "javascript:",
            "sogou.com/web",
            "so.com/s",
            "/web/geek/job?",
            "sou.zhaopin.com",
            "/jobs/center",
            "/jobs/search?",
        )
    ):
        return False
    if re.search(r"https?://[^/]+/?$", u) and any(
        x in low for x in ("career", "talent", "zhaopin", "hr.", "jobs.")
    ):
        return False
    return any(p.search(u) for p in _JOB_DETAIL_RES)


def clean_private_use(text: str) -> str:
    return re.sub(r"[\ue000-\uf8ff]", "", text or "").strip()


def fame_label(tier: str) -> str:
    return {"large": "大厂", "mid": "中厂", "small": "小厂"}.get(tier, "小厂")


def classify_fame(text: str) -> tuple[str, str, str]:
    t = text or ""
    for brand in FAME_TIERS["large"]:
        if brand and brand.lower() in t.lower():
            return "large", "大厂", brand
    for brand in FAME_TIERS["mid"]:
        if brand and brand.lower() in t.lower():
            return "mid", "中厂", brand
    return "small", "小厂", ""


def _http_get(url: str, timeout: int = 18, headers: Optional[dict] = None) -> str:
    h = {"User-Agent": UA, "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8"}
    if headers:
        h.update(headers)
    req = urllib.request.Request(url, headers=h)
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return resp.read().decode("utf-8", "ignore")


def _http_json(
    url: str,
    method: str = "GET",
    data: Optional[dict] = None,
    headers: Optional[dict] = None,
    timeout: int = 25,
):
    h = {
        "User-Agent": UA,
        "Accept": "application/json,text/plain,*/*",
        "Accept-Language": "zh-CN,zh;q=0.9",
    }
    if headers:
        h.update(headers)
    body = None
    if data is not None:
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        h.setdefault("Content-Type", "application/json")
    req = urllib.request.Request(url, data=body, headers=h, method=method)
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return json.loads(resp.read().decode("utf-8", "ignore"))


def _strip_tags(html: str) -> str:
    s = re.sub(r"<script[\s\S]*?</script>", " ", html, flags=re.I)
    s = re.sub(r"<style[\s\S]*?</style>", " ", s, flags=re.I)
    s = re.sub(r"<[^>]+>", " ", s)
    s = unescape(s)
    return re.sub(r"\s+", " ", s).strip()


def _https(url: str) -> str:
    u = (url or "").strip()
    if u.startswith("http://"):
        return "https://" + u[len("http://") :]
    return u


def _compose_jd(*parts: str) -> str:
    chunks = []
    for p in parts:
        t = (p or "").strip()
        if t:
            chunks.append(t)
    return "\n\n".join(chunks).strip()


# ── 官方招聘 API（真实岗位页 + 完整 JD）────────────────────

def fetch_tencent_jobs(keyword: str, limit: int = 12) -> List[JobHit]:
    ts = int(time.time() * 1000)
    q = urllib.parse.quote((keyword or "工程师").strip() or "工程师")
    url = (
        f"https://careers.tencent.com/tencentcareer/api/post/Query?timestamp={ts}"
        f"&keyword={q}&pageIndex=1&pageSize={min(limit, 20)}&language=zh-cn&area=cn"
    )
    try:
        data = _http_json(url, headers={"Referer": "https://careers.tencent.com/"})
    except Exception:
        return []
    posts = ((data.get("Data") or {}).get("Posts") or [])[:limit]
    hits: List[JobHit] = []

    def _detail(pid: str) -> dict:
        try:
            durl = (
                f"https://careers.tencent.com/tencentcareer/api/post/ByPostId"
                f"?timestamp={int(time.time()*1000)}&postId={pid}&language=zh-cn"
            )
            d = _http_json(durl, headers={"Referer": "https://careers.tencent.com/"})
            return (d.get("Data") or {}) if isinstance(d, dict) else {}
        except Exception:
            return {}

    details: Dict[str, dict] = {}
    with ThreadPoolExecutor(max_workers=6) as ex:
        futs = {ex.submit(_detail, str(p.get("PostId") or "")): p for p in posts if p.get("PostId")}
        for fut in as_completed(futs):
            p = futs[fut]
            pid = str(p.get("PostId") or "")
            try:
                details[pid] = fut.result() or {}
            except Exception:
                details[pid] = {}

    for p in posts:
        pid = str(p.get("PostId") or "")
        det = details.get(pid) or {}
        title = det.get("RecruitPostName") or p.get("RecruitPostName") or ""
        resp = det.get("Responsibility") or p.get("Responsibility") or ""
        req = det.get("Requirement") or ""
        jd = _compose_jd(
            f"【岗位职责】\n{resp}" if resp else "",
            f"【任职要求】\n{req}" if req else "",
        )
        post_url = _https(det.get("PostURL") or p.get("PostURL") or "")
        if not post_url and pid:
            post_url = f"https://careers.tencent.com/jobdesc.html?postId={pid}"
        city = det.get("LocationName") or p.get("LocationName") or ""
        years = det.get("RequireWorkYearsName") or ""
        if years:
            jd = _compose_jd(jd, f"【经验要求】\n{years}")
        hits.append(
            JobHit(
                title=title,
                url=post_url,
                snippet=(resp or "")[:240],
                source="腾讯招聘",
                company_guess="腾讯",
                fame_tier="large",
                fame_label="大厂",
                jd_text=jd,
                city=city,
            )
        )
    return hits


def fetch_jd_jobs(keywords: Sequence[str], limit: int = 12) -> List[JobHit]:
    items: List[dict] = []
    try:
        for page in range(1, 4):
            data = _http_json(
                "https://zhaopin.jd.com/web/job/job_list",
                method="POST",
                data={"pageNo": page, "pageSize": 20},
                headers={"Referer": "https://zhaopin.jd.com/", "Origin": "https://zhaopin.jd.com"},
            )
            if not isinstance(data, list) or not data:
                break
            items.extend(data)
    except Exception:
        return []

    keys = [k.strip() for k in keywords if k and k.strip()]
    scored: List[tuple[int, dict]] = []
    for p in items:
        title = p.get("positionNameOpen") or p.get("positionName") or ""
        work = (p.get("workContent") or "").strip()
        qual = (p.get("qualification") or "").strip()
        blob = f"{title}\n{work}\n{qual}\n{p.get('jobType') or ''}"
        score = 0
        for k in keys:
            if k.lower() in blob.lower():
                score += 3
        if (p.get("jobTypeCode") or "") == "YANFA" or "研发" in (p.get("jobType") or ""):
            score += 2
        if any(x in blob for x in ("Python", "Java", "算法", "后端", "大模型", "LLM", "AI", "工程师")):
            score += 1
        if score <= 0 and keys:
            continue
        scored.append((score, p))
    scored.sort(key=lambda x: -x[0])

    hits: List[JobHit] = []
    seen: Set[str] = set()
    for _, p in scored:
        pid = str(p.get("positionId") or p.get("id") or "")
        if not pid or pid in seen:
            continue
        seen.add(pid)
        title = p.get("positionNameOpen") or p.get("positionName") or ""
        work = (p.get("workContent") or "").strip()
        qual = (p.get("qualification") or "").strip()
        jd = _compose_jd(
            f"【岗位职责】\n{work}" if work else "",
            f"【任职要求】\n{qual}" if qual else "",
        )
        url = f"https://zhaopin.jd.com/web/job_detail?positionId={pid}"
        hits.append(
            JobHit(
                title=title,
                url=url,
                snippet=(work or qual)[:240],
                source="京东招聘",
                company_guess="京东",
                fame_tier="large",
                fame_label="大厂",
                jd_text=jd,
                city=p.get("workCity") or "",
            )
        )
        if len(hits) >= limit:
            break
    return hits


def fetch_remotive_jobs(keyword: str, limit: int = 10) -> List[JobHit]:
    q = urllib.parse.quote((keyword or "software").strip() or "software")
    try:
        data = _http_json(f"https://remotive.com/api/remote-jobs?search={q}&limit={limit}")
    except Exception:
        return []
    hits: List[JobHit] = []
    for j in (data.get("jobs") or [])[:limit]:
        company = j.get("company_name") or ""
        tier, label, _ = classify_fame(company)
        desc = _strip_tags(j.get("description") or "")[:3000]
        url = (j.get("url") or "").strip()
        if not url:
            continue
        hits.append(
            JobHit(
                title=j.get("title") or "",
                url=url,
                snippet=desc[:240],
                source="Remotive",
                company_guess=company,
                fame_tier=tier,
                fame_label=label,
                jd_text=desc,
                salary=j.get("salary") or "",
                city=j.get("candidate_required_location") or "Remote",
            )
        )
    return hits


def fetch_jobicy_jobs(keyword: str, limit: int = 8) -> List[JobHit]:
    tag = (keyword or "python").strip().split()[0] or "python"
    try:
        data = _http_json(f"https://jobicy.com/api/v2/remote-jobs?count={limit}&tag={urllib.parse.quote(tag)}")
    except Exception:
        return []
    hits: List[JobHit] = []
    for j in (data.get("jobs") or [])[:limit]:
        company = j.get("companyName") or ""
        tier, label, _ = classify_fame(company)
        desc = _strip_tags(j.get("jobDescription") or "")[:3000]
        url = (j.get("url") or "").strip()
        if not url:
            continue
        sal = ""
        if j.get("annualSalaryMin") or j.get("annualSalaryMax"):
            sal = f"{j.get('annualSalaryMin') or ''}-{j.get('annualSalaryMax') or ''}".strip("-")
        hits.append(
            JobHit(
                title=j.get("jobTitle") or "",
                url=url,
                snippet=desc[:240],
                source="Jobicy",
                company_guess=company,
                fame_tier=tier,
                fame_label=label,
                jd_text=desc,
                salary=sal,
                city=j.get("jobGeo") or "Remote",
            )
        )
    return hits


# ── 搜索引擎兜底（仅岗位详情页）────────────────────────────

def search_sogou(query: str, limit: int = 10) -> List[dict]:
    q = urllib.parse.quote(query)
    url = f"https://www.sogou.com/web?query={q}"
    try:
        html = _http_get(url, timeout=22)
    except Exception:
        return []
    hits: List[dict] = []
    seen: Set[str] = set()
    parts = re.split(r'<div class="vrwrap[^"]*"', html)
    for p in parts[1:]:
        title = ""
        m = re.search(r"<h3[^>]*>[\s\S]*?<a[^>]*>([\s\S]*?)</a>", p)
        if m:
            title = clean_private_use(_strip_tags(m.group(1)))
        link = ""
        for cand in re.findall(r"https?://[^\s\"'<>]+", p):
            cand = unescape(cand.rstrip("\\").rstrip("'").rstrip('"'))
            if is_job_posting_url(cand):
                link = cand
                break
        if not link:
            m_u = re.search(r'data-url="(https?://[^"]+)"', p)
            if m_u and is_job_posting_url(unescape(m_u.group(1))):
                link = unescape(m_u.group(1))
        if not link or link in seen:
            continue
        snip = ""
        m2 = re.search(r'class="[^"]*space-txt[^"]*"[^>]*>([\s\S]*?)</(?:p|div|span)>', p)
        if not m2:
            m2 = re.search(r'class="[^"]*str_info[^"]*"[^>]*>([\s\S]*?)</(?:p|div|span)>', p)
        if m2:
            snip = clean_private_use(_strip_tags(m2.group(1)))
        seen.add(link)
        hits.append({"title": title or "岗位详情", "url": link, "snippet": snip[:1200]})
        if len(hits) >= limit:
            break
    return hits


def search_bing(query: str, limit: int = 8) -> List[dict]:
    q = urllib.parse.quote(query)
    url = f"https://www.bing.com/search?q={q}&count={limit}&setlang=zh-CN"
    try:
        html = _http_get(url)
    except Exception:
        return []
    hits: List[dict] = []
    for m in re.finditer(
        r'<li class="b_algo"[^>]*>[\s\S]*?<h2[^>]*>\s*<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)</a>[\s\S]*?(?:<p>|class="b_caption"[^>]*>)([\s\S]*?)(?:</p>|</div>)',
        html,
        flags=re.I,
    ):
        link, title_html, snip_html = m.group(1), m.group(2), m.group(3)
        link = unescape(link)
        if not is_job_posting_url(link):
            continue
        hits.append(
            {
                "title": _strip_tags(title_html),
                "url": link,
                "snippet": _strip_tags(snip_html)[:240],
            }
        )
        if len(hits) >= limit:
            break
    return hits


def search_tavily(query: str, limit: int = 8) -> List[dict]:
    key = os.getenv("TAVILY_API_KEY", "").strip()
    if not key:
        return []
    try:
        data = _http_json(
            "https://api.tavily.com/search",
            method="POST",
            data={"api_key": key, "query": query, "search_depth": "basic", "max_results": limit},
        )
    except Exception:
        return []
    return [
        {
            "title": r.get("title") or "",
            "url": r.get("url") or "",
            "snippet": (r.get("content") or "")[:1200],
        }
        for r in (data.get("results") or [])
    ]


def search_serpapi(query: str, limit: int = 8) -> List[dict]:
    key = (os.getenv("SERPAPI_API_KEY") or os.getenv("SERPAPI_KEY") or "").strip()
    if not key:
        return []
    qs = urllib.parse.urlencode({"engine": "google", "q": query, "api_key": key, "num": limit, "hl": "zh-CN"})
    try:
        data = json.loads(_http_get(f"https://serpapi.com/search.json?{qs}", timeout=25))
    except Exception:
        return []
    return [
        {
            "title": r.get("title") or "",
            "url": r.get("link") or "",
            "snippet": r.get("snippet") or "",
        }
        for r in (data.get("organic_results") or [])
    ]


def web_search(query: str, limit: int = 8) -> List[dict]:
    for fn in (search_tavily, search_serpapi):
        try:
            hits = [h for h in fn(query, limit=limit) if is_job_posting_url(h.get("url") or "")]
            if hits:
                return hits[:limit]
        except Exception:
            pass
    hits = search_sogou(query, limit=limit)
    if len(hits) < max(2, limit // 2):
        try:
            for h in search_bing(query, limit=limit):
                if h["url"] not in {x["url"] for x in hits} and is_job_posting_url(h.get("url") or ""):
                    hits.append(h)
                if len(hits) >= limit:
                    break
        except Exception:
            pass
    return hits[:limit]


def site_for_url(url: str) -> str:
    host = urllib.parse.urlparse(url).netloc.lower()
    for s in JOB_SITES:
        if s["domain"] in host:
            return s["name"]
    return host.replace("www.", "") or "网页"


def guess_company(title: str, snippet: str, url: str) -> str:
    blob = f"{title} {snippet}"
    m = re.search(
        r"([\u4e00-\u9fffA-Za-z0-9·]{2,16})(?:招聘|诚聘|招[-—]|[-—]\s*社招|[-—]\s*校招)",
        blob,
    )
    if m:
        return m.group(1)
    _, _, brand = classify_fame(blob + " " + url)
    if brand:
        return brand
    return urllib.parse.urlparse(url).netloc.replace("www.", "")


def enrich_hit(raw: dict) -> JobHit:
    title = clean_private_use(raw.get("title") or "")
    url = unescape((raw.get("url") or "").strip()).replace("&amp;", "&")
    snip = clean_private_use(raw.get("snippet") or "")
    company = guess_company(title, snip, url)
    tier, label, brand = classify_fame(f"{company} {title} {snip} {url}")
    if brand and (not company or company in url):
        company = brand
    return JobHit(
        title=title,
        url=url,
        snippet=snip[:400],
        source=site_for_url(url),
        company_guess=company,
        fame_tier=tier,
        fame_label=label,
        jd_text=snip[:1500],
    )


def filter_by_tiers(hits: Iterable[JobHit], tiers: Sequence[str]) -> List[JobHit]:
    allow = set(tiers or ["large", "mid", "small"])
    return [h for h in hits if h.fame_tier in allow]


def _city_ok(hit: JobHit, city: str) -> bool:
    c = (city or "").strip()
    if not c:
        return True
    blob = f"{hit.city} {hit.title} {hit.jd_text}"
    return c in blob or c.replace("市", "") in blob or "远程" in c or "Remote" in (hit.city or "")


def search_jobs(
    keywords: Sequence[str],
    city: str = "",
    role_hint: str = "",
    tiers: Sequence[str] = ("large", "mid", "small"),
    companies: Sequence[str] = (),
    per_query: int = 6,
    max_hits: int = 24,
) -> List[JobHit]:
    """返回真实岗位详情页 + 本页可展示的 JD 正文。

    companies: 用户指定的目标公司（可空）；非空时只保留匹配这些公司的岗位。
    """
    kws = [k.strip() for k in keywords if k and k.strip()]
    role = (role_hint or "").strip()
    query = " ".join([x for x in [role, *kws[:5]] if x]).strip() or "软件工程师"
    en_kw = next((k for k in kws if re.search(r"[A-Za-z]{2,}", k)), "python")
    company_aliases = expand_company_aliases(companies)
    want_tencent = (not company_aliases) or any(
        a in ("腾讯", "微信", "Tencent", "混元", "元宝") for a in company_aliases
    )
    want_jd = (not company_aliases) or any(
        a in ("京东", "JD", "京东零售", "京东物流") for a in company_aliases
    )
    # 指定了其它公司时，把公司名并入检索词
    if company_aliases:
        extra_cos = [c for c in companies if c and c.strip()][:4]
        if extra_cos:
            query = f"{' '.join(extra_cos)} {query}".strip()

    collected: List[JobHit] = []

    def _safe(fn, *args, **kwargs):
        try:
            return fn(*args, **kwargs)
        except Exception:
            return []

    with ThreadPoolExecutor(max_workers=5) as ex:
        futs = []
        if want_tencent and ("large" in tiers or company_aliases or not tiers):
            futs.append(ex.submit(_safe, fetch_tencent_jobs, query, 12))
        if want_jd and ("large" in tiers or company_aliases or not tiers):
            futs.append(ex.submit(_safe, fetch_jd_jobs, kws or [query], 10))
        if "mid" in tiers or "small" in tiers or "large" in tiers or company_aliases:
            futs.append(ex.submit(_safe, fetch_remotive_jobs, en_kw, 10))
            futs.append(ex.submit(_safe, fetch_jobicy_jobs, en_kw, 8))
        for fut in as_completed(futs):
            try:
                collected.extend(fut.result() or [])
            except Exception:
                pass

    # 搜索引擎兜底：带上公司名更易命中
    if len(collected) < 6 or (company_aliases and len([h for h in collected if hit_matches_companies(h, company_aliases)]) < 3):
        try:
            q2 = query
            if company_aliases:
                q2 = f"{company_aliases[0]} {query}"
            for raw in web_search(f"{q2} 招聘", limit=per_query):
                if is_job_posting_url(raw.get("url") or ""):
                    collected.append(enrich_hit(raw))
        except Exception:
            pass

    # 去重
    seen: Set[str] = set()
    uniq: List[JobHit] = []
    for h in collected:
        u = (h.url or "").strip()
        if not u or u in seen:
            continue
        if not h.jd_text and h.snippet:
            h.jd_text = h.snippet
        if h.source not in ("腾讯招聘", "京东招聘", "Remotive", "Jobicy") and not is_job_posting_url(u):
            continue
        seen.add(u)
        uniq.append(h)

    # 公司硬过滤（用户指定时）
    if company_aliases:
        matched = [h for h in uniq if hit_matches_companies(h, company_aliases)]
        filtered = matched  # 指定公司时严格过滤
    else:
        filtered = filter_by_tiers(uniq, tiers)

    if city:
        city_hits = [h for h in filtered if _city_ok(h, city)]
        if city_hits:
            filtered = city_hits + [h for h in filtered if h not in city_hits]

    def _score(h: JobHit) -> int:
        blob = f"{h.title} {h.jd_text} {h.company_guess}".lower()
        s = 0
        for k in kws:
            if k.lower() in blob:
                s += 2
        if role and role.lower() in blob:
            s += 3
        if company_aliases and hit_matches_companies(h, company_aliases):
            s += 5
        if h.jd_text and len(h.jd_text) > 80:
            s += 1
        return s

    filtered.sort(key=_score, reverse=True)
    return filtered[:max_hits]


def hits_to_dict(hits: List[JobHit]) -> List[dict]:
    return [asdict(h) for h in hits]


def hits_to_markdown(hits: List[JobHit]) -> str:
    if not hits:
        return "（未检索到岗位；请更换关键词/城市后重试）"
    lines = ["| # | 档位 | 公司 | 来源 | 岗位 | 城市 | 链接 |", "|:-:|:----:|------|------|------|------|------|"]
    for i, h in enumerate(hits, 1):
        title = h.title.replace("|", "\\|")[:50]
        company = (h.company_guess or "-").replace("|", "\\|")[:20]
        city = (h.city or "-").replace("|", "\\|")[:12]
        lines.append(
            f"| {i} | {h.fame_label} | {company} | {h.source} | {title} | {city} | {h.url} |"
        )
        jd = (h.jd_text or "").replace("|", " ").replace("\n", " ")
        if jd:
            lines.append(f"|  |  |  |  | JD：_{jd[:220]}_ |  |  |")
    return "\n".join(lines)


def extract_keywords_heuristic(resume: str, limit: int = 8) -> List[str]:
    text = resume or ""
    techs = re.findall(
        r"(Python|Java|Go|Golang|C\+\+|Rust|TypeScript|JavaScript|React|Vue|Spring|Django|FastAPI|"
        r"PyTorch|TensorFlow|LLM|RAG|Agent|LangChain|LangGraph|MCP|Kubernetes|K8s|Docker|"
        r"MySQL|Redis|Kafka|Flink|Spark|CUDA|Transformer|NLP|CV|推荐系统|算法|后端|前端|全栈|"
        r"数据分析|机器学习|深度学习)",
        text,
        flags=re.I,
    )
    out: List[str] = []
    seen = set()
    for t in techs:
        key = t.lower()
        if key not in seen:
            seen.add(key)
            out.append(t)
        if len(out) >= limit:
            break
    if not out:
        for m in re.findall(r"[\u4e00-\u9fff]{2,6}", text):
            if m not in ("负责", "参与", "完成", "熟悉", "掌握", "了解", "工作", "经历", "项目"):
                if m not in seen:
                    seen.add(m)
                    out.append(m)
            if len(out) >= limit:
                break
    return out[:limit]


def list_sources() -> List[dict]:
    return list(JOB_SITES)


def list_fame_tiers() -> List[dict]:
    return [
        {"id": "large", "label": "大厂", "desc": "高知名度互联网/科技/头部企业（按品牌知名度）"},
        {"id": "mid", "label": "中厂", "desc": "有一定知名度的成规模公司"},
        {"id": "small", "label": "小厂", "desc": "知名度较低或初创/成长型公司"},
    ]


if __name__ == "__main__":
    demo = search_jobs(["Python", "LLM", "RAG"], city="北京", tiers=["large", "mid", "small"], max_hits=10)
    print(json.dumps([asdict(x) for x in demo], ensure_ascii=False, indent=2))
