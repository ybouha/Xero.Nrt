namespace Xero.WebApi.Models;

/// <summary>
/// A persisted cron schedule binding a <see cref="NrtRunDefinitionSummary"/> to a
/// Quartz cron expression. Returned by GET /api/run-schedules.
/// </summary>
public class NrtRunScheduleDto
{
    public Guid     ScheduleId     { get; set; }
    public Guid     DefinitionId   { get; set; }
    public string   Name           { get; set; } = string.Empty;
    public string   CronExpression { get; set; } = string.Empty;
    public string?  TimeZone       { get; set; }

    /// <summary>Fixed ISO date (yyyy-MM-dd) used for every fire; null = the run day.</summary>
    public string?  ValuationDate  { get; set; }

    public bool     IsEnabled      { get; set; }
    public DateTimeOffset? LastRunAt { get; set; }
    public int?     LastRunId      { get; set; }
    public string?  LastStatus     { get; set; }
    public string?  LastError      { get; set; }
    public DateTime CreatedAt      { get; set; }
    public DateTime UpdatedAt      { get; set; }

    // Joined from the definition for display convenience.
    public string?  DefinitionName { get; set; }

    /// <summary>Next fire time computed from the cron expression; populated by the API layer.</summary>
    public DateTimeOffset? NextFireTime { get; set; }
}

/// <summary>Request body for POST /api/run-schedules and PUT /api/run-schedules/{id}.</summary>
public sealed class SaveNrtRunScheduleRequest
{
    public Guid    DefinitionId   { get; set; }
    public string  Name           { get; set; } = string.Empty;
    public string  CronExpression { get; set; } = string.Empty;
    public string? TimeZone       { get; set; }

    /// <summary>Optional fixed ISO date (yyyy-MM-dd); null = the run day.</summary>
    public string? ValuationDate  { get; set; }

    public bool    IsEnabled      { get; set; } = true;
}
