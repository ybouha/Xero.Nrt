using Microsoft.Extensions.Logging;
using Xero.DataAcquisition;
using Xero.ResultSaver;
using Xero.ResultViewer;
using Xero.SmartComparer;

namespace Xero.NrtRunner;

/// <summary>
/// Non-generic interface so <c>Program.cs</c> can invoke
/// <see cref="NrtRunnerPipeline{T}"/> without knowing T at compile time.
/// </summary>
public interface INrtRunnerPipeline
{
    Task<bool> RunAsync(
        NrtRunnerSettings settings,
        string            valuationDate,
        DateTimeOffset    runTimestamp,
        ILoggerFactory    loggerFactory,
        CancellationToken ct);
}

/// <summary>
/// Generic four-step NRT pipeline for the standalone runner:
/// Load → Compare → View → Save.
/// <typeparamref name="T"/> is a runtime-emitted type matching the run's
/// <c>ColumnSchema</c> from <c>appsettings.json</c>.
/// </summary>
public sealed class NrtRunnerPipeline<T> : INrtRunnerPipeline where T : class, new()
{
    public async Task<bool> RunAsync(
        NrtRunnerSettings settings,
        string            valuationDate,
        DateTimeOffset    runTimestamp,
        ILoggerFactory    loggerFactory,
        CancellationToken ct)
    {
        var log = loggerFactory.CreateLogger<NrtRunnerPipeline<T>>();

        // ── Factory resolution ─────────────────────────────────────────────────

        static IDbConnectionFactory ResolveFactory(DbProvider provider) => provider switch
        {
            DbProvider.PostgreSql => PostgreSqlConnectionFactory.Instance,
            _                     => SqlServerConnectionFactory.Instance
        };

        var refFactory = ResolveFactory(settings.Reference.Provider);
        var tgtFactory = ResolveFactory(settings.Target.Provider);

        // ── Step 1 — Load data ─────────────────────────────────────────────────

        var loadOptions = new DataLoadOptions
        {
            ReferenceConnectionString = settings.Reference.ConnectionString,
            TargetConnectionString    = settings.Target.ConnectionString,
            ReferenceSql              = settings.Reference.Query,
            TargetSql                 = settings.Target.Query,
            ReferenceParams           = new { ValuationDate = valuationDate },
            TargetParams              = new { ValuationDate = valuationDate },
            CommandTimeoutSeconds     = Math.Max(
                settings.Reference.TimeoutSeconds, settings.Target.TimeoutSeconds),
            ScenarioName              = settings.ScenarioName,
        };

        log.LogInformation("Step 1 — Loading data from both environments");
        var loader = new DbDataLoader<T>(
            refFactory, tgtFactory,
            loggerFactory.CreateLogger<DbDataLoader<T>>());
        var (reference, target) = await loader.LoadAsync(loadOptions, ct);

        // ── Step 2 — Compare ───────────────────────────────────────────────────

        log.LogInformation("Step 2 — Running SmartComparer");

        var keyProps = settings.Compare.KeyProperties.ToList();

        var ignoreProps = settings.Compare.CompareProperties.Length > 0
            ? typeof(T).GetProperties()
                .Select(p => p.Name)
                .Where(n => !keyProps.Contains(n)
                         && !settings.Compare.CompareProperties.Contains(n))
                .ToList()
            : new List<string>();

        var comparer = new ListComparer<T>(
            keyProps,
            ignoreProps,
            loggerFactory.CreateLogger<ListComparer<T>>());

        var result = await comparer.CompareList(reference.ToList(), target.ToList());

        log.LogInformation(
            "Step 2 done — InBothButDiff={Diff:N0} OnlyInRef={OnlyRef:N0} OnlyInTgt={OnlyTgt:N0}",
            result.Count,
            result.OnlyInReference?.Count ?? 0,
            result.OnlyInTarget?.Count    ?? 0);

        // ── Step 3 — View ──────────────────────────────────────────────────────

        log.LogInformation("Step 3 — Rendering results");
        new ConsoleResultViewer<T>().Render(result, settings.ScenarioName);

        Directory.CreateDirectory(settings.Output.OutputDirectory);

        new HtmlResultViewer<T>(
            outputPath: Path.Combine(
                settings.Output.OutputDirectory,
                $"NRT_{settings.ScenarioName.Replace(' ', '_')}_{runTimestamp:yyyyMMdd_HHmmss}.html"))
            .Render(result, settings.ScenarioName);

        // ── Step 4 — Save ──────────────────────────────────────────────────────

        log.LogInformation("Step 4 — Saving results");

        var saveOptions = new SaveOptions
        {
            OutputPath       = Path.Combine(
                settings.Output.OutputDirectory,
                $"NRT_{settings.ScenarioName.Replace(' ', '_')}_{runTimestamp:yyyyMMdd_HHmmss}"),
            ScenarioName     = settings.ScenarioName,
            RunTimestamp     = runTimestamp,
            ReferenceVersion = settings.ReferenceVersion,
            TargetVersion    = settings.TargetVersion,
        };

        var savers = new List<IResultSaver<T>>();

        if (settings.Output.SaveExcel)
            savers.Add(new ExcelResultSaver<T>());

        if (settings.Output.SaveJson)
            savers.Add(new JsonResultSaver<T>());

        if (settings.Output.SaveSqlAudit
            && !string.IsNullOrWhiteSpace(settings.Output.AuditConnectionString))
        {
            savers.Add(new SqlAuditSaver<T>(
                settings.Output.AuditConnectionString,
                loggerFactory.CreateLogger<SqlAuditSaver<T>>()));
        }

        if (settings.Output.DiffDb.Enabled
            && !string.IsNullOrWhiteSpace(settings.Output.DiffDb.ConnectionString))
        {
            var diffFactory = ResolveFactory(settings.Output.DiffDb.Provider);
            savers.Add(new DbDiffSaver<T>(
                diffFactory,
                settings.Output.DiffDb.ConnectionString,
                settings.Output.DiffDb.TableName,
                loggerFactory.CreateLogger<DbDiffSaver<T>>()));
        }

        foreach (var saver in savers)
            await saver.SaveAsync(result, saveOptions, ct);

        // ── Result ─────────────────────────────────────────────────────────────

        return result.Count == 0
            && (result.OnlyInReference?.Count ?? 0) == 0
            && (result.OnlyInTarget?.Count    ?? 0) == 0;
    }
}
