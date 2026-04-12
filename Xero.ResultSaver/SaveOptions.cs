namespace Xero.ResultSaver;

/// <summary>
/// Metadata attached to every save operation — written to file headers,
/// JSON envelopes, and the SQL audit log.
/// </summary>
public sealed class SaveOptions
{
    /// <summary>Destination: file path for Excel/JSON, connection string for SQL audit.</summary>
    public required string OutputPath { get; init; }

    /// <summary>Short name identifying the NRT scenario (e.g. "VaR Engine v2.1 vs v2.0").</summary>
    public string ScenarioName { get; init; } = "NRT";

    /// <summary>Timestamp stamped on every output artifact.</summary>
    public DateTimeOffset RunTimestamp { get; init; } = DateTimeOffset.UtcNow;

    /// <summary>Version label of the reference environment (e.g. "prod-2024-12").</summary>
    public string ReferenceVersion { get; init; } = string.Empty;

    /// <summary>Version label of the target / candidate environment (e.g. "uat-2025-01").</summary>
    public string TargetVersion { get; init; } = string.Empty;
}
