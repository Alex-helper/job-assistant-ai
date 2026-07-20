# -*- coding: utf-8 -*-
"""可选 MCP Server：把岗位联网检索暴露为工具（stdio）。

启动示例：
  python mcp_job_search.py

Cursor / Claude Desktop 可把本脚本配为 MCP server，工具名：
  list_job_sources / list_fame_tiers / search_jobs_online
"""
from __future__ import annotations

import json
from dataclasses import asdict

try:
    from mcp.server.fastmcp import FastMCP
except ImportError:
    FastMCP = None  # type: ignore

from job_boards import (
    list_fame_tiers,
    list_sources,
    search_jobs,
)

if FastMCP is None:
    if __name__ == "__main__":
        print("未安装 mcp 包。可: pip install mcp")
        print("求职助手本体不依赖 MCP，已通过 /api/job-match 提供同等检索能力。")
    raise SystemExit(0)

mcp = FastMCP("job-hunt-boards")


@mcp.tool()
def list_job_sources() -> str:
    """列出支持检索的招聘网站渠道。"""
    return json.dumps(list_sources(), ensure_ascii=False, indent=2)


@mcp.tool()
def list_company_fame_tiers() -> str:
    """列出大厂/中厂/小厂（按品牌知名度）档位说明。"""
    return json.dumps(list_fame_tiers(), ensure_ascii=False, indent=2)


@mcp.tool()
def search_jobs_online(
    keywords: str,
    city: str = "",
    role_hint: str = "",
    fame_tiers: str = "large,mid,small",
    companies: str = "",
    max_hits: int = 20,
) -> str:
    """联网检索招聘站岗位。

    keywords: 逗号分隔技能/关键词，如 "Python,LLM,RAG"
    fame_tiers: large=大厂, mid=中厂, small=小厂，逗号分隔
    companies: 目标公司，逗号分隔，如 "腾讯,京东"；空则不限
    """
    kws = [x.strip() for x in (keywords or "").split(",") if x.strip()]
    tiers = [x.strip() for x in (fame_tiers or "").split(",") if x.strip()]
    cos = [x.strip() for x in (companies or "").replace("，", ",").split(",") if x.strip()]
    hits = search_jobs(
        kws,
        city=city,
        role_hint=role_hint,
        tiers=tiers or ["large", "mid", "small"],
        companies=cos,
        max_hits=max(5, min(int(max_hits or 20), 40)),
    )
    return json.dumps([asdict(h) for h in hits], ensure_ascii=False, indent=2)


if __name__ == "__main__":
    mcp.run()
