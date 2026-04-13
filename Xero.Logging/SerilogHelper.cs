using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Events;

namespace Xero.Logging;

/// <summary>
/// Central Serilog configuration helper.
/// Call <see cref="CreateLogger"/> from every application entry-point so that all
/// sinks and enrichers are configured consistently across the solution.
/// </summary>
/// <remarks>
/// Log files are written to <c>D:\Apps\Logs\{appName}\{appName}-.log</c> with
/// daily rolling, 31-day retention, and structured (JSON) file output.
/// Console output uses a compact human-readable template.
/// </remarks>
public static class SerilogHelper
{
    private const string LogRoot = @"D:\Apps\Logs";

    private const string ConsoleTemplate =
        "[{Timestamp:HH:mm:ss} {Level:u3}] {SourceContext} {Message:lj}{NewLine}{Exception}";

    /// <summary>
    /// Creates and assigns <see cref="Log.Logger"/> for the given application name,
    /// then returns an <see cref="ILoggerFactory"/> backed by that logger so library
    /// classes that accept <c>ILogger&lt;T&gt;</c> can receive properly typed loggers.
    /// </summary>
    /// <param name="appName">
    /// Application folder name under <c>D:\Apps\Logs\</c>.
    /// Use the project assembly name, e.g. <c>"Xero.NrtRunner"</c>.
    /// </param>
    /// <param name="minimumLevel">Minimum log level (default: <see cref="LogEventLevel.Information"/>).</param>
    /// <returns>An <see cref="ILoggerFactory"/> wrapping the configured Serilog logger.</returns>
    public static ILoggerFactory CreateLogger(
        string appName,
        LogEventLevel minimumLevel = LogEventLevel.Information)
    {
        var logDir  = Path.Combine(LogRoot, appName);
        var logFile = Path.Combine(logDir, $"{appName}-.log");

        Directory.CreateDirectory(logDir);

        Log.Logger = new LoggerConfiguration()
            .MinimumLevel.Is(minimumLevel)
            .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
            .MinimumLevel.Override("System",    LogEventLevel.Warning)
            .Enrich.FromLogContext()
            .Enrich.WithThreadId()
            .Enrich.WithMachineName()
            .WriteTo.Console(
                outputTemplate: ConsoleTemplate,
                restrictedToMinimumLevel: minimumLevel)
            .WriteTo.File(
                path:                logFile,
                rollingInterval:     RollingInterval.Day,
                retainedFileCountLimit: 31,
                outputTemplate:      "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{Level:u3}] {SourceContext} {Message:lj} {Properties:j}{NewLine}{Exception}",
                restrictedToMinimumLevel: minimumLevel)
            .CreateLogger();

        return Microsoft.Extensions.Logging.LoggerFactory.Create(builder =>
            builder.AddSerilog(Log.Logger, dispose: false));
    }

    /// <summary>
    /// Flushes pending log events and disposes the static logger.
    /// Call this at application shutdown (e.g. in a <c>finally</c> block or
    /// after <c>app.Run()</c> in an ASP.NET Core host).
    /// </summary>
    public static void CloseAndFlush() => Log.CloseAndFlush();
}
