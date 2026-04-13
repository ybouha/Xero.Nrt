# Xero NRT — Claude Project Context

> Paste this file at the start of any new Claude session to skip context-building.
> Last updated: 2026-04-13

---

## 1. What This Project Is

**Xero** is a **.NET 10 + Angular 17 Non-Regression Testing (NRT) platform** for financial risk data (VaR).  
It loads reference and target datasets from PostgreSQL, compares them with a high-performance in-memory comparer, saves diff results back to the DB, and exposes everything via a REST API consumed by an Angular SPA.

---

## 2. Solution Structure

```
D:\Dotnet8\GetTheJob\Xero\
├── Xero.sln
├── restart.ps1                          ← kills old processes, rebuilds API, starts both servers
│
├── Xero.DataAcquisition\                ← loads ref+target rows in parallel via Dapper
│   └── DbDataLoader<T>                  ← optional ILogger<DbDataLoader<T>>
│
├── Xero.SmartComparer\                  ← high-perf comparer using pre-sized hash sets
│   └── ListComparer<T>                  ← optional ILogger<ListComparer<T>>
│   └── CompareResult<T>                 ← holds InBothButDiff, OnlyInReference, OnlyInTarget
│
├── Xero.ResultSaver\
│   ├── DbDiffSaver<T>                   ← saves all 3 diff types to NrtDiffResults; optional ILogger
│   ├── SqlAuditSaver<T>                 ← writes summary row to NrtAuditLog (SQL Server only)
│   ├── ExcelResultSaver<T>              ← EPPlus-based Excel export
│   └── JsonResultSaver<T>              ← JSON file export
│
├── Xero.ResultViewer\
│   ├── ConsoleResultViewer<T>
│   └── HtmlResultViewer<T>
│
├── Xero.Logging\                        ← NEW — shared Serilog helper
│   └── SerilogHelper.cs                 ← SerilogHelper.CreateLogger(appName) → ILoggerFactory
│                                           writes to D:\Apps\Logs\{appName}\{appName}-.log
│
├── Xero.NrtRunner\                      ← console app (CI/CD entry point)
│   └── Program.cs                       ← 5-step pipeline; uses SerilogHelper + ILoggerFactory
│
└── Xero.WebApi\                         ← ASP.NET Core 10 REST API
    ├── Program.cs                       ← Serilog + JsonStringEnumConverter + CORS for Angular
    ├── Controllers\
    │   ├── NrtController.cs             ← POST /api/nrt/runs  (trigger a run)
    │   ├── NrtRunsController.cs         ← GET  /api/runs, /api/runs/{id}, /api/runs/{id}/diffs
    │   └── DiffResultsController.cs     ← GET  /api/diffs, /api/diffs/{id}
    ├── Services\
    │   ├── NrtService.cs                ← orchestrates the 4-step pipeline; takes ILoggerFactory
    │   └── NrtResultService.cs          ← Dapper queries against nrt_runs + NrtDiffResults
    ├── Data\NrtRunRepository.cs         ← CRUD on nrt_runs table
    └── Models\                          ← NrtRunRequest, NrtRunResponse, DiffResultDto, etc.

Xero.WebApp\                             ← Angular 17 SPA (standalone components, DevExtreme 23.2)
├── src\environments\environment.ts      ← apiBaseUrl: 'http://localhost:60513/api'
└── src\app\
    ├── core\models\nrt.models.ts        ← TypeScript interfaces mirroring C# DTOs
    ├── core\services\
    │   ├── result-viewer.service.ts     ← getRuns, getDiffsForRun, getDiffs, getDiff
    │   └── nrt-api.service.ts           ← executeRun
    └── pages\
        ├── dashboard\                   ← summary stats
        ├── nrt-runs\                    ← run history list
        ├── new-run\                     ← form to trigger a new NRT run
        └── diff-results\                ← main viewer (3-tab grid with context menu)
```

---

## 3. Database

**PostgreSQL 18**, local, database `Xero`.

```
Host=localhost;Port=5432;Database=Xero;Username=postgres;Password=tc0ab1y
```

### Tables

| Table | Description |
|---|---|
| `nrt_reference_data` | Reference dataset — 100,000 rows, `valuation_date = 2025-01-31` |
| `nrt_target_data` | Target dataset — 100,000 rows, `valuation_date = 2025-01-31` |
| `nrt_runs` | Audit header per run (run_id, timestamps, counts, passed flag) |
| `NrtDiffResults` | Individual diff rows (InBothButDiff / OnlyInReference / OnlyInTarget) |

> **Important**: Source data only exists for `valuation_date = 2025-01-31`.  
> The New Run form defaults to `'2025-01-31'`. Do NOT use today's date.

### Key columns in NrtDiffResults

```
Id, RunTimestamp, ScenarioName, ReferenceVersion, TargetVersion,
TradeId, Book, Desk, RiskFactor, ValuationDate,
DiffType  (InBothButDiff | OnlyInReference | OnlyInTarget),
Diffs     (JSONB: {"FieldName":{"Ref":v,"Tgt":v}, ...}),
CompareItems (JSONB: [refItem, tgtItem] or [singleItem])
```

