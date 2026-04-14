using Xero.SmartComparer;

namespace Xero.NrtRunner;

/// <summary>
/// Strongly-typed settings bound from appsettings.json.
/// </summary>
public sealed class NrtRunnerSettings
{
    public string ScenarioName      { get; set; } = "VaR NRT";
    public string ReferenceVersion  { get; set; } = "Reference";
    public string TargetVersion     { get; set; } = "Target";

    public DbSettings    Reference  { get; set; } = new();
    public DbSettings    Target     { get; set; } = new();

    public OutputSettings Output    { get; set; } = new();
    public CompareSettings Compare  { get; set; } = new();

    /// <summary>
    /// Defines the columns of each data row. Used to generate a CLR type at
    /// runtime via IL Emit. Must contain at least one entry.
    /// </summary>
    public ColumnDef[] ColumnSchema { get; set; } = [];
}

public sealed class DbSettings
{
    /// <summary>SqlServer or PostgreSql.</summary>
    public DbProvider Provider      { get; set; } = DbProvider.SqlServer;
    public string ConnectionString  { get; set; } = string.Empty;
    public string Query             { get; set; } = string.Empty;
    public int    TimeoutSeconds    { get; set; } = 120;
}

public enum DbProvider { SqlServer, PostgreSql }

public sealed class OutputSettings
{
    /// <summary>Directory where Excel and HTML reports are written.</summary>
    public string OutputDirectory        { get; set; } = ".";
    public bool   SaveExcel              { get; set; } = true;
    public bool   SaveJson               { get; set; } = true;
    public bool   SaveSqlAudit           { get; set; } = false;
    public string AuditConnectionString  { get; set; } = string.Empty;

    /// <summary>Save individual diff rows to a database table.</summary>
    public DiffDbSettings DiffDb         { get; set; } = new();
}

/// <summary>
/// Configuration for the <c>DbDiffSaver</c> which writes one row per diff into a relational table.
/// Key properties become individual queryable columns; all diff values go into a JSON column.
/// </summary>
public sealed class DiffDbSettings
{
    public bool         Enabled          { get; set; } = false;
    public DbProvider   Provider         { get; set; } = DbProvider.SqlServer;
    public string       ConnectionString { get; set; } = string.Empty;

    /// <summary>Table name. Created automatically if it does not exist.</summary>
    public string       TableName        { get; set; } = "NrtDiffResults";
}

public sealed class CompareSettings
{
    /// <summary>Property names used as the composite key for matching rows.</summary>
    public string[] KeyProperties     { get; set; } = [];

    /// <summary>Properties to compare. Empty = compare all non-key properties.</summary>
    public string[] CompareProperties { get; set; } = [];

    /// <summary>Relative tolerance for decimal comparisons (0 = exact).</summary>
    public double   Tolerance         { get; set; } = 0.0;
}
