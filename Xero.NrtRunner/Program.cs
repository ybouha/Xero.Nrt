using Xero.DataAcquisition;
using Microsoft.Extensions.Configuration;
using Xero.NrtRunner;
using Xero.ResultSaver;
using Xero.ResultViewer;
using Xero.SmartComparer;

// ── Configuration ─────────────────────────────────────────────────────────────

var config = new ConfigurationBuilder()
    .SetBasePath(AppContext.BaseDirectory)
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: false)
    .Build();

var settings = config.Get<NrtRunnerSettings>()
    ?? throw new InvalidOperationException("Failed to bind appsettings.json to NrtRunnerSettings.");

var valuationDate = args.Length > 0 ? args[0] : DateTime.Today.ToString("yyyy-MM-dd");
var runTimestamp  = DateTimeOffset.UtcNow;

Console.WriteLine($"[NrtRunner] Scenario  : {settings.ScenarioName}");
Console.WriteLine($"[NrtRunner] Reference : {settings.ReferenceVersion}  ({settings.Reference.Provider})");
Console.WriteLine($"[NrtRunner] Target    : {settings.TargetVersion}  ({settings.Target.Provider})");
Console.WriteLine($"[NrtRunner] ValDate   : {valuationDate}");
Console.WriteLine();

// ── Factory resolution (abstract factory) ─────────────────────────────────────

static IDbConnectionFactory ResolveFactory(DbProvider provider) => provider switch
{
    DbProvider.PostgreSql => PostgreSqlConnectionFactory.Instance,
    _                     => SqlServerConnectionFactory.Instance
};

var refFactory = ResolveFactory(settings.Reference.Provider);
var tgtFactory = ResolveFactory(settings.Target.Provider);

// ── Step 1 — Load data ────────────────────────────────────────────────────────

var loadOptions = new DataLoadOptions
{
    ReferenceConnectionString = settings.Reference.ConnectionString,
    TargetConnectionString    = settings.Target.ConnectionString,
    ReferenceSql              = settings.Reference.Query,
    TargetSql                 = settings.Target.Query,
    ReferenceParams           = new { ValuationDate = valuationDate },
    TargetParams              = new { ValuationDate = valuationDate },
    CommandTimeoutSeconds     = Math.Max(settings.Reference.TimeoutSeconds, settings.Target.TimeoutSeconds),
    ScenarioName              = settings.ScenarioName,
};

using var cts = new CancellationTokenSource(TimeSpan.FromMinutes(30));

Console.WriteLine("[NrtRunner] Loading data from both environments…");
var loader = new DbDataLoader<VarTradeRow>(refFactory, tgtFactory);
var (reference, target) = await loader.LoadAsync(loadOptions, cts.Token);
Console.WriteLine();

// ── Step 2 — Compare ──────────────────────────────────────────────────────────

Console.WriteLine("[NrtRunner] Running SmartComparer…");

// ignoreProperties = non-key props NOT in CompareProperties (empty = compare all)
var ignoreProperties = settings.Compare.CompareProperties.Length > 0
    ? typeof(VarTradeRow).GetProperties()
        .Select(p => p.Name)
        .Where(n => !settings.Compare.KeyProperties.Contains(n)
                 && !settings.Compare.CompareProperties.Contains(n))
        .ToList()
    : new List<string>();

var comparer = new ListComparer<VarTradeRow>(
    settings.Compare.KeyProperties.ToList(),
    ignoreProperties);

var result = await comparer.CompareList(reference.ToList(), target.ToList());

Console.WriteLine("[NrtRunner] Comparison complete.");
Console.WriteLine();

// ── Step 3 — View ─────────────────────────────────────────────────────────────

new ConsoleResultViewer<VarTradeRow>().Render(result, settings.ScenarioName);

Directory.CreateDirectory(settings.Output.OutputDirectory);

new HtmlResultViewer<VarTradeRow>(
    outputPath: Path.Combine(
        settings.Output.OutputDirectory,
        $"NRT_{settings.ScenarioName.Replace(' ', '_')}_{runTimestamp:yyyyMMdd_HHmmss}.html"))
    .Render(result, settings.ScenarioName);

// ── Step 4 — Save ─────────────────────────────────────────────────────────────

var saveOptions = new SaveOptions
{
    OutputPath       = Path.Combine(settings.Output.OutputDirectory,
                           $"NRT_{settings.ScenarioName.Replace(' ', '_')}_{runTimestamp:yyyyMMdd_HHmmss}"),
    ScenarioName     = settings.ScenarioName,
    RunTimestamp     = runTimestamp,
    ReferenceVersion = settings.ReferenceVersion,
    TargetVersion    = settings.TargetVersion,
};

var savers = new List<IResultSaver<VarTradeRow>>();

if (settings.Output.SaveExcel)
    savers.Add(new ExcelResultSaver<VarTradeRow>());

if (settings.Output.SaveJson)
    savers.Add(new JsonResultSaver<VarTradeRow>());

if (settings.Output.SaveSqlAudit && !string.IsNullOrWhiteSpace(settings.Output.AuditConnectionString))
    savers.Add(new SqlAuditSaver<VarTradeRow>(settings.Output.AuditConnectionString));

// DbDiffSaver: key columns as real columns, diff values as JSON/JSONB
if (settings.Output.DiffDb.Enabled &&
    !string.IsNullOrWhiteSpace(settings.Output.DiffDb.ConnectionString))
{
    var diffFactory = ResolveFactory(settings.Output.DiffDb.Provider);
    savers.Add(new DbDiffSaver<VarTradeRow>(
        diffFactory,
        settings.Output.DiffDb.ConnectionString,
        settings.Output.DiffDb.TableName,
        settings.Compare.KeyProperties));
}

foreach (var saver in savers)
    await saver.SaveAsync(result, saveOptions, cts.Token);

// ── Step 5 — Exit code (0 = PASS, 1 = FAIL — CI-friendly) ───────────────────

bool passed = result.Count == 0
    && (result.OnlyInReference?.Count ?? 0) == 0
    && (result.OnlyInTarget?.Count    ?? 0) == 0;

return passed ? 0 : 1;
