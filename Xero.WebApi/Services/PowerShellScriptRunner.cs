using System.Diagnostics;
using System.Text;
using System.Text.Json;

namespace Xero.WebApi.Services;

/// <summary>
/// Runs a user-supplied PowerShell parameter script and parses the object it emits
/// into query parameters.
///
/// The user script is wrapped so that:
///   • Its last output-stream object is serialised with <c>ConvertTo-Json</c>.
///   • The JSON is prefixed with a sentinel marker so it can be isolated from any
///     log noise the script writes to the host/verbose streams.
///
/// The wrapper is delivered via <c>-EncodedCommand</c> (Base64 UTF-16LE) to avoid all
/// quoting/escaping pitfalls of multi-line scripts on the command line.
/// </summary>
public sealed class PowerShellScriptRunner : IScriptParameterRunner
{
    private const string Marker = "@@XERO_PARAMS@@";

    // Non-interpolated template. PowerShell's literal {} braces are left untouched;
    // the two placeholders are substituted via String.Replace below.
    private const string WrapperTemplate = """
$ErrorActionPreference = 'Stop'
try {
    $__out = & {
__USERSCRIPT__
    } | Select-Object -Last 1
    $__json = if ($null -eq $__out) { '{}' } else { $__out | ConvertTo-Json -Compress -Depth 10 }
    Write-Output ('__MARKER__' + $__json)
} catch {
    Write-Error $_.Exception.Message
    exit 1
}
""";

    private readonly ILogger<PowerShellScriptRunner> _logger;

    public PowerShellScriptRunner(ILogger<PowerShellScriptRunner> logger) => _logger = logger;

    public async Task<ScriptParameterResult> RunAsync(
        string script,
        IReadOnlyDictionary<string, string>? environment = null,
        CancellationToken ct = default)
    {
        var wrapper = WrapperTemplate
            .Replace("__USERSCRIPT__", script)
            .Replace("__MARKER__", Marker);

        var encoded = Convert.ToBase64String(Encoding.Unicode.GetBytes(wrapper));

        var psi = new ProcessStartInfo("powershell.exe")
        {
            Arguments = "-NoProfile -NonInteractive -ExecutionPolicy Bypass " +
                        $"-EncodedCommand {encoded}",
            RedirectStandardOutput = true,
            RedirectStandardError  = true,
            UseShellExecute        = false,
            CreateNoWindow         = true,
        };

        if (environment is not null)
            foreach (var kv in environment)
                psi.Environment[kv.Key] = kv.Value;

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

            if (exitCode != 0)
            {
                _logger.LogWarning(
                    "Parameter script exited with code {ExitCode}.\nStderr: {Stderr}",
                    exitCode, stderr);
                return new ScriptParameterResult(exitCode, stdout, stderr, EmptyParams);
            }

            var parameters = ParseParameters(stdout);
            return new ScriptParameterResult(0, stdout, stderr, parameters);
        }
        catch (OperationCanceledException)
        {
            _logger.LogWarning("Parameter script cancelled.");
            return new ScriptParameterResult(-1, string.Empty, "Script was cancelled.", EmptyParams);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to run parameter script.");
            return new ScriptParameterResult(-1, string.Empty, ex.Message, EmptyParams);
        }
    }

    private static readonly IReadOnlyDictionary<string, object?> EmptyParams =
        new Dictionary<string, object?>();

    /// <summary>
    /// Locates the last marker-prefixed line in stdout and parses the trailing JSON
    /// object into a case-insensitive parameter dictionary. Throws on a missing
    /// marker or a non-object payload (surfaced as a script failure by the caller).
    /// </summary>
    private static IReadOnlyDictionary<string, object?> ParseParameters(string stdout)
    {
        var line = stdout
            .Split('\n')
            .Select(l => l.TrimEnd('\r'))
            .LastOrDefault(l => l.StartsWith(Marker, StringComparison.Ordinal))
            ?? throw new InvalidOperationException(
                $"Parameter script produced no '{Marker}'-marked output object.");

        var json = line[Marker.Length..];

        using var doc = JsonDocument.Parse(json);
        if (doc.RootElement.ValueKind != JsonValueKind.Object)
            throw new InvalidOperationException(
                "Parameter script must emit an object (e.g. @{ JobIds = $ids }).");

        var result = new Dictionary<string, object?>(StringComparer.OrdinalIgnoreCase);
        foreach (var prop in doc.RootElement.EnumerateObject())
            result[prop.Name] = ConvertElement(prop.Value);

        return result;
    }

    private static object? ConvertElement(JsonElement el) => el.ValueKind switch
    {
        JsonValueKind.String => el.GetString(),
        JsonValueKind.Number => el.TryGetInt64(out var l) ? l : el.GetDouble(),
        JsonValueKind.True   => true,
        JsonValueKind.False  => false,
        JsonValueKind.Null   => null,
        JsonValueKind.Array  => el.EnumerateArray().Select(ConvertElement).ToList(),
        JsonValueKind.Object => el.EnumerateObject()
                                  .ToDictionary(p => p.Name, p => ConvertElement(p.Value)),
        _                    => el.GetRawText(),
    };
}
