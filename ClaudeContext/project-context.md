# Xero NRT — Claude Project Context

> Paste this file at the start of any new Claude session to skip context-building.
> Last updated: 2026-04-14

---

## 1. What This Project Is

**Xero** is a **.NET 10 + Angular 17 Non-Regression Testing (NRT) platform** for financial risk data (VaR).  
It loads reference and target datasets from PostgreSQL, compares them with a high-performance in-memory comparer, saves diff results back to the DB, and exposes everything via a REST API consumed by an Angular SPA.

**V2 feature set** (added 2026-04-13): **Run Definitions** (reusable named configs stored in DB) + **Run Executions** (full pipeline lifecycle tracking) + **CommandRunner** (pre-load shell execution).

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
├── Xero.Logging\                        ← shared Serilog helper
│   └── SerilogHelper.cs                 ← SerilogHelper.CreateLogger(appName) → ILoggerFactory
│                                           writes to D:\Apps\Logs\{appName}\{appName}-.log
│
├── Xero.NrtRunner\                      ← console app (CI/CD entry point)
│   └── Program.cs                       ← 5-step pipeline; uses SerilogHelper + ILoggerFactory
│
├── db\
│   ├── V1__initial_schema.sql           ← original tables
│   └── V2__run_definitions_and_execution_tracking.sql  ← renames nrt_runs → nrt_run_executions,
│                                                            adds status columns, creates nrt_run_definitions
│
└── Xero.WebApi\                         ← ASP.NET Core 10 REST API
    ├── Program.cs                       ← Serilog + JsonStringEnumConverter + CORS for Angular
    │                                       Registers: RunExecutionRepository, NrtRunDefinitionRepository,
    │                                       ICommandRunner→CommandRunner, INrtRunDefinitionService,
    │                                       INrtService→NrtService, INrtResultService→NrtResultService
    ├── Controllers\
    │   ├── NrtController.cs             ← POST /api/nrt/runs  (legacy trigger endpoint)
    │   ├── NrtRunsController.cs         ← GET /api/runs, /api/runs/{id}, /api/runs/{id}/diffs
    │   ├── DiffResultsController.cs     ← GET /api/diffs, /api/diffs/{id}
    │   ├── RunDefinitionsController.cs  ← CRUD /api/run-definitions + POST /{id}/execute
    │   └── RunExecutionsController.cs   ← POST /api/run-executions, GET /api/run-executions[/{id}]
    ├── Services\
    │   ├── NrtService.cs                ← orchestrates pipeline; full lifecycle status tracking
    │   ├── NrtResultService.cs          ← Dapper queries against nrt_run_executions + NrtDiffResults
    │   ├── NrtRunDefinitionService.cs   ← thin wrapper over NrtRunDefinitionRepository
    │   ├── CommandRunner.cs             ← shell execution (cmd.exe /c on Windows, bash on Linux)
    │   └── ICommandRunner.cs            ← RunAsync(commandLine, ct) → CommandResult(ExitCode,Stdout,Stderr)
    ├── Data\
    │   ├── RunExecutionRepository.cs    ← CRUD on nrt_run_executions; full status tracking methods
    │   ├── NrtRunDefinitionRepository.cs← CRUD on nrt_run_definitions; JSONB serialization
    │   └── NrtRunRepository.cs          ← EMPTY stub (renamed to RunExecutionRepository)
    └── Models\
        ├── NrtRunRequest.cs             ← NrtRunRequest (now includes DefinitionId?, RefCommandLine?, TargetCommandLine?)
        ├── NrtRunResponse.cs            ← RunExecutionResponse (POST result), RunExecutionSummary (GET)
        ├── NrtRunDto.cs                 ← RunExecutionDto (used by NrtResultService → NrtRunsController)
        ├── NrtRunDefinitionDto.cs       ← NrtRunDefinitionSummary, NrtRunDefinitionDto, SaveNrtRunDefinitionRequest,
        │                                   ExecuteFromDefinitionRequest
        └── DiffResultDto.cs             ← DiffResultDto, ColumnDef, etc.

