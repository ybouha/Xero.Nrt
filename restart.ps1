#Requires -Version 5.1
<#
.SYNOPSIS
    Stops running Xero.WebApi and Angular processes, rebuilds the API,
    then restarts both in separate console windows.
.NOTES
    Run from the solution root:  .\restart.ps1
#>

$Root   = $PSScriptRoot
$ApiDir = Join-Path $Root "Xero.WebApi"
$WebDir = Join-Path $Root "Xero.WebApp"

function Write-Step([string]$msg) {
    Write-Host "`n==> $msg" -ForegroundColor Cyan
}

function Kill-ByPort([int]$port) {
    $lines = netstat -ano 2>$null | Select-String ":$port\s"
    foreach ($m in $lines) {
        $parts = $m.Line.Trim() -split '\s+'
        $p     = $parts[-1]
        if ($p -match '^\d+$' -and [int]$p -ne 0) {
            try {
                Stop-Process -Id ([int]$p) -Force -ErrorAction Stop
                Write-Host "  Killed PID $p (port $port)" -ForegroundColor Yellow
            } catch { }
        }
    }
}

# ── Step 1 : Kill existing processes ──────────────────────────────────────────

Write-Step "Stopping existing processes"

Kill-ByPort 60513   # API  http
Kill-ByPort 60512   # API  https
Kill-ByPort 4200    # Angular

Start-Sleep -Seconds 2

# ── Step 2 : Rebuild API ───────────────────────────────────────────────────────

Write-Step "Building Xero.WebApi"

$buildLines = & dotnet build "$ApiDir\Xero.WebApi.csproj" --configuration Debug 2>&1

$buildLines | Where-Object { $_ -match ' error ' } |
    ForEach-Object { Write-Host "  $_" -ForegroundColor Red }

if ($LASTEXITCODE -ne 0) {
    Write-Host "`nBuild FAILED - aborting." -ForegroundColor Red
    exit 1
}

Write-Host "  Build succeeded." -ForegroundColor Green

# ── Step 3 : Start API ────────────────────────────────────────────────────────

Write-Step "Starting Xero.WebApi  ->  http://localhost:60513"

$apiCmd = "& { Set-Location '$ApiDir'; `$env:ASPNETCORE_ENVIRONMENT = 'Development'; dotnet run --no-build --configuration Debug }"
Start-Process powershell.exe -ArgumentList "-NoExit", "-Command", $apiCmd -WindowStyle Normal

Start-Sleep -Seconds 2

# ── Step 4 : Start Angular ────────────────────────────────────────────────────

Write-Step "Starting Angular dev server  ->  http://localhost:4200"

$webCmd = "& { Set-Location '$WebDir'; npm start }"
Start-Process powershell.exe -ArgumentList "-NoExit", "-Command", $webCmd -WindowStyle Normal

# ── Done ──────────────────────────────────────────────────────────────────────

Write-Host "`nDone. Both processes launched in separate windows." -ForegroundColor Green
Write-Host "  API  -> http://localhost:60513  (Swagger at root)"
Write-Host "  Web  -> http://localhost:4200"
Write-Host "  Logs -> D:\Apps\Logs\Xero.WebApi\"
