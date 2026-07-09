using Npgsql;
using Serilog.Core;
using Serilog.Events;

namespace Xero.WebApi.Logging;

/// <summary>
/// Serilog sink that persists only log events carrying a <c>RunId</c> property into
/// <c>nrt_run_logs</c>, enabling per-run log retrieval by correlation id.
/// Events without a <c>RunId</c> are ignored (they still reach the console/file sinks).
/// </summary>
public sealed class PostgresRunLogSink : ILogEventSink
{
    private readonly string _connectionString;

    public PostgresRunLogSink(string connectionString) => _connectionString = connectionString;

    public void Emit(LogEvent logEvent)
    {
        if (!logEvent.Properties.TryGetValue("RunId", out var runIdValue)) return;
        if (runIdValue is not ScalarValue { Value: { } raw } || !TryToInt(raw, out var runId)) return;

        var sourceContext =
            logEvent.Properties.TryGetValue("SourceContext", out var sc) && sc is ScalarValue { Value: string s }
                ? s : null;

        try
        {
            using var conn = new NpgsqlConnection(_connectionString);
            conn.Open();
            using var cmd = new NpgsqlCommand(
                @"INSERT INTO nrt_run_logs (run_id, ts, level, message, exception, source_context)
                  VALUES (@run_id, @ts, @level, @message, @exception, @source_context)", conn);
            cmd.Parameters.AddWithValue("run_id", runId);
            cmd.Parameters.AddWithValue("ts", logEvent.Timestamp);
            cmd.Parameters.AddWithValue("level", logEvent.Level.ToString());
            cmd.Parameters.AddWithValue("message", logEvent.RenderMessage());
            cmd.Parameters.AddWithValue("exception", (object?)logEvent.Exception?.ToString() ?? DBNull.Value);
            cmd.Parameters.AddWithValue("source_context", (object?)sourceContext ?? DBNull.Value);
            cmd.ExecuteNonQuery();
        }
        catch
        {
            // Logging must never break the application; swallow persistence failures.
        }
    }

    private static bool TryToInt(object raw, out int value)
    {
        try { value = Convert.ToInt32(raw); return true; }
        catch { value = 0; return false; }
    }
}