Xero.WebApp\                             ← Angular 17 SPA (standalone components, DevExtreme 23.2)
├── src\environments\environment.ts      ← apiBaseUrl: 'http://localhost:60513/api'
└── src\app\
    ├── core\models\nrt.models.ts        ← TypeScript interfaces mirroring C# DTOs
    │                                       parseColumnSchema() helper (handles PascalCase + camelCase JSON)
    ├── core\services\
    │   ├── result-viewer.service.ts     ← getRuns, getDiffsForRun, getDiffs, getDiff
    │   └── nrt-api.service.ts           ← executeRun, getRuns, getDefinitions, createDefinition,
    │                                       updateDefinition, deleteDefinition, executeFromDefinition
    └── pages\
        ├── dashboard\                   ← summary stats
        ├── nrt-runs\                    ← (legacy) run history list
        ├── new-run\                     ← form to trigger a new NRT run
        ├── diff-results\                ← main viewer (3-tab grid with context menu)
        ├── run-definitions\             ← list + execute/delete popup (RunDefinitionsComponent)
        ├── run-executions\              ← execution history + status badges + detail popup
        └── run-definition-form\         ← create/edit form with inline column schema editor
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
| `nrt_run_executions` | Execution header per run — renamed from `nrt_runs` in V2 migration |
| `nrt_run_definitions` | Reusable named run configs (UUID PK, JSONB for nested settings) |
| `NrtDiffResults` | Individual diff rows (InBothButDiff / OnlyInReference / OnlyInTarget) |

> **Important**: Source data only exists for `valuation_date = 2025-01-31`.  
> The New Run form defaults to `'2025-01-31'`. Do NOT use today's date.

### nrt_run_executions — key columns (V2)

```
run_id (serial PK), definition_id (UUID FK → nrt_run_definitions, nullable),
scenario_name, reference_version, target_version, valuation_date,
run_timestamp, completed_at, status (text: pending|running_commands|running_comparison|saving_results|completed|failed),
passed (bool), error_message (text),
ref_cmd_status (text), ref_cmd_started_at, ref_cmd_completed_at, ref_cmd_exit_code, ref_cmd_stderr,
tgt_cmd_status (text), tgt_cmd_started_at, tgt_cmd_completed_at, tgt_cmd_exit_code, tgt_cmd_stderr,
comparison_started_at, saving_started_at,
total_count, match_count, diff_count, only_ref_count, only_tgt_count
```

### nrt_run_definitions — key columns (V2)

```
definition_id (UUID PK), name (text unique), description, scope, scenario_name, reference_version, target_version,
ref_command_line (text), target_command_line (text),
reference_settings (JSONB), target_settings (JSONB), compare_settings (JSONB),
output_settings (JSONB), column_schema (JSONB),
is_active (bool), created_at, updated_at
```

### Key columns in NrtDiffResults

```
Id, RunTimestamp, ScenarioName, ReferenceVersion, TargetVersion,
TradeId, Book, Desk, RiskFactor, ValuationDate,
RunId (FK → nrt_run_executions.run_id),   ← added in V2
DiffType  (InBothButDiff | OnlyInReference | OnlyInTarget),
Diffs     (JSONB: {"FieldName":{"Ref":v,"Tgt":v}, ...}),
CompareItems (JSONB: [refItem, tgtItem] or [singleItem])
```

### Correlation: nrt_run_executions ↔ NrtDiffResults

V2: linked via `RunId` FK (written by `DbDiffSaver<T>`).  
Legacy fallback: `NrtResultService` joins via `run_timestamp + scenario_name` for older rows without `RunId`.

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

### V2 — Run Definitions (CRUD + Execute)

```
GET    /api/run-definitions                → list all (NrtRunDefinitionSummary[])
GET    /api/run-definitions/{id:guid}      → get one (NrtRunDefinitionDto)
POST   /api/run-definitions                → create (SaveNrtRunDefinitionRequest → 201)
PUT    /api/run-definitions/{id:guid}      → update (SaveNrtRunDefinitionRequest → 204)
DELETE /api/run-definitions/{id:guid}      → soft-delete (sets is_active=false → 204)
POST   /api/run-definitions/{id:guid}/execute → execute (ExecuteFromDefinitionRequest{valuationDate} → RunExecutionResponse)
```

### V2 — Run Executions

