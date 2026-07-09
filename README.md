# Xero

An NRT (reference-vs-target) data comparison and orchestration platform. Reference and target datasets (e.g. risk/valuation runs) are acquired from a database, diffed column-by-column, and the results are saved and surfaced through a web UI — with run definitions, scheduled executions, and history all tracked in Postgres.

## Architecture

**Backend — `Xero.WebApi`** (ASP.NET Core)
Orchestration hub for the whole pipeline. Exposes REST endpoints for run definitions, run executions, schedules, and diff results; runs comparisons via `NrtPipelineRunner`; schedules recurring runs with Quartz.NET; logs to Postgres (`nrt_run_logs`) and file via Serilog.

- `Controllers/` — `NrtController`, `NrtRunsController`, `RunDefinitionsController`, `RunExecutionsController`, `RunSchedulesController`, `DiffResultsController`
- `Services/` — `NrtService` / `NrtPipelineRunner` (executes the compare pipeline), `NrtRunDefinitionService`, `NrtResultService`, `PowerShellScriptRunner` (invokes external scripts as part of a run)

**Frontend — `Xero.WebApp`** (Angular 17, DevExtreme)
CRUD/monitoring UI for defining, scheduling, running, and reviewing comparison jobs: dashboard, run definitions (+ form), run executions, run scheduling, diff results.

**Comparison engine & pipeline projects**

| Project | Responsibility |
|---|---|
| `Xero.SmartComparer` | Core generic list-diff engine (`ListComparer`, `EqualityComparer`, `HashSetComparer`, `DynamicTypeBuilder`, `CompareResult`) |
| `Xero.DataAcquisition` | Loads reference/target rows from Postgres or SQL Server (`IDataLoader`, `IDbConnectionFactory`) |
| `Xero.ResultSaver` | Persists comparison output — Excel, JSON, SQL audit, and diff-table (`NrtDiffResults`) writers |
| `Xero.ResultViewer` | Renders results after a run (console / HTML) |
| `Xero.NrtRunner` | Standalone console app that runs a single comparison end-to-end outside the API, driven by `appsettings.json` |
| `Xero.Logging` | Shared Serilog setup (`SerilogHelper`) used by every entry point |

**`Xero.JavaWebApi`** — an experimental Spring Boot (Java 21) port of `Xero.WebApi`, mirroring its controller/service/model structure. Not part of `Xero.sln`; not wired into the standard dev workflow below.

**`db/`** — Postgres schema and migrations: `create_tables.sql` (base tables), `V2`–`V4` (run executions/definitions, diff-result cleanup, run schedules), `seed_data.sql`.

## Getting started

Prerequisites: Docker, .NET 8 SDK, Node.js/npm.

```powershell
.\start.ps1   # Windows
```
```bash
./start.sh    # macOS/Linux
```

This brings up Postgres via `docker-compose.yml` (port 5433, healthcheck-gated), builds and runs `Xero.WebApi` on `http://localhost:60513` (Swagger at root), and starts the Angular dev server on `http://localhost:4200`.

To run a single comparison without the API, configure `Xero.NrtRunner/appsettings.json` and run:

```bash
dotnet run --project Xero.NrtRunner
```
