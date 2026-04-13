namespace Xero.WebApi.Models;

/// <summary>Summary of a single NRT execution (from <c>nrt_runs</c> table).</summary>
public sealed class NrtRunDto
{
    public int            RunId            { get; init; }
    public DateTimeOffset RunTimestamp     { get; init; }
    public string         ScenarioName     { get; init; } = string.Empty;
    public string         ReferenceVersion { get; init; } = string.Empty;
    public string         TargetVersion    { get; init; } = string.Empty;
    public string         ValuationDate    { get; init; } = string.Empty;
    public int?           RefRowCount      { get; init; }
    public int?           TgtRowCount      { get; init; }
    public int?           DiffRowCount     { get; init; }
    public int?           OnlyInRefCount   { get; init; }
    public int?           OnlyInTgtCount   { get; init; }
    public bool?          Passed           { get; init; }
}