### Correlation: nrt_runs ↔ NrtDiffResults

There is **no FK**. `NrtResultService` joins them via `run_timestamp + scenario_name`.

---

## 4. Running Everything

```powershell
# From solution root — kills old processes, rebuilds API, starts both
.\restart.ps1
```

| Service | URL |
|---|---|
| REST API (Swagger) | http://localhost:60513 |
| Angular SPA | http://localhost:4200 |
| Log files | D:\Apps\Logs\Xero.WebApi\Xero.WebApi-YYYYMMDD.log |

---

## 5. REST API Endpoints

### Trigger a run
```
POST http://localhost:60513/api/nrt/runs
Content-Type: application/json
```
```json
{
  "scenarioName": "VaR NRT",
  "referenceVersion": "prod-2025-01",
  "targetVersion": "uat-2025-02",
  "valuationDate": "2025-01-31",
  "reference": {
    "provider": "PostgreSql",
    "connectionString": "Host=localhost;Port=5432;Database=Xero;Username=postgres;Password=tc0ab1y",
    "query": "SELECT trade_id AS \"TradeId\", book AS \"Book\", desk AS \"Desk\",\n  risk_factor AS \"RiskFactor\", asset_class AS \"AssetClass\",\n  valuation_date::text AS \"ValuationDate\",\n  delta AS \"Delta\", gamma AS \"Gamma\", vega AS \"Vega\",\n  var_1d_99 AS \"Var1D99\", svar_1d_99 AS \"SVaR1D99\", pnl AS \"Pnl\"\nFROM nrt_reference_data\nWHERE valuation_date::text = @ValuationDate\nORDER BY trade_id",
    "timeoutSeconds": 300
  },
  "target": {
    "provider": "PostgreSql",
    "connectionString": "Host=localhost;Port=5432;Database=Xero;Username=postgres;Password=tc0ab1y",
    "query": "SELECT trade_id AS \"TradeId\", book AS \"Book\", desk AS \"Desk\",\n  risk_factor AS \"RiskFactor\", asset_class AS \"AssetClass\",\n  valuation_date::text AS \"ValuationDate\",\n  delta AS \"Delta\", gamma AS \"Gamma\", vega AS \"Vega\",\n  var_1d_99 AS \"Var1D99\", svar_1d_99 AS \"SVaR1D99\", pnl AS \"Pnl\"\nFROM nrt_target_data\nWHERE valuation_date::text = @ValuationDate\nORDER BY trade_id",
    "timeoutSeconds": 300
  },
  "compare": {
    "keyProperties": ["TradeId", "Book", "Desk", "RiskFactor", "ValuationDate"],
    "compareProperties": []
  },
  "output": {
    "diffDb": {
      "enabled": true,
      "provider": "PostgreSql",
      "connectionString": "Host=localhost;Port=5432;Database=Xero;Username=postgres;Password=tc0ab1y",
      "tableName": "NrtDiffResults"
    }
  }
}
```

### Browse runs & diffs
```
GET /api/runs                         → paginated run history
GET /api/runs/{runId}                 → single run summary
GET /api/runs/{runId}/diffs           → diffs for a run (filter: diffType, tradeId, book, desk, page, pageSize)
GET /api/diffs                        → all diffs across runs
GET /api/diffs/{id}                   → single diff row
```

---

## 6. Angular Pages

| Route | Component | Purpose |
|---|---|---|
| `/dashboard` | DashboardComponent | Summary stats |
| `/nrt-runs` | NrtRunsComponent | Run history table |
| `/new-run` | NewRunComponent | Form to POST a new run |
| `/diff-results?runId=N` | DiffResultsComponent | 3-tab diff viewer |

### DiffResultsComponent — key architecture

