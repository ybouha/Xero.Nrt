using System.Text.Json.Serialization;
using Xero.SmartComparer;

namespace Xero.WebApi.Models;

/// <summary>Database engine choices, matching Xero.DataAcquisition factories.</summary>
public enum DbProvider { SqlServer, PostgreSql, Couchbase }

/// <summary>
/// Full configuration for a single NRT run submitted via POST /api/nrt/runs.
/// </summary>
public sealed class NrtRunRequest
{
    public string ScenarioName     { get; set; } = "VaR NRT";
    public string ReferenceVersion { get; set; } = "Reference";
    public string TargetVersion    { get; set; } = "Target";

    /// <summary>ISO date string (yyyy-MM-dd). Defaults to today.</summary>
    public string ValuationDate    { get; set; } = DateTime.Today.ToString("yyyy-MM-dd");

    public DbSettingsDto    Reference { get; set; } = new();
    public DbSettingsDto    Target    { get; set; } = new();
    public CompareSettingsDto Compare { get; set; } = new();
    public OutputSettingsDto  Output  { get; set; } = new();

    /// <summary>
    /// Defines the columns of each data row. The runtime CLR type is generated
    /// from this schema using IL Emit. If empty, the tool expects the caller to
    /// provide a pre-existing type (backwards-compatible path).
    /// </summary>
    public ColumnDef[] ColumnSchema { get; set; } = [];

    // ── Optional definition linkage ───────────────────────────────────────────
    /// <summary>When set, the run is associated with this saved definition.</summary>
    public Guid?   DefinitionId      { get; set; }

    /// <summary>Shell command to run before loading reference data (optional).</summary>
    public string? RefCommandLine    { get; set; }

    /// <summary>Shell command to run before loading target data (optional).</summary>
    public string? TargetCommandLine { get; set; }
}

public sealed class DbSettingsDto
{
    public DbProvider Provider         { get; set; } = DbProvider.PostgreSql;
    public string     ConnectionString { get; set; } = string.Empty;
    public string     Query            { get; set; } = string.Empty;
    public int        TimeoutSeconds   { get; set; } = 300;

    /// <summary>
    /// Query parameters resolved at run time from this side's parameter script
    /// (e.g. <c>JobIds</c>). Each key becomes a Dapper parameter bound to the query.
    /// Transient — populated during execution, never persisted with the definition.
    /// </summary>
    [JsonIgnore]
    public Dictionary<string, object?> Parameters { get; set; } = new(StringComparer.OrdinalIgnoreCase);
}

public sealed class CompareSettingsDto
{
    /// <summary>Property names forming the composite match key.</summary>
    public string[] KeyProperties     { get; set; } = [];

    /// <summary>Properties to compare. Empty = compare all non-key properties.</summary>
    public string[] CompareProperties { get; set; } = [];
}

public sealed class OutputSettingsDto
{
    public DiffDbSettingsDto DiffDb { get; set; } = new();
}

public sealed class DiffDbSettingsDto
{
    public bool       Enabled          { get; set; } = true;
    public string     ConnectionString { get; set; } = string.Empty;
    public string     TableName        { get; set; } = "NrtDiffResults";
}
