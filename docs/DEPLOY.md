# 求职助手 — 免费公网访问（不上传 GitHub，源码不出本机）

## 方案

**本机运行 + 免费公网隧道**

| 目标 | 做法 |
|------|------|
| 浏览器可访问 | 得到 `https://...` 公网链接 |
| 免费 | Cloudflare Quick Tunnel，或备用 Pinggy SSH 隧道 |
| 不易泄露源码 | 代码只在你电脑；外网只能访问网页与 API，拿不到 `.py` / Prompt |
| 不上 GitHub | 无需仓库、无需 Render |

```text
访客浏览器 → 隧道服务商 → 你的电脑(127.0.0.1:8765) → FastAPI
```

限制：电脑关机或关掉启动窗口后链接失效；临时域名每次重启可能变化。

## 一键启动

1. 确保已有 `.env`（含 `OPENAI_API_KEY`）且依赖已装好  
2. 双击 **`启动公网访问.bat`**  
   或：

```powershell
cd "求职助手"
powershell -ExecutionPolicy Bypass -File .\scripts\public-tunnel.ps1
```

3. 终端出现公网 `https://...` 后，用手机流量打开验证  
4. URL 也会写入 `logs\public_url.txt`

脚本会自动：

- `PUBLIC_MODE=1`、`ENABLE_RUN_CODE=0`（公网安全）
- 生成 `ADMIN_TOKEN` → `.admin_token`
- 优先 cloudflared；若 GitHub 下载失败则自动改用 **Pinggy**（系统自带 SSH，无需安装）

## 安全

| 变量 | 隧道脚本默认 |
|------|----------------|
| `PUBLIC_MODE` | `1` |
| `ENABLE_RUN_CODE` | `0` |
| `ADMIN_TOKEN` | 自动生成 |

管理页：`https://你的公网域名/admin?admin_token=<见 .admin_token>`

## 验收

- [ ] 非同一 WiFi（如手机流量）能打开  
- [ ] `/api/config` 无完整 API Key  
- [ ] `/api/run-code` 返回 403  
- [ ] 无 token 无法进 `/admin`

## 停止

运行窗口按 **Ctrl+C**，或关闭窗口。
