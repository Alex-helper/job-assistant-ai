# 求职助手 AI

浏览器端求职助手（JD 分析、简历匹配、**联网岗位**、面试题、项目推荐等）。

## 本地启动

```powershell
python -m venv .venv
.\.venv\Scripts\pip install -r requirements.txt
copy .env.example .env
# 编辑 .env 填入 OPENAI_API_KEY 等
.\.venv\Scripts\python -m uvicorn server:app --host 127.0.0.1 --port 8765
```

打开 http://127.0.0.1:8765/

### 联网岗位（可选）

侧栏「联网岗位」：按简历匹配 BOSS直聘/猎聘/拉勾/智联等渠道，并按知名度筛选大厂·中厂·小厂。  
可选配置 `TAVILY_API_KEY` 或 `SERPAPI_API_KEY` 增强实时抓取；也可 `pip install mcp` 后运行 `python mcp_job_search.py` 作为 MCP。

## 公网（免费、不上 GitHub）

双击 **`启动公网访问.bat`**。源码只在本机，外网拿到 `https://xxxx.trycloudflare.com`。

电脑需保持开机与脚本窗口；详见 [docs/DEPLOY.md](docs/DEPLOY.md)。

## 安全相关环境变量

| 变量 | 本地开发 | 公网隧道 |
|------|----------|----------|
| `PUBLIC_MODE` | `0` | `1`（脚本自动设） |
| `ENABLE_RUN_CODE` | `1` | `0`（脚本自动设） |
| `ADMIN_TOKEN` | 可选 | 自动写入 `.admin_token` |
| `OPENAI_API_KEY` | `.env` | `.env`（仅本机） |
