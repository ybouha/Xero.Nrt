using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Serilog;
using Xero.DataAcquisition;
using Xero.Logging;
using Xero.NrtRunner;
using Xero.ResultSaver;
using Xero.ResultViewer;
using Xero.SmartComparer;

// ── Logging ────────────────────────────────────────────────────────────────────

using var loggerFactory = SerilogHelper.CreateLogger("Xero.NrtRunner");
var log = loggerFactory.CreateLogger("Program");

try
{
    // ── Configuration ──────────────────────────────────────────────────────────

    var config = new ConfigurationBuilder()
        .SetBasePath(AppContext.BaseDirectory)
        .AddJsonFile("appsettings.json", optional: false, reloadOnChange: false)
        .Build();

    var settings = config.Get<NrtRunnerSettings>()
        ?? throw new InvalidOperationException("Failed to bind appsettings.json to NrtRunnerSettings.");

    var valuationDate = args.Length > 0 ? args[0] : DateTime.Today.ToString("yyyy-MM-dd");
    var runTimestamp  = DateTimeOffset.UtcNow;

    log.LogInformation(
        "NrtRunner starting — Scenario={Scenario} ValDate={ValDate} RefVersion={RefVer} TgtVersion={TgtVer}",
        settings.ScenarioName, valuationDate, settings.ReferenceVersion, settings.TargetVersion);

    // ── Factory resolution ─────────────────────────────────────────────────────

    static IDbConnectionFactory ResolveFactory(DbProvider provider) => provider switch
    {
        DbProvider.PostgreSql => PostgreSqlConnectionFactory.Instance,
        _                     => SqlServerConnectionFactory.Instance
    };

    var refFactory = ResolveFactory(settings.Reference.Provider);
    var tgtFactory = ResolveFactory(settings.Target.Provider);

    // ── Step 1 — Load data ────────────────────────────────────────────────────

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

    log.LogInformation("Step 1 — Loading data from both environments");
    var loader = new DbDataLoader<VarTradeRow>(
        refFactory, tgtFactory,
        loggerFactory.CreateLogger<DbDataLoader<VarTradeRow>>());
    var (reference, target) = await loader.LoadAsync(loadOptions, cts.Token);

    // ── Step 2 — Compare ──────────────────────────────────────────────────────

    log.LogInformation("Step 2 — Running SmartComparer");

    var ignoreProperties = settings.Compare.CompareProperties.Length > 0
        ? typeof(VarTradeRow).GetProperties()
            .Select(p => p.Name)
            .Where(n => !settings.Compare.KeyProperties.Contains(n)
                     && !settings.Compare.CompareProperties.Contains(n))
            .ToList()
        : new List<string>();

    var comparer = new ListComparer<VarTradeRow>(
        settings.Compare.KeyProperties.ToList(),
        ignoreProperties,
        loggerFactory.CreateLogger<ListComparer<VarTradeRow>>());

    var result = await comparer.CompareList(reference.ToList(), target.ToList());

    log.LogInformation(
        "Step 2 done — InBothButDiff={Diff:N0} OnlyInRef={OnlyRef:N0} OnlyInTgt={OnlyTgt:N0}",
        result.Count,
        result.OnlyInReference?.Count ?? 0,
        result.OnlyInTarget?.Count ?? 0);

    // ── Step 3 — View ─────────────────────────────────────────────────────────

    log.LogInformation("Step 3 — Rendering results");
    new ConsoleResultViewer<VarTradeRow>().Render(result, settings.ScenarioName);

    Directory.CreateDirectory(settings.Output.OutputDirectory);

    new HtmlResultViewer<VarTradeRow>(
        outputPath: Path.Combine(
            settings.Output.OutputDirectory,
            $"NRT_{settings.ScenarioName.Replace(' ', '_')}_{runTimestamp:yyyyMMdd_HHmmss}.html"))
        .Render(result, settings.ScenarioName);

    // ── Step 4 — Save ─────────────────────────────────────────────────────────

    log.LogInformation("Step 4 — Saving results");

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
        savers.Add(new SqlAuditSaver<VarTradeRow>(
            settings.Output.AuditConnectionString,
            loggerFactory.CreateLogger<SqlAuditSaver<VarTradeRow>>()));

    if (settings.Output.DiffDb.Enabled &&
        !string.IsNullOrWhiteSpace(settings.Output.DiffDb.ConnectionString))
    {
        var diffFactory = ResolveFactory(settings.Output.DiffDb.Provider);
        savers.Add(new DbDiffSaver<VarTradeRow>(
            diffFactory,
            settings.Output.DiffDb.ConnectionString,
            settings.Output.DiffDb.TableName,
            settings.Compare.KeyProperties,
            loggerFactory.CreateLogger<DbDiffSaver<VarTradeRow>>()));
    }

    foreach (var saver in savers)
        await saver.SaveAsync(result, saveOptions, cts.Token);

    // ── Step 5 — Exit code ────────────────────────────────────────────────────

    bool passed = result.Count == 0
        && (result.OnlyInReference?.Count ?? 0) == 0
        && (result.OnlyInTarget?.Count    ?? 0) == 0;

    log.LogInformation("NrtRunner finished — Status={Status}", passed ? "PASS" : "FAIL");

    return passed ? 0 : 1;
}
catch (Exception ex)
{
    log.LogCritical(ex, "NrtRunner terminated with an unhandled exception");
    return 2;
}
finally
{
    SerilogHelper.CloseAndFlush();
}