- **3 parallel API calls** via `forkJoin` (one per `diffType`) — avoids orphan rows being missed by shared pagination
- **Tab 0 (InBothButDiff)**: dynamic band columns — scans `diffs` JSON to discover field names at runtime, builds `fieldName_ref / _tgt / _diff` flat rows + DevExtreme band column defs
- **Tab 1 (OnlyInReference)** and **Tab 2 (OnlyInTarget)**: parse `compareItems` JSON, prefix fields with `ci_`
- **Context menu** (`onContextMenuPreparing`): captures `e.component` as `activeGrid` — **must use `e.items.length = 0; e.items.push(...)`** (not `e.items = [...]`, which breaks DevExtreme's reference)
- **Per-column decimal places**: `decimalMap: Map<string, number>` — all 3 column def arrays rebuilt to trigger change detection

---

## 7. Serilog Logging

### Xero.Logging (class library)

```csharp
// In any app entry point:
using var loggerFactory = SerilogHelper.CreateLogger("Xero.NrtRunner"); // or "Xero.WebApi"
// Returns ILoggerFactory backed by Log.Logger
// Writes to: D:\Apps\Logs\{appName}\{appName}-.log (daily rolling, 31-day retention)
// Also writes to console with timestamp + level + SourceContext
```

### WebApi wiring

```csharp
SerilogHelper.CreateLogger("Xero.WebApi");  // sets Log.Logger as side-effect
builder.Host.UseSerilog(Log.Logger);
app.UseSerilogRequestLogging();             // logs every HTTP request with timing
```

### Library classes — all accept optional ILogger

```csharp
new DbDataLoader<T>(refFactory, tgtFactory, loggerFactory.CreateLogger<DbDataLoader<T>>())
new ListComparer<T>(keyProps, ignoreProps,  loggerFactory.CreateLogger<ListComparer<T>>())
new DbDiffSaver<T>(factory, connStr, table, keys, loggerFactory.CreateLogger<DbDiffSaver<T>>())
new SqlAuditSaver<T>(connStr,               loggerFactory.CreateLogger<SqlAuditSaver<T>>())
```

---

## 8. Key Design Decisions & Non-Obvious Facts

### Enum serialization
`DbProvider` enum must be sent as a **string** (`"PostgreSql"`, `"SqlServer"`).  
`JsonStringEnumConverter` is registered globally in `WebApi/Program.cs` via `AddControllers().AddJsonOptions(...)`.  
Without it, the API returns `400 "One or more validation errors occurred."`.

### CompareResult correlation (no FK)
`NrtResultService.BuildDiffWhere()` correlates `NrtDiffResults` to `nrt_runs` via:
```sql
WHERE EXISTS (
  SELECT 1 FROM nrt_runs r
  WHERE r.run_id = @RunId
    AND r.run_timestamp = d."RunTimestamp"
    AND r.scenario_name = d."ScenarioName")
```

### ListComparer performance
Uses pre-sized `HashSetComparer<T>` with pre-compiled property getters (Expression trees).  
`CompareInBoth` runs `.AsParallel()` across all CPU cores.  
Logs a Gantt chart of task timing after every comparison.

### DbDataLoader — parallel loading
Both sides load concurrently via `Task.WhenAll`. Total wall time = slower of the two loads.

### DiffResults — Diffs JSON format
```json
{ "Delta": { "Ref": 1.0, "Tgt": 1.1 }, "Gamma": { "Ref": 0.5, "Tgt": 0.6 } }
```
CompareItems (orphan rows):
```json
[{ "TradeId": "T001", "Delta": 1.0, ... }]
```

### Angular environment file
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:60513/api',
};
```
Import path from a page component (e.g. `pages/diff-results/`):  
`'../../../environments/environment'` (3 levels up, NOT 4).

---

## 9. Package Versions (all projects target net10.0)

| Package | Version |
|---|---|
| Dapper | 2.1.72 |
| Npgsql | 10.0.2 |
| Microsoft.Data.SqlClient | 6.0.1 |
| EPPlus | 7.6.1 |
| Serilog | 4.2.0 |
| Serilog.AspNetCore | 9.0.0 |
| Serilog.Extensions.Logging | 9.0.1 |
| Serilog.Sinks.Console | 6.0.0 |
| Serilog.Sinks.File | 6.0.0 |
| Serilog.Enrichers.Thread | 4.0.0 |
| Serilog.Enrichers.Environment | 3.0.0 |
| Microsoft.Extensions.Logging.Abstractions | 10.0.0 |
| Swashbuckle.AspNetCore | 7.2.0 |

Angular: 17.3.x · DevExtreme: 23.2.x · Node: (whatever is installed)

---

## 10. Bugs Fixed in This Session (don't reintroduce)

| Bug | Cause | Fix |
|---|---|---|
| `400 "One or more validation errors occurred."` on POST /api/nrt/runs | `System.Text.Json` deserializes enums as integers; request sends strings | Added `JsonStringEnumConverter` in `AddControllers().AddJsonOptions(...)` |
| Context menu not appearing on right-click | `e.items = [...]` replaces DevExtreme's internal array reference | Changed to `e.items.length = 0; e.items.push(...)` |
| "Only in Target" tab always empty | Single API call with shared pagination; InBothButDiff rows consumed all slots | Changed to `forkJoin` with 3 separate calls, one per `diffType` |
| Wrong environment import path | 4 levels up (`../../../../environments`) instead of 3 | Fixed to `'../../../environments/environment'` |
| Run returns 0 rows | Form defaulted `valuationDate` to `new Date()` (today); data only exists for `2025-01-31` | Hardcoded default to `'2025-01-31'` in `new-run.component.ts` |
| Logging not working after Serilog changes | Running old binary (DLLs locked by live process) | Use `restart.ps1` to kill old process, rebuild, restart |

---

## 11. How to Ask Claude to Continue Work

Paste this file, then describe what you want. Example openers:

- *"Continue work on the Xero NRT project. I want to add [feature]."*
- *"In the Xero project, the diff-results page needs [change]."*
- *"Fix [bug] in Xero — the relevant service is NrtService.cs."*

Claude will read specific files as needed rather than re-deriving everything from scratch.
