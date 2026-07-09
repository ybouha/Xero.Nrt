namespace Xero.WebApi.Services;

/// <summary>
/// Runs a PowerShell <em>parameter script</em> and parses the object it emits into a
/// set of query parameters.
///
/// Script contract:
///   • Use <c>Write-Host</c> / <c>Write-Verbose</c> for logs (ignored by the parser).
///   • Emit exactly one object to the output stream whose properties are the query
///     parameters, e.g.:
///       <code>$ids = Resolve-JobIds -Date $env:VALUATION_DATE
///       @{ JobIds = $ids }</code>
///   • The system injects context as environment variables (e.g. <c>VALUATION_DATE</c>,
///     <c>SCENARIO_NAME</c>, <c>RUN_SIDE</c>).
///
/// Each emitted property becomes a Dapper parameter bound to that side's query
/// (e.g. <c>... WHERE job_id IN @JobIds</c>). Never throws — failures are captured
/// in the result with a non-zero exit code.
/// </summary>
public interface IScriptParameterRunner
{
    Task<ScriptParameterResult> RunAsync(
        string script,
        IReadOnlyDictionary<string, string>? environment = null,
        CancellationToken ct = default);
}

/// <summary>Outcome of a parameter-script execution.</summary>
public sealed record ScriptParameterResult(
    int ExitCode,
    string Stdout,
    string Stderr,
    IReadOnlyDictionary<string, object?> Parameters)
{
    public bool Succeeded => ExitCode == 0;
}
