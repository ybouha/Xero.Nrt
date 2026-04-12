namespace Xero.DataAcquisition;

/// <summary>
/// Configures both sides of a data load for an NRT comparison run.
/// </summary>
public sealed class DataLoadOptions
{
    /// <summary>ADO.NET connection string for the reference environment (e.g. production snapshot).</summary>
    public required string ReferenceConnectionString { get; init; }

    /// <summary>ADO.NET connection string for the target environment (e.g. new engine / UAT).</summary>
    public required string TargetConnectionString { get; init; }

    /// <summary>SQL query to execute against the reference database. Supports Dapper parameters.</summary>
    public required string ReferenceSql { get; init; }

    /// <summary>SQL query to execute against the target database. Supports Dapper parameters.</summary>
    public required string TargetSql { get; init; }

    /// <summary>Optional Dapper parameter object for the reference query (anonymous type or DynamicParameters).</summary>
    public object? ReferenceParams { get; init; }

    /// <summary>Optional Dapper parameter object for the target query.</summary>
    public object? TargetParams { get; init; }

    /// <summary>Command timeout in seconds (default 120 s — VaR extracts can be large).</summary>
    public int CommandTimeoutSeconds { get; init; } = 120;

    /// <summary>Human-readable name shown in logs and reports.</summary>
    public string ScenarioName { get; init; } = "NRT";
}
