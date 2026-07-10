#Requires -Version 5.1
<#
.SYNOPSIS
    Starts the Dockerized Couchbase Server, initializes the cluster, and
    provisions the bucket/scope/collections used by the NRT Reference/Target
    migration.
.NOTES
    Run from the solution root:  .\setup-couchbase.ps1

    ASSUMPTIONS (no existing convention in this repo to match against):
      - Admin credentials:  Administrator / password123
      - Bucket:             Xero        (512 MB RAM quota)
      - Scope:              nrt
      - Collections:        ReferenceData, TargetData
    Change the variables below if different values are required.
#>

$Root          = $PSScriptRoot
$CbContainer   = "xero-couchbase"
$CbUser        = "Administrator"
$CbPass        = "password123"
$Bucket        = "Xero"
$Scope         = "nrt"
$Collections   = @("ReferenceData", "TargetData")

function Write-Step([string]$msg) {
    Write-Host "`n==> $msg" -ForegroundColor Cyan
}

# ── Step 1 : Start Docker Couchbase ────────────────────────────────────────────

Write-Step "Starting Docker Couchbase (docker compose up -d couchbase)"

Push-Location $Root
docker compose up -d couchbase
$dockerExit = $LASTEXITCODE
Pop-Location

if ($dockerExit -ne 0) {
    Write-Host "`ndocker compose up FAILED - aborting." -ForegroundColor Red
    exit 1
}

# ── Step 2 : Wait for Couchbase web UI to respond ─────────────────────────────

Write-Step "Waiting for Couchbase to become healthy"

$maxAttempts = 60
$attempt     = 0
$ready       = $false

while ($attempt -lt $maxAttempts) {
    docker exec $CbContainer curl -sf http://localhost:8091/ui/index.html *> $null
    if ($LASTEXITCODE -eq 0) {
        $ready = $true
        break
    }
    $attempt++
    Start-Sleep -Seconds 2
}

if (-not $ready) {
    Write-Host "`nCouchbase did not become ready in time - aborting." -ForegroundColor Red
    exit 1
}

Write-Host "  Couchbase is ready." -ForegroundColor Green

# ── Step 3 : Initialize cluster (idempotent - ignore "already initialized") ───

Write-Step "Initializing Couchbase cluster"

docker exec $CbContainer couchbase-cli cluster-init `
    --cluster localhost `
    --cluster-username $CbUser `
    --cluster-password $CbPass `
    --cluster-ramsize 1024 `
    --cluster-index-ramsize 512 `
    --services data,index,query `
    2>&1 | ForEach-Object {
        if ($_ -match "already") {
            Write-Host "  $_" -ForegroundColor Yellow
        } else {
            Write-Host "  $_"
        }
    }

# ── Step 4 : Create bucket (idempotent - ignore "already exists") ────────────

Write-Step "Creating bucket '$Bucket'"

docker exec $CbContainer couchbase-cli bucket-create `
    --cluster localhost `
    --username $CbUser `
    --password $CbPass `
    --bucket $Bucket `
    --bucket-type couchbase `
    --bucket-ramsize 512 `
    2>&1 | ForEach-Object {
        if ($_ -match "already exists") {
            Write-Host "  $_" -ForegroundColor Yellow
        } else {
            Write-Host "  $_"
        }
    }

Start-Sleep -Seconds 3

# ── Step 5 : Create scope (idempotent - ignore "already exists") ─────────────

Write-Step "Creating scope '$Scope'"

docker exec $CbContainer couchbase-cli collection-manage `
    --cluster localhost `
    --username $CbUser `
    --password $CbPass `
    --bucket $Bucket `
    --create-scope $Scope `
    2>&1 | ForEach-Object {
        if ($_ -match "already exists") {
            Write-Host "  $_" -ForegroundColor Yellow
        } else {
            Write-Host "  $_"
        }
    }

# ── Step 6 : Create collections (idempotent - ignore "already exists") ──────

foreach ($col in $Collections) {
    Write-Step "Creating collection '$Scope.$col'"

    docker exec $CbContainer couchbase-cli collection-manage `
        --cluster localhost `
        --username $CbUser `
        --password $CbPass `
        --bucket $Bucket `
        --create-collection "$Scope.$col" `
        2>&1 | ForEach-Object {
            if ($_ -match "already exists") {
                Write-Host "  $_" -ForegroundColor Yellow
            } else {
                Write-Host "  $_"
            }
        }
}

Start-Sleep -Seconds 2

# ── Step 7 : Create primary indexes so N1QL queries work ─────────────────────

foreach ($col in $Collections) {
    Write-Step "Creating primary index on '$Scope.$col'"

    $query = "CREATE PRIMARY INDEX IF NOT EXISTS ON ``$Bucket``.``$Scope``.``$col``;"

    docker exec $CbContainer cbq `
        -engine=http://localhost:8091 `
        -u=$CbUser -p=$CbPass `
        -script=$query `
        2>&1 | ForEach-Object { Write-Host "  $_" }
}

# ── Done ───────────────────────────────────────────────────────────────────────

Write-Host "`nDone. Couchbase is up and provisioned." -ForegroundColor Green
Write-Host "  UI      -> http://localhost:8091  ($CbUser / $CbPass)"
Write-Host "  Bucket  -> $Bucket"
Write-Host "  Scope   -> $Scope"
Write-Host "  Collections -> $($Collections -join ', ')"
