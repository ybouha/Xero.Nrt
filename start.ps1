#Requires -Version 5.1
<#
.SYNOPSIS
    Starts the Dockerized Postgres DB, waits for it to be ready, then builds
    and starts Xero.WebApi and the Angular dev server in separate windows.
.NOTES
    Run from the solution root:  .\start.ps1
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

# ── Step 1 : Start Docker Postgres ─────────────────────────────────────────────

Write-Step "Starting Docker Postgres (docker compose up -d)"

Push-Location $Root
docker compose up -d
$dockerExit = $LASTEXITCODE
Pop-Location

if ($dockerExit -ne 0) {
    Write-Host "`ndocker compose up FAILED - aborting." -ForegroundColor Red
    exit 1
}

# ── Step 2 : Wait for Postgres to be ready ────────────────────────────────────

Write-Step "Waiting for Postgres to become healthy"

$maxAttempts = 30
$attempt     = 0
$ready       = $false

while ($attempt -lt $maxAttempts) {
    $result = docker exec xero-postgres pg_isready -U postgres -d Xero 2>$null
    if ($LASTEXITCODE -eq 0) {
        $ready = $true
        break
    }
    $attempt++
    Start-Sleep -Seconds 1
}

if (-not $ready) {
    Write-Host "`nPostgres did not become ready in time - aborting." -ForegroundColor Red
    exit 1
}

Write-Host "  Postgres is ready." -ForegroundColor Green

# ── Step 3 : Kill existing app processes ──────────────────────────────────────

Write-Step "Stopping existing processes"

Kill-ByPort 60513   # API  http
Kill-ByPort 60512   # API  https
Kill-ByPort 4200    # Angular

Start-Sleep -Seconds 2

# ── Step 4 : Rebuild API ───────────────────────────────────────────────────────

Write-Step "Building Xero.WebApi"

$buildLines = & dotnet build "$ApiDir\Xero.WebApi.csproj" --configuration Debug 2>&1

$buildLines | Where-Object { $_ -match ' error ' } |
    ForEach-Object { Write-Host "  $_" -ForegroundColor Red }

if ($LASTEXITCODE -ne 0) {
    Write-Host "`nBuild FAILED - aborting." -ForegroundColor Red
    exit 1
}

Write-Host "  Build succeeded." -ForegroundColor Green

# ── Step 5 : Start API ────────────────────────────────────────────────────────

Write-Step "Starting Xero.WebApi  ->  http://localhost:60513"

$apiCmd = "& { Set-Location '$ApiDir'; `$env:ASPNETCORE_ENVIRONMENT = 'Development'; dotnet run --no-build --configuration Debug }"
Start-Process powershell.exe -ArgumentList "-NoExit", "-Command", $apiCmd -WindowStyle Normal

Start-Sleep -Seconds 2

# ── Step 6 : Start Angular ────────────────────────────────────────────────────

Write-Step "Starting Angular dev server  ->  http://localhost:4200"

$webCmd = "& { Set-Location '$WebDir'; npm start }"
Start-Process powershell.exe -ArgumentList "-NoExit", "-Command", $webCmd -WindowStyle Normal

# ── Done ──────────────────────────────────────────────────────────────────────

Write-Host "`nDone. Postgres, API, and Angular are all up." -ForegroundColor Green
Write-Host "  DB   -> localhost:5433 (container xero-postgres)"
Write-Host "  API  -> http://localhost:60513  (Swagger at root)"
Write-Host "  Web  -> http://localhost:4200"
Write-Host "  Logs -> D:\Apps\Logs\Xero.WebApi\"
