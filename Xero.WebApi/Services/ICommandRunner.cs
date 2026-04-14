namespace Xero.WebApi.Services;

/// <summary>
/// Executes a shell command and returns the result without throwing on non-zero exit.
/// The caller is responsible for inspecting <see cref="CommandResult.Succeeded"/> and
/// persisting the outcome before deciding whether to abort.
/// </summary>
public interface ICommandRunner
{
    /// <summary>
    /// Runs <paramref name="commandLine"/> in a shell and returns the exit code,
    /// stdout, and stderr.  Never throws — errors are captured in the result.
    /// </summary>
    Task<CommandResult> RunAsync(string commandLine, CancellationToken ct = default);
}

/// <summary>Outcome of a single shell command execution.</summary>
public record CommandResult(int ExitCode, string Stdout, string Stderr)
{
    public bool Succeeded => ExitCode == 0;
}
