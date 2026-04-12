using System.Text.Json;
using System.Text.Json.Serialization;
using Xero.SmartComparer;

namespace Xero.ResultSaver;

/// <summary>
/// Serialises a <see cref="CompareResult{T}"/> to a single JSON file.
/// Useful for CI artefact archiving and downstream automation.
/// </summary>
public sealed class JsonResultSaver<T> : IResultSaver<T> where T : class, new()
{
    private static readonly JsonSerializerOptions _opts = new()
    {
        WriteIndented = true,
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
        Converters = { new JsonStringEnumConverter() }
    };

    public async Task SaveAsync(CompareResult<T> result, SaveOptions options, CancellationToken ct = default)
    {
        bool passed = result.Count == 0
            && (result.OnlyInReference?.Count ?? 0) == 0
            && (result.OnlyInTarget?.Count ?? 0) == 0;

        var envelope = new
        {
            options.ScenarioName,
            options.ReferenceVersion,
            options.TargetVersion,
            RunTimestamp = options.RunTimestamp,
            Summary = new
            {
                InBothButDifferentCount = result.Count,
                OnlyInReferenceCount    = result.OnlyInReference?.Count ?? 0,
                OnlyInTargetCount       = result.OnlyInTarget?.Count ?? 0,
                Passed                  = passed
            },
            // Serialize diff rows as plain dictionaries for readability
            Differences    = result.Select(r => r.Keys.ToDictionary(k => k, k => r[k])).ToList(),
            OnlyInReference = result.OnlyInReference,
            OnlyInTarget    = result.OnlyInTarget
        };

        var path = options.OutputPath + ".json";
        Directory.CreateDirectory(Path.GetDirectoryName(path) ?? ".");
        await using var fs = File.Create(path);
        await JsonSerializer.SerializeAsync(fs, envelope, _opts, ct);

        Console.WriteLine($"[JsonResultSaver] Saved → {path}");
    }
}
