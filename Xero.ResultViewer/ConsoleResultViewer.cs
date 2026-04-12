using Xero.SmartComparer;

namespace Xero.ResultViewer;

/// <summary>
/// Renders a colour-coded NRT summary to stdout.
/// Suitable for CI pipelines where an HTML/Excel output is not available.
/// </summary>
public sealed class ConsoleResultViewer<T> : IResultViewer<T> where T : class, new()
{
    /// <summary>Maximum number of diff rows printed to the console (keeps output readable).</summary>
    public int MaxDiffRows { get; init; } = 20;

    public void Render(CompareResult<T> result, string scenarioName)
    {
        bool passed = result.Count == 0
            && (result.OnlyInReference?.Count ?? 0) == 0
            && (result.OnlyInTarget?.Count ?? 0) == 0;

        var verdict      = passed ? "PASS" : "FAIL";
        var verdictColor = passed ? ConsoleColor.Green : ConsoleColor.Red;

        Console.WriteLine();
        WriteHeader($"NRT Report — {scenarioName}");

        // ── Summary table ─────────────────────────────────────────────────────
        WriteRow("In-Both-But-Different", result.Count,                       result.Count > 0);
        WriteRow("Only in Reference",     result.OnlyInReference?.Count ?? 0, (result.OnlyInReference?.Count ?? 0) > 0);
        WriteRow("Only in Target",        result.OnlyInTarget?.Count    ?? 0, (result.OnlyInTarget?.Count    ?? 0) > 0);

        // ── Verdict ───────────────────────────────────────────────────────────
        Console.WriteLine();
        Console.Write("  Verdict: ");
        Console.ForegroundColor = verdictColor;
        Console.WriteLine($"  {verdict}  ");
        Console.ResetColor();

        // ── Sample diff rows ──────────────────────────────────────────────────
        if (result.Count > 0)
        {
            Console.WriteLine();
            Console.WriteLine($"  First {Math.Min(MaxDiffRows, result.Count)} differences:");
            Console.WriteLine(new string('─', 100));

            foreach (var row in result.Take(MaxDiffRows))
            {
                var parts = row.Keys
                    .Select(k => $"{k}={row[k]}")
                    .ToList();
                Console.WriteLine("  " + string.Join("  |  ", parts));
            }

            if (result.Count > MaxDiffRows)
                Console.WriteLine($"  … and {result.Count - MaxDiffRows:N0} more rows (see Excel/HTML report)");

            Console.WriteLine(new string('─', 100));
        }

        Console.WriteLine();
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private static void WriteHeader(string text)
    {
        Console.ForegroundColor = ConsoleColor.Cyan;
        Console.WriteLine(new string('═', 60));
        Console.WriteLine($"  {text}");
        Console.WriteLine(new string('═', 60));
        Console.ResetColor();
    }

    private static void WriteRow(string label, int count, bool isAlert)
    {
        Console.Write($"  {label,-28}: ");
        if (isAlert) Console.ForegroundColor = ConsoleColor.Yellow;
        Console.Write($"{count,10:N0}");
        Console.ResetColor();
        Console.WriteLine();
    }
}
