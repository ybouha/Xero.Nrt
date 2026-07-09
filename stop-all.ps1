#Requires -Version 5.1
<#
.SYNOPSIS
    Stops Xero.WebApi, the Angular dev server, and the Dockerized Postgres DB.
.NOTES
    Run from the solution root:  .\stop-all.ps1
#>

$Root = $PSScriptRoot

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

# ── Step 1 : Stop API and Angular ──────────────────────────────────────────────

Write-Step "Stopping Xero.WebApi and Angular dev server"

Kill-ByPort 60513   # API  http
Kill-ByPort 60512   # API  https
Kill-ByPort 4200    # Angular

# ── Step 2 : Stop Docker Postgres ──────────────────────────────────────────────

Write-Step "Stopping Docker Postgres (docker compose stop)"

Push-Location $Root
docker compose stop
Pop-Location

Write-Host "`nDone. Postgres, API, and Angular are all stopped." -ForegroundColor Green
