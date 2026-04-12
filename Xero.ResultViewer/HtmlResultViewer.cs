using System.Diagnostics;
using System.Reflection;
using System.Text;
using Xero.SmartComparer;

namespace Xero.ResultViewer;

/// <summary>
/// Generates an interactive HTML report from a <see cref="CompareResult{T}"/>
/// and opens it in the system browser.
/// Each section (InBothButDifferent, OnlyInReference, OnlyInTarget) is
/// collapsible and shows up to <see cref="MaxRowsPerTable"/> rows.
/// </summary>
public sealed class HtmlResultViewer<T> : IResultViewer<T> where T : class, new()
{
    private const int MaxRowsPerTable = 100;

    private readonly string? _outputPath;
    private readonly PropertyInfo[] _typeMembers;

    /// <param name="outputPath">
    /// Where to write the HTML file. When <c>null</c> a temp file is used.
    /// </param>
    public HtmlResultViewer(string? outputPath = null)
    {
        _outputPath  = outputPath;
        _typeMembers = typeof(T)
            .GetProperties(BindingFlags.Public | BindingFlags.Instance)
            .Where(p => p.CanRead && p.GetIndexParameters().Length == 0)
            .ToArray();
    }

    public void Render(CompareResult<T> result, string scenarioName)
    {
        string filePath = _outputPath
            ?? Path.Combine(Path.GetTempPath(), $"NRT_{scenarioName.Replace(' ', '_')}_{DateTime.Now:yyyyMMdd_HHmmss}.html");

        Directory.CreateDirectory(Path.GetDirectoryName(filePath) ?? ".");

        File.WriteAllText(filePath, BuildHtml(result, scenarioName));
        Console.WriteLine($"[HtmlResultViewer] Saved → {filePath}");
        TryOpen(filePath);
    }

    // ── HTML generation ───────────────────────────────────────────────────────

    private string BuildHtml(CompareResult<T> result, string scenarioName)
    {
        var sb = new StringBuilder();

        // $$""" means single { } are literal; C# interpolations use {{ expr }}
        sb.Append($$"""
            <!DOCTYPE html><html><head>
            <title>NRT Report — {{scenarioName}}</title>
            <style>
            body{font-family:Arial,sans-serif;font-size:13px;margin:20px}
            h1{color:#3c454f}
            .collapsible{background:#3c454f;color:#fff;cursor:pointer;padding:10px;
                          width:100%;border:none;text-align:left;font-size:14px;margin-top:8px}
            .collapsible:after{content:'\25B8';float:right}
            .active:after{content:'\25BE'}
            .content{display:none;overflow:hidden;background:#f9f9f9;padding:6px}
            table{border-collapse:collapse;width:100%}
            th{background:#3c454f;color:#fff;padding:4px 6px;font-size:12px;border:1px solid #ccc}
            td{padding:3px 6px;font-size:11px;border:1px solid #ccc;white-space:nowrap}
            .pass{color:green;font-weight:bold} .fail{color:red;font-weight:bold}
            .summary{background:#eef;padding:10px;border-radius:4px;margin-bottom:12px}
            </style></head><body>
            """);

        bool passed = result.Count == 0
            && (result.OnlyInReference?.Count ?? 0) == 0
            && (result.OnlyInTarget?.Count    ?? 0) == 0;

        sb.Append($$"""
            <h1>NRT Report — {{scenarioName}}</h1>
            <div class="summary">
              Generated: {{DateTime.Now:yyyy-MM-dd HH:mm:ss}} &nbsp;|&nbsp;
              In-Both-But-Different: <b>{{result.Count:N0}}</b> &nbsp;|&nbsp;
              Only-In-Reference: <b>{{result.OnlyInReference?.Count ?? 0:N0}}</b> &nbsp;|&nbsp;
              Only-In-Target: <b>{{result.OnlyInTarget?.Count ?? 0:N0}}</b> &nbsp;|&nbsp;
              Verdict: <span class="{{(passed ? "pass" : "fail")}}">{{(passed ? "PASS" : "FAIL")}}</span>
            </div>
            """);

        AddDiffSection(sb, "InBothButDifferent", result);
        AddListSection(sb, "OnlyInReference", result.OnlyInReference);
        AddListSection(sb, "OnlyInTarget",    result.OnlyInTarget);

        sb.Append("""
            <script>
            document.querySelectorAll('.collapsible').forEach(btn=>{
              btn.addEventListener('click',function(){
                this.classList.toggle('active');
                var c=this.nextElementSibling;
                c.style.display=c.style.display==='block'?'none':'block';
              });
            });
            </script>
            </body></html>
            """);

        return sb.ToString();
    }

    private void AddDiffSection(StringBuilder sb, string title,
        List<PooledDictionary<string, object>> rows)
    {
        sb.AppendLine($"<button class='collapsible'>{title} ({rows.Count:N0} rows)</button>");
        sb.AppendLine("<div class='content'>");

        if (rows.Count == 0) { sb.AppendLine("<p>No differences.</p></div>"); return; }

        var sample = rows[0];
        var keyProps  = sample.Keys.Where(k => k.StartsWith("Key_",       StringComparison.Ordinal)).Select(k => k[4..]).ToList();
        var diffProps = sample.Keys.Where(k => k.StartsWith("Reference_", StringComparison.Ordinal)).Select(k => k[10..]).ToList();

        sb.AppendLine("<table><thead><tr>");
        foreach (var k in keyProps)  sb.Append($"<th>{k}</th>");
        foreach (var d in diffProps) sb.Append($"<th>{d} (Ref)</th><th>{d} (Tgt)</th>");
        sb.AppendLine("</tr></thead><tbody>");

        foreach (var row in rows.Take(MaxRowsPerTable))
        {
            sb.Append("<tr>");
            foreach (var k in keyProps)  sb.Append($"<td>{row[$"Key_{k}"]}</td>");
            foreach (var d in diffProps) sb.Append($"<td>{row[$"Reference_{d}"]}</td><td>{row[$"Target_{d}"]}</td>");
            sb.AppendLine("</tr>");
        }

        if (rows.Count > MaxRowsPerTable)
            sb.AppendLine($"<tr><td colspan='100'><i>… {rows.Count - MaxRowsPerTable:N0} more rows not shown</i></td></tr>");

        sb.AppendLine("</tbody></table></div>");
    }

    private void AddListSection(StringBuilder sb, string title, List<T>? rows)
    {
        int count = rows?.Count ?? 0;
        sb.AppendLine($"<button class='collapsible'>{title} ({count:N0} rows)</button>");
        sb.AppendLine("<div class='content'>");

        if (count == 0) { sb.AppendLine("<p>None.</p></div>"); return; }

        sb.AppendLine("<table><thead><tr>");
        foreach (var m in _typeMembers) sb.Append($"<th>{m.Name}</th>");
        sb.AppendLine("</tr></thead><tbody>");

        foreach (var item in rows!.Take(MaxRowsPerTable))
        {
            sb.Append("<tr>");
            foreach (var m in _typeMembers) sb.Append($"<td>{m.GetValue(item)}</td>");
            sb.AppendLine("</tr>");
        }

        if (count > MaxRowsPerTable)
            sb.AppendLine($"<tr><td colspan='100'><i>… {count - MaxRowsPerTable:N0} more rows not shown</i></td></tr>");

        sb.AppendLine("</tbody></table></div>");
    }

    private static void TryOpen(string path)
    {
        try { Process.Start(new ProcessStartInfo(path) { UseShellExecute = true }); }
        catch { /* headless CI — no browser available */ }
    }
}
