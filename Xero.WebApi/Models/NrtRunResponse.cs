namespace Xero.WebApi.Models;

/// <summary>Returned by POST /api/nrt/runs after a run completes.</summary>
public sealed class NrtRunResponse
{
    public int            RunId            { get; init; }
    public string         ScenarioName     { get; init; } = string.Empty;
    public string         ReferenceVersion { get; init; } = string.Empty;
    public string         TargetVersion    { get; init; } = string.Empty;
    public string         ValuationDate    { get; init; } = string.Empty;
    public DateTimeOffset RunTimestamp     { get; init; }
    public int            RefRowCount      { get; init; }
    public int            TgtRowCount      { get; init; }
    public int            DiffRowCount     { get; init; }
    public int            OnlyInRefCount   { get; init; }
    public int            OnlyInTgtCount   { get; init; }
    public bool           Passed           { get; init; }
    public double         DurationSeconds  { get; init; }
}

/// <summary>Returned by GET /api/nrt/runs and GET /api/nrt/runs/{runId}.</summary>
public sealed class NrtRunSummary
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
