namespace Xero.WebApi.Models;

/// <summary>Returned by POST /api/run-executions after a run completes.</summary>
public sealed class RunExecutionResponse
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
    public string         Status           { get; init; } = "completed";
}

/// <summary>Returned by GET /api/run-executions and GET /api/run-executions/{runId}.</summary>
public sealed class RunExecutionSummary
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

    /// <summary>Raw JSON string of the ColumnDef[] schema stored at run creation time.</summary>
    public string?        ColumnSchemaJson { get; init; }

    // ── Status tracking ───────────────────────────────────────────────────────
    /// <summary>pending | running_commands | running_comparison | saving_results | completed | failed</summary>
    public string         Status              { get; init; } = "completed";
    public string?        ErrorMessage        { get; init; }

    // Per-command status
    public string?        RefCmdStatus        { get; init; }   // null=skipped | running | completed | failed
    public string?        TgtCmdStatus        { get; init; }
    public DateTimeOffset? RefCmdStartedAt    { get; init; }
    public DateTimeOffset? RefCmdFinishedAt   { get; init; }
    public int?           RefCmdExitCode      { get; init; }
    public string?        RefCmdError         { get; init; }
    public DateTimeOffset? TgtCmdStartedAt    { get; init; }
    public DateTimeOffset? TgtCmdFinishedAt   { get; init; }
    public int?           TgtCmdExitCode      { get; init; }
    public string?        TgtCmdError         { get; init; }

    // Pipeline phase timestamps
    public DateTimeOffset? ComparisonStartedAt { get; init; }
    public DateTimeOffset? SavingStartedAt      { get; init; }
    public DateTimeOffset? FinishedAt           { get; init; }

    public Guid?          DefinitionId         { get; init; }
}

