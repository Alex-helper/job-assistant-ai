# 一键：检查敏感文件未入库 → 提示创建私有仓并推送
# 用法：在「求职助手」目录执行  .\scripts\push-private.ps1

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

Write-Host "== 检查 .env 是否被跟踪 ==" -ForegroundColor Cyan
$tracked = git ls-files .env 2>$null
if ($tracked) {
  Write-Host "ERROR: .env 已在仓库中！请先: git rm --cached .env" -ForegroundColor Red
  exit 1
}
Write-Host "OK: .env 未跟踪"

Write-Host "`n== 当前状态 ==" -ForegroundColor Cyan
git status -sb

if (-not (git rev-parse HEAD 2>$null)) {
  Write-Host "尚无 commit。请先提交后再推送。" -ForegroundColor Yellow
  exit 1
}

Write-Host "`n下一步（任选其一）：" -ForegroundColor Green
Write-Host @"

【A】已安装 GitHub CLI：
  gh auth login
  gh repo create job-hunt-assistant --private --source=. --remote=origin --push

【B】网页创建 Private 空仓库后：
  git remote add origin https://github.com/<你的用户名>/job-hunt-assistant.git
  git push -u origin main

然后打开 https://dashboard.render.com → New → Web Service
选该私有仓，Runtime=Docker，环境变量见 docs/DEPLOY.md

"@