```
POST /api/run-executions               → trigger a run (NrtRunRequest → RunExecutionResponse)
GET  /api/run-executions               → execution history (RunExecutionSummary[])
GET  /api/run-executions/{runId:int}   → single execution
```

### Legacy endpoints (still working)

```
POST /api/nrt/runs                    → legacy trigger (same NrtRunRequest body)
GET  /api/runs                        → run history (RunExecutionDto[], paged)
GET  /api/runs/{runId}                → single run
GET  /api/runs/{runId}/diffs          → diffs for a run (filter: diffType, tradeId, book, desk, page, pageSize)
GET  /api/diffs                       → all diffs across runs
GET  /api/diffs/{id}                  → single diff row
```

### Full NrtRunRequest body (V2)

```json
{
  "definitionId": null,
  "scenarioName": "VaR NRT",
  "referenceVersion": "prod-2025-01",
  "targetVersion": "uat-2025-02",
  "valuationDate": "2025-01-31",
  "refCommandLine": null,
  "targetCommandLine": null,
  "reference": {
    "provider": "PostgreSql",
    "connectionString": "Host=localhost;Port=5432;Database=Xero;Username=postgres;Password=tc0ab1y",
    "query": "SELECT trade_id AS \"TradeId\", ...\nFROM nrt_reference_data\nWHERE valuation_date::text = @ValuationDate",
    "timeoutSeconds": 300
  },
  "target": { "provider": "PostgreSql", "connectionString": "...", "query": "...", "timeoutSeconds": 300 },
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

---

## 6. Angular Pages

| Route | Component | Purpose |
|---|---|---|
| `/dashboard` | DashboardComponent | Summary stats |
| `/run-executions` | RunExecutionsComponent | Execution history with status badges and detail popup |
| `/run-definitions` | RunDefinitionsComponent | List definitions; execute/delete popups |
| `/run-definitions/new` | RunDefinitionFormComponent | Create new definition |
| `/run-definitions/:id/edit` | RunDefinitionFormComponent | Edit existing definition |
| `/nrt-runs` | NrtRunsComponent | (Legacy) run history table |
| `/new-run` | NewRunComponent | Form to POST a new run ad-hoc |
| `/diff-results?runId=N` | DiffResultsComponent | 3-tab diff viewer |

### RunDefinitionFormComponent — key details

- Detects edit mode via `:id` route param
- 12-column default column schema (TradeId, Book, Desk, RiskFactor, AssetClass, ValuationDate, Delta, Gamma, Vega, Var1D99, SVaR1D99, Pnl)
- Default PostgreSQL connection string: `Host=localhost;Port=5432;Database=Xero;Username=postgres;Password=tc0ab1y`
- Tag-box datasource for `keyProperties`/`compareProperties` auto-derived from `columnSchema` names

### DiffResultsComponent — key architecture

- **3 parallel API calls** via `forkJoin` (one per `diffType`) — avoids orphan rows being missed by shared pagination
- **Tab 0 (InBothButDiff)**: dynamic band columns — scans `diffs` JSON to discover field names at runtime, builds `fieldName_ref / _tgt / _diff` flat rows + DevExtreme band column defs
- **Tab 1/2**: parse `compareItems` JSON, prefix fields with `ci_`
- **Context menu** (`onContextMenuPreparing`): **must use `e.items.length = 0; e.items.push(...)`** (not `e.items = [...]`)
- **Per-column decimal places**: `decimalMap: Map<string, number>` — all 3 column def arrays rebuilt to trigger change detection

---

## 7. Serilog Logging

```csharp
SerilogHelper.CreateLogger("Xero.WebApi");  // sets Log.Logger as side-effect
builder.Host.UseSerilog(Log.Logger);
app.UseSerilogRequestLogging();
// Writes to: D:\Apps\Logs\{appName}\{appName}-.log (daily rolling, 31-day retention)
```

Library classes all accept optional `ILogger`:

```csharp
new DbDataLoader<T>(refFactory, tgtFactory, loggerFactory.CreateLogger<DbDataLoader<T>>())
new ListComparer<T>(keyProps, ignoreProps,  loggerFactory.CreateLogger<ListComparer<T>>())
new DbDiffSaver<T>(factory, connStr, table, keys, loggerFactory.CreateLogger<DbDiffSaver<T>>())
```

---

## 8. Key Design Decisions & Non-Obvious Facts

### Enum serialization
`DbProvider` enum must be sent as a **string** (`"PostgreSql"`, `"SqlServer"`).  
`JsonStringEnumConverter` is registered globally in `WebApi/Program.cs`.

### Run status lifecycle (V2)
```
pending → running_commands → running_comparison → saving_results → completed
                                                                 → failed (any phase)
