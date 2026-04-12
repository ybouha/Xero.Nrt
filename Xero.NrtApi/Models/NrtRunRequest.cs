namespace Xero.NrtApi.Models;

/// <summary>Database engine choices, matching Xero.DataAcquisition factories.</summary>
public enum DbProvider { SqlServer, PostgreSql }

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
}

public sealed class DbSettingsDto
{
    public DbProvider Provider         { get; set; } = DbProvider.PostgreSql;
    public string     ConnectionString { get; set; } = string.Empty;
    public string     Query            { get; set; } = string.Empty;
    public int        TimeoutSeconds   { get; set; } = 300;
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
    public DbProvider Provider         { get; set; } = DbProvider.PostgreSql;
    public string     ConnectionString { get; set; } = string.Empty;
    public string     TableName        { get; set; } = "NrtDiffResults";
}
