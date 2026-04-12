using System.Diagnostics;
using System.Linq.Expressions;
using System.Reflection;
using OfficeOpenXml;
using Xero.SmartComparer;

namespace Xero.ResultSaver;

/// <summary>
/// Exports a <see cref="CompareResult{T}"/> to a multi-sheet .xlsx workbook.
/// Three sheets are produced: InBothButDifferent, OnlyInReference, OnlyInTarget.
/// Each sheet is chunked at 1 000 000 rows to respect Excel's row limit.
/// </summary>
public sealed class ExcelResultSaver<T> : IResultSaver<T> where T : class, new()
{
    private const int MaxRowsPerSheet = 1_000_000;

    public Task SaveAsync(CompareResult<T> result, SaveOptions options, CancellationToken ct = default)
    {
        ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

        using var package = new ExcelPackage();
        AddDiffSheet(package, "InBothButDifferent", result);
        AddListSheets(package, "OnlyInReference", result.OnlyInReference);
        AddListSheets(package, "OnlyInTarget", result.OnlyInTarget);
        var path = options.OutputPath + ".xlsx";
        package.SaveAs(new FileInfo(path));

        Console.WriteLine($"[ExcelResultSaver] Saved → {path}");
        TryOpen(path);
        return Task.CompletedTask;
    }

    // ── InBothButDifferent sheet ──────────────────────────────────────────────

    private static void AddDiffSheet(ExcelPackage pkg, string name,
        List<PooledDictionary<string, object>> rows)
    {
        if (rows.Count == 0) return;

        int sheetIndex = 1;
        int offset = 0;

        while (offset < rows.Count)
        {
            var sheet = pkg.Workbook.Worksheets.Add($"{name}_{sheetIndex}");
            var headers = rows[offset].Keys.ToList();

            for (int c = 0; c < headers.Count; c++)
                sheet.Cells[1, c + 1].Value = headers[c];

            int written = 0;
            while (offset < rows.Count && written < MaxRowsPerSheet)
            {
                var row = rows[offset];
                for (int c = 0; c < headers.Count; c++)
                    sheet.Cells[written + 2, c + 1].Value = row[headers[c]];
                offset++;
                written++;
            }
            sheetIndex++;
        }
    }

    // ── OnlyInReference / OnlyInTarget sheets ─────────────────────────────────

    private static void AddListSheets(ExcelPackage pkg, string name, List<T>? rows)
    {
        if (rows == null || rows.Count == 0) return;

        var props = typeof(T)
            .GetProperties(BindingFlags.Public | BindingFlags.Instance)
            .Where(p => p.CanRead && p.GetIndexParameters().Length == 0)
            .ToArray();

        // Compile property getters once — avoids per-cell reflection overhead
        var getters = props.Select(p =>
        {
            var param = Expression.Parameter(typeof(T), "x");
            var body  = Expression.Convert(Expression.Property(param, p), typeof(object));
            return Expression.Lambda<Func<T, object>>(body, param).Compile();
        }).ToArray();

        int sheetIndex = 1;
        int offset = 0;

        while (offset < rows.Count)
        {
            var sheet = pkg.Workbook.Worksheets.Add($"{name}_{sheetIndex}");

            for (int c = 0; c < props.Length; c++)
                sheet.Cells[1, c + 1].Value = props[c].Name;

            int written = 0;
            while (offset < rows.Count && written < MaxRowsPerSheet)
            {
                var item = rows[offset];
                for (int c = 0; c < getters.Length; c++)
                    sheet.Cells[written + 2, c + 1].Value = getters[c](item);
                offset++;
                written++;
            }
            sheetIndex++;
        }
    }

    private static void TryOpen(string path)
    {
        try { Process.Start(new ProcessStartInfo(path) { UseShellExecute = true }); }
        catch { /* non-critical — headless CI environments will not have a shell */ }
    }
}