```
`NrtService.ExecuteRunAsync` manages all transitions via `RunExecutionRepository`.

### CommandRunner (V2)
Runs shell commands before data loads. Exit code is tracked per side (ref/tgt).  
Windows: `cmd.exe /c {commandLine}`, Linux: `/bin/bash -c {commandLine}`.  
Non-zero exit code sets `ref_cmd_status`/`tgt_cmd_status = 'failed'` and aborts the run.

### Dual DTO pattern (by design)
Two parallel classes with identical fields serve different code paths:
- `RunExecutionSummary` (in `NrtRunResponse.cs`) → `RunExecutionRepository` → `RunExecutionsController` (V2 endpoints)
- `RunExecutionDto` (in `NrtRunDto.cs`) → `NrtResultService` → `NrtRunsController` (legacy `/api/runs`)

Both query `nrt_run_executions`. This is intentional — the legacy path is preserved for `ResultViewerService`.

### JSONB serialization in NrtRunDefinitionRepository
`reference_settings`, `target_settings`, `compare_settings`, `output_settings`, `column_schema` stored as JSONB.  
`NrtRunDefinitionRepository` manually serializes with `System.Text.Json` and deserializes on read.

### parseColumnSchema (Angular) — PascalCase fix
`column_schema` JSON from DB may serialize C# PascalCase properties. The helper reads both:
```typescript
export function parseColumnSchema(run: RunExecutionSummary): ColumnDef[] {
  const raw = JSON.parse(run.columnSchemaJson) as any[];
  return raw.map(c => ({ name: c.name ?? c.Name ?? '', type: c.type ?? c.Type ?? 'string' }));
}
```

### ListComparer performance
Uses pre-sized `HashSetComparer<T>` with pre-compiled property getters (Expression trees).  
`CompareInBoth` runs `.AsParallel()` across all CPU cores.

### DbDataLoader — parallel loading
Both sides load concurrently via `Task.WhenAll`.

### Angular environment file
```typescript
export const environment = { production: false, apiBaseUrl: 'http://localhost:60513/api' };
```
Import path from a page component (e.g. `pages/diff-results/`): `'../../../environments/environment'` (3 levels up).

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

## 10. Bugs Fixed (don't reintroduce)

| Bug | Cause | Fix |
|---|---|---|
| `400 "One or more validation errors occurred."` on POST /api/nrt/runs | `System.Text.Json` deserializes enums as integers; request sends strings | Added `JsonStringEnumConverter` in `AddControllers().AddJsonOptions(...)` |
| Context menu not appearing on right-click | `e.items = [...]` replaces DevExtreme's internal array reference | Changed to `e.items.length = 0; e.items.push(...)` |
| "Only in Target" tab always empty | Single API call with shared pagination | Changed to `forkJoin` with 3 separate calls, one per `diffType` |
| Wrong environment import path | 4 levels up instead of 3 | Fixed to `'../../../environments/environment'` |
| Run returns 0 rows | Form defaulted `valuationDate` to today; data only exists for `2025-01-31` | Hardcoded default to `'2025-01-31'` |
| Logging not working after Serilog changes | Running old binary | Use `restart.ps1` |
| `columnSchema` fields undefined in Angular | C# serializes PascalCase (`Name`, `Type`); Angular expected camelCase | Added `c.name ?? c.Name ?? ''` fallback in `parseColumnSchema()` |

---

## 11. How to Ask Claude to Continue Work

Paste this file, then describe what you want. Example openers:

- *"Continue work on the Xero NRT project. I want to add [feature]."*
- *"In the Xero project, the run-definitions page needs [change]."*
- *"Fix [bug] in Xero — the relevant service is NrtService.cs."*

Claude will read specific files as needed rather than re-deriving everything from scratch.
