using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Text;

namespace Xero.WebApi.Services;

/// <summary>
/// Executes shell commands using the platform-native shell.
/// Uses <c>cmd.exe /c</c> on Windows and <c>/bin/bash -c</c> on Linux/macOS.
/// </summary>
public sealed class CommandRunner : ICommandRunner
{
    private readonly ILogger<CommandRunner> _logger;

    public CommandRunner(ILogger<CommandRunner> logger) => _logger = logger;

    public async Task<CommandResult> RunAsync(string commandLine, CancellationToken ct = default)
    {
        _logger.LogInformation("Executing command: {Command}", commandLine);

        bool isWindows = RuntimeInformation.IsOSPlatform(OSPlatform.Windows);
        string shell   = isWindows ? "cmd.exe"    : "/bin/bash";
        string flag    = isWindows ? "/c"         : "-c";

        var psi = new ProcessStartInfo(shell)
        {
            Arguments              = $"{flag} \"{commandLine.Replace("\"", "\\\"")}\"",
            RedirectStandardOutput = true,
            RedirectStandardError  = true,
            UseShellExecute        = false,
            CreateNoWindow         = true,
        };

        var stdoutBuilder = new StringBuilder();
        var stderrBuilder = new StringBuilder();

        try
        {
            using var process = new Process { StartInfo = psi, EnableRaisingEvents = true };

            process.OutputDataReceived += (_, e) =>
            {
                if (e.Data is not null) stdoutBuilder.AppendLine(e.Data);
            };
            process.ErrorDataReceived += (_, e) =>
            {
                if (e.Data is not null) stderrBuilder.AppendLine(e.Data);
            };

            process.Start();
            process.BeginOutputReadLine();
            process.BeginErrorReadLine();

            await process.WaitForExitAsync(ct);

            var exitCode = process.ExitCode;
            var stdout   = stdoutBuilder.ToString();
            var stderr   = stderrBuilder.ToString();

            if (exitCode == 0)
                _logger.LogInformation("Command succeeded (exit 0): {Command}", commandLine);
            else
                _logger.LogWarning(
                    "Command exited with code {ExitCode}: {Command}\nStderr: {Stderr}",
                    exitCode, commandLine, stderr);

            return new CommandResult(exitCode, stdout, stderr);
        }
        catch (OperationCanceledException)
        {
            _logger.LogWarning("Command cancelled: {Command}", commandLine);
            return new CommandResult(-1, string.Empty, "Command was cancelled.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to start command: {Command}", commandLine);
            return new CommandResult(-1, string.Empty, ex.Message);
        }
    }
}
