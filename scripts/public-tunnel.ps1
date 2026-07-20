# Job Hunt Assistant - public tunnel (no GitHub, source stays local)
# Prefer cloudflared; fallback to Pinggy SSH (free)
# Usage: powershell -ExecutionPolicy Bypass -File .\scripts\public-tunnel.ps1

$ErrorActionPreference = "Stop"
$Root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
Set-Location $Root

$Port = if ($env:PORT) { $env:PORT } else { "8765" }
$ToolsDir = Join-Path $Root "tools"
$Cloudflared = Join-Path $ToolsDir "cloudflared.exe"
$Uvicorn = Join-Path $Root ".venv\Scripts\uvicorn.exe"
$LogDir = Join-Path $Root "logs"
$Ssh = "$env:SystemRoot\System32\OpenSSH\ssh.exe"
New-Item -ItemType Directory -Force -Path $ToolsDir, $LogDir | Out-Null

function Ensure-AdminToken {
  if ($env:ADMIN_TOKEN -and $env:ADMIN_TOKEN.Trim()) { return }
  $tokenFile = Join-Path $Root ".admin_token"
  if (Test-Path $tokenFile) {
    $env:ADMIN_TOKEN = (Get-Content $tokenFile -Raw).Trim()
    return
  }
  $bytes = New-Object byte[] 24
  [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
  $token = [Convert]::ToBase64String($bytes).TrimEnd('=').Replace('+','-').Replace('/','_')
  Set-Content -Path $tokenFile -Value $token -NoNewline
  $env:ADMIN_TOKEN = $token
  Write-Host "[ok] ADMIN_TOKEN saved to .admin_token" -ForegroundColor Yellow
}

function Try-GetCloudflared {
  if (Test-Path $Cloudflared) { return $true }
  $cmd = Get-Command cloudflared -ErrorAction SilentlyContinue
  if ($cmd) {
    $script:Cloudflared = $cmd.Source
    return $true
  }
  $urls = @(
    "https://github.com/cloudflare/cloudflared/releases/download/2024.12.2/cloudflared-windows-amd64.exe",
    "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe"
  )
  foreach ($url in $urls) {
    try {
      Write-Host "[..] download cloudflared" -ForegroundColor DarkGray
      Invoke-WebRequest -Uri $url -OutFile $Cloudflared -UseBasicParsing -TimeoutSec 45
      if ((Test-Path $Cloudflared) -and ((Get-Item $Cloudflared).Length -gt 1MB)) {
        return $true
      }
    } catch {
      Write-Host "[..] download failed, try next" -ForegroundColor DarkGray
    }
  }
  return $false
}

function Start-AppServer {
  $listen = Get-NetTCPConnection -LocalPort ([int]$Port) -State Listen -ErrorAction SilentlyContinue
  if ($listen) {
    Write-Host "[ok] port $Port already listening" -ForegroundColor Yellow
    return $null
  }
  if (-not (Test-Path $Uvicorn)) {
    throw "Missing .venv\Scripts\uvicorn.exe - install deps first"
  }
  Write-Host "[..] starting uvicorn PUBLIC_MODE=1" -ForegroundColor Cyan
  $py = Join-Path $Root ".venv\Scripts\python.exe"
  $outLog = Join-Path $LogDir "uvicorn.out.log"
  $errLog = Join-Path $LogDir "uvicorn.err.log"
  return Start-Process -FilePath $py -ArgumentList @(
    "-m", "uvicorn", "server:app", "--host", "127.0.0.1", "--port", $Port
  ) -WorkingDirectory $Root -PassThru -WindowStyle Hidden `
    -RedirectStandardOutput $outLog -RedirectStandardError $errLog
}

function Save-PublicUrl([string]$url) {
  if (-not $url) { return }
  Write-Host ""
  Write-Host "PUBLIC URL:" -ForegroundColor Green
  Write-Host "  $url" -ForegroundColor White
  Write-Host "ADMIN:" -ForegroundColor Green
  Write-Host "  $url/admin?admin_token=$($env:ADMIN_TOKEN)" -ForegroundColor DarkGray
  Write-Host ""
  Set-Content -Path (Join-Path $LogDir "public_url.txt") -Value $url -NoNewline
  try { Start-Process $url } catch {}
}

Ensure-AdminToken
$env:PUBLIC_MODE = "1"
$env:ENABLE_RUN_CODE = "0"
if (-not $env:CORS_ORIGINS) { $env:CORS_ORIGINS = "" }

Write-Host ""
Write-Host "=== Job Hunt Assistant public tunnel (source stays local) ===" -ForegroundColor Green
Write-Host "local port: $Port"
Write-Host "note: URL dies when this window closes or PC sleeps"
Write-Host ""

$uvicornProc = Start-AppServer
Start-Sleep -Seconds 2

$tunnelProc = $null
$tunnelLog = Join-Path $LogDir "tunnel.log"
if (Test-Path $tunnelLog) { Remove-Item $tunnelLog -Force }

try {
  $gotUrl = $false
  if (Try-GetCloudflared) {
    Write-Host "[..] Cloudflare Quick Tunnel" -ForegroundColor Cyan
    $tunnelProc = Start-Process -FilePath $Cloudflared -ArgumentList @(
      "tunnel", "--url", "http://127.0.0.1:$Port", "--no-autoupdate"
    ) -WorkingDirectory $Root -PassThru -RedirectStandardError $tunnelLog -RedirectStandardOutput $tunnelLog -NoNewWindow

    for ($i = 0; $i -lt 45; $i++) {
      Start-Sleep -Seconds 1
      $text = Get-Content $tunnelLog -Raw -ErrorAction SilentlyContinue
      if ($text -match 'https://[a-z0-9-]+\.trycloudflare\.com') {
        Save-PublicUrl $Matches[0]
        $gotUrl = $true
        break
      }
      if ($tunnelProc.HasExited) { break }
    }
    if (-not $gotUrl) {
      Write-Host "[..] cloudflared failed, fallback Pinggy" -ForegroundColor Yellow
      if ($tunnelProc -and -not $tunnelProc.HasExited) {
        Stop-Process -Id $tunnelProc.Id -Force -ErrorAction SilentlyContinue
      }
      $tunnelProc = $null
    }
  }

  if (-not $gotUrl) {
    if (-not (Test-Path $Ssh)) { throw "ssh.exe not found" }
    Write-Host "[..] Pinggy SSH tunnel (free)" -ForegroundColor Cyan
    if (Test-Path $tunnelLog) { Remove-Item $tunnelLog -Force }

    $tunnelProc = Start-Process -FilePath $Ssh -ArgumentList @(
      "-p", "443",
      "-o", "StrictHostKeyChecking=no",
      "-o", "ServerAliveInterval=30",
      "-o", "ServerAliveCountMax=3",
      "-R", "0:127.0.0.1:$Port",
      "a.pinggy.io"
    ) -WorkingDirectory $Root -PassThru -RedirectStandardError $tunnelLog -RedirectStandardOutput $tunnelLog -NoNewWindow

    for ($i = 0; $i -lt 90; $i++) {
      Start-Sleep -Seconds 1
      $text = Get-Content $tunnelLog -Raw -ErrorAction SilentlyContinue
      if (-not $text) { continue }
      if ($text -match 'https://[a-zA-Z0-9.-]+\.pinggy\.(link|io|online)') {
        Save-PublicUrl $Matches[0]
        $gotUrl = $true
        break
      }
      if ($tunnelProc.HasExited) { break }
    }
    if (-not $gotUrl) {
      Write-Host "[err] cannot parse public URL. log tail:" -ForegroundColor Red
      if (Test-Path $tunnelLog) { Get-Content $tunnelLog -Tail 60 }
      throw "tunnel failed"
    }
  }

  Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
  Wait-Process -Id $tunnelProc.Id
}
finally {
  if ($tunnelProc -and -not $tunnelProc.HasExited) {
    Stop-Process -Id $tunnelProc.Id -Force -ErrorAction SilentlyContinue
  }
  if ($uvicornProc -and -not $uvicornProc.HasExited) {
    Stop-Process -Id $uvicornProc.Id -Force -ErrorAction SilentlyContinue
  }
}