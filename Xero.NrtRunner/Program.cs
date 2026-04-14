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

    if (settings.ColumnSchema.Length == 0)
        throw new InvalidOperationException(
            "NrtRunnerSettings.ColumnSchema must contain at least one column. " +
            "Define the data schema in appsettings.json.");

    var valuationDate = args.Length > 0 ? args[0] : DateTime.Today.ToString("yyyy-MM-dd");
    var runTimestamp  = DateTimeOffset.UtcNow;

    log.LogInformation(
        "NrtRunner starting — Scenario={Scenario} ValDate={ValDate} RefVersion={RefVer} TgtVersion={TgtVer} Columns={ColCount}",
        settings.ScenarioName, valuationDate, settings.ReferenceVersion, settings.TargetVersion,
        settings.ColumnSchema.Length);

    // ── Resolve row type from schema ───────────────────────────────────────────

    var rowType = DynamicTypeBuilder.Build(settings.ColumnSchema);
    log.LogInformation("Dynamic row type '{TypeName}' resolved from schema", rowType.Name);

    // ── Dispatch to the generic pipeline via reflection ────────────────────────

    var pipelineType = typeof(NrtRunnerPipeline<>).MakeGenericType(rowType);
    var pipeline     = (INrtRunnerPipeline)Activator.CreateInstance(pipelineType)!;

    bool passed = await pipeline.RunAsync(
        settings, valuationDate, runTimestamp, loggerFactory, CancellationToken.None);

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
