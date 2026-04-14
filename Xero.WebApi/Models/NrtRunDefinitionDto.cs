using Xero.SmartComparer;

namespace Xero.WebApi.Models;

/// <summary>Lightweight summary returned by GET /api/run-definitions.</summary>
public class NrtRunDefinitionSummary
{
    public Guid    DefinitionId      { get; set; }
    public string  Name              { get; set; } = string.Empty;
    public string? Description       { get; set; }
    public string? Scope             { get; set; }
    public string  ScenarioName      { get; set; } = string.Empty;
    public string  ReferenceVersion  { get; set; } = string.Empty;
    public string  TargetVersion     { get; set; } = string.Empty;
    public string? RefCommandLine    { get; set; }
    public string? TargetCommandLine { get; set; }
    public DateTime CreatedAt        { get; set; }
    public DateTime UpdatedAt        { get; set; }
    public bool    IsActive          { get; set; }
}

/// <summary>Full definition with all nested config — returned by GET /api/run-definitions/{id}.</summary>
public sealed class NrtRunDefinitionDto : NrtRunDefinitionSummary
{
    public DbSettingsDto      Reference    { get; set; } = new();
    public DbSettingsDto      Target       { get; set; } = new();
    public CompareSettingsDto Compare      { get; set; } = new();
    public OutputSettingsDto  Output       { get; set; } = new();
    public ColumnDef[]        ColumnSchema { get; set; } = [];
}

/// <summary>Request body for POST /api/run-definitions and PUT /api/run-definitions/{id}.</summary>
public sealed class SaveNrtRunDefinitionRequest
{
    public string             Name              { get; set; } = string.Empty;
    public string?            Description       { get; set; }
    public string?            Scope             { get; set; }
    public string             ScenarioName      { get; set; } = string.Empty;
    public string             ReferenceVersion  { get; set; } = string.Empty;
    public string             TargetVersion     { get; set; } = string.Empty;
    public string?            RefCommandLine    { get; set; }
    public string?            TargetCommandLine { get; set; }
    public DbSettingsDto      Reference         { get; set; } = new();
    public DbSettingsDto      Target            { get; set; } = new();
    public CompareSettingsDto Compare           { get; set; } = new();
    public OutputSettingsDto  Output            { get; set; } = new();
    public ColumnDef[]        ColumnSchema      { get; set; } = [];
}

/// <summary>Request body for POST /api/run-definitions/{id}/execute.</summary>
public sealed class ExecuteFromDefinitionRequest
{
    /// <summary>ISO date string (yyyy-MM-dd).</summary>
    public string ValuationDate { get; set; } = DateTime.Today.ToString("yyyy-MM-dd");
}
