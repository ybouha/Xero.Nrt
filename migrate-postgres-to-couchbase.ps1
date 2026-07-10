#Requires -Version 5.1
<#
.SYNOPSIS
    Exports nrt_reference_data / nrt_target_data rows from the Dockerized
    Postgres instance and bulk-loads them into Couchbase via cbimport.
.NOTES
    Run from the solution root:  .\migrate-postgres-to-couchbase.ps1
    Optional: .\migrate-postgres-to-couchbase.ps1 -RunId 42

    Run .\setup-couchbase.ps1 first — this script assumes the bucket/scope/
    collections it creates already exist.

    ASSUMPTIONS (must match setup-couchbase.ps1 / confirm with the user):
      - Couchbase admin credentials:  Administrator / password123
      - Bucket:      Xero
      - Scope:       nrt
      - Collections: ReferenceData, TargetData
      - Document key: "ref::<id>" / "tgt::<id>" (id = the Postgres row's bigserial id)
      - Default scope of migration: ALL rows in both tables, unless -RunId is passed.
#>

param(
    [int]$RunId = 0   # 0 = migrate all rows; otherwise filter to a single run_id
)

$Root         = $PSScriptRoot
$PgContainer  = "xero-postgres"
$PgUser       = "postgres"
$PgDb         = "Xero"
$CbContainer  = "xero-couchbase"
$CbUser       = "Administrator"
$CbPass       = "password123"
$Bucket       = "Xero"
$Scope        = "nrt"

$Tables = @(
    @{ Table = "nrt_reference_data"; Collection = "ReferenceData"; KeyPrefix = "ref" },
    @{ Table = "nrt_target_data";    Collection = "TargetData";    KeyPrefix = "tgt" }
)

function Write-Step([string]$msg) {
    Write-Host "`n==> $msg" -ForegroundColor Cyan
}

$ExportDir = Join-Path $Root ".migration-tmp"
New-Item -ItemType Directory -Path $ExportDir -Force | Out-Null

foreach ($t in $Tables) {
    $table      = $t.Table
    $collection = $t.Collection
    $keyPrefix  = $t.KeyPrefix
    $exportFile = Join-Path $ExportDir "$table.json"

    # ── Export from Postgres as newline-delimited JSON ────────────────────────

    Write-Step "Exporting $table from Postgres"

    $whereClause = if ($RunId -gt 0) { "WHERE t.run_id = $RunId" } else { "" }
    $copySql = "COPY (SELECT row_to_json(t) FROM $table t $whereClause) TO STDOUT"

    $exportLines = docker exec $PgContainer psql -U $PgUser -d $PgDb -t -A -c $copySql

    if ($LASTEXITCODE -ne 0) {
        Write-Host "`nExport of $table FAILED - aborting." -ForegroundColor Red
        exit 1
    }

    [System.IO.File]::WriteAllLines($exportFile, $exportLines, (New-Object System.Text.UTF8Encoding $false))

    $rowCount = (Get-Content $exportFile | Where-Object { $_.Trim() -ne "" } | Measure-Object).Count
    Write-Host "  Exported $rowCount rows -> $exportFile"

    if ($rowCount -eq 0) {
        Write-Host "  Nothing to import for $table - skipping." -ForegroundColor Yellow
        continue
    }

    # ── Copy export into the Couchbase container ──────────────────────────────

    Write-Step "Copying export into $CbContainer"

    docker cp $exportFile "${CbContainer}:/tmp/$table.json"
    if ($LASTEXITCODE -ne 0) {
        Write-Host "`ndocker cp FAILED - aborting." -ForegroundColor Red
        exit 1
    }

    # ── Import into Couchbase via cbimport ─────────────────────────────────────

    Write-Step "Importing into $Bucket.$Scope.$collection"

    docker exec $CbContainer cbimport json `
        --cluster http://localhost:8091 `
        --username $CbUser `
        --password $CbPass `
        --bucket $Bucket `
        --scope-collection-exp "$Scope.$collection" `
        --format lines `
        --dataset "file:///tmp/$table.json" `
        --generate-key "${keyPrefix}::%id%"

    if ($LASTEXITCODE -ne 0) {
        Write-Host "`ncbimport FAILED for $table - aborting." -ForegroundColor Red
        exit 1
    }

    docker exec $CbContainer rm -f "/tmp/$table.json"
}

Remove-Item -Recurse -Force $ExportDir

Write-Host "`nDone. Reference/Target data migrated to Couchbase." -ForegroundColor Green
