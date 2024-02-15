using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using FastMember;

namespace SmartComparer;

public class HtmlExporter<T>
{
    private const int MaxRowsPerTable = 100; // Maximum rows per HTML table

    public void ExportDifferences(CompareResult<T> dataSource, string filePath)
    {
        var htmlContent = GenerateHtml(dataSource);
        File.WriteAllText(filePath, htmlContent);
        
        Console.WriteLine($"HTML file exported to: {filePath}");

        // Open the HTML file in the default browser
        OpenHtmlFile(filePath);
    }

    private string GenerateHtml(CompareResult<T> dataSource)
    {
        var sb = new StringBuilder();
        
        sb.AppendLine("<!DOCTYPE html>");
        sb.AppendLine("<html>");
        sb.AppendLine("<head>");
        sb.AppendLine("<title>Data Differences</title>");
        sb.AppendLine("<style>");
        sb.AppendLine(".collapsible {");
        sb.AppendLine("  background-color: #777;");
        sb.AppendLine("  color: white;");
        sb.AppendLine("  cursor: pointer;");
        sb.AppendLine("  padding: 18px;");
        sb.AppendLine("  width: 100%;");
        sb.AppendLine("  border: none;");
        sb.AppendLine("  text-align: left;");
        sb.AppendLine("  outline: none;");
        sb.AppendLine("  font-size: 15px;");
        sb.AppendLine("}");
        sb.AppendLine(".collapsible:after {");
        sb.AppendLine("  content: '\u25B8';");
        sb.AppendLine("  color: white;");
        sb.AppendLine("  float: right;");
        sb.AppendLine("  font-weight: bold;");
        sb.AppendLine("}");
        sb.AppendLine(".active:after {");
        sb.AppendLine("  content: '\u25BE';");
        sb.AppendLine("}");
        sb.AppendLine(".content {");
        sb.AppendLine("  padding: 0 18px;");
        sb.AppendLine("  display: none;");
        sb.AppendLine("  overflow: hidden;");
        sb.AppendLine("  background-color: #f1f1f1;");
        sb.AppendLine("}");
        sb.AppendLine(".tnrReport {");
        sb.AppendLine("  border-collapse: collapse;");
        sb.AppendLine("  width: 100%;");
        sb.AppendLine("}");
        sb.AppendLine(".tnrReport tr th {");
        sb.AppendLine("  background-color: #3c454f;");
        sb.AppendLine("  color: #ffffff;");
        sb.AppendLine("  padding: 10px 5px 10px 5px;");
        sb.AppendLine("  border: 1px solid #cccccc;");
        sb.AppendLine("  font-family: Arial, Helvetica, sans-serif;");
        sb.AppendLine("  font-size: 12px;");
        sb.AppendLine("  font-weight: normal;");
        sb.AppendLine("  text-transform: capitalize;");
        sb.AppendLine("}");
        sb.AppendLine(".tnrReport tr td {");
        sb.AppendLine("  padding: 5px 10px 5px 10px;");
        sb.AppendLine("  color: black;");
        sb.AppendLine("  font-family: Arial, Helvetica, sans-serif;");
        sb.AppendLine("  font-size: 11px;");
        sb.AppendLine("  border: 1px solid #cccccc;");
        sb.AppendLine("  vertical-align: middle;");
        sb.AppendLine("  white-space: nowrap;");
        sb.AppendLine("}");
        sb.AppendLine(".tnrReport tr td:first-child {");
        sb.AppendLine("  text-align: left;");
        sb.AppendLine("  font-weight: bold;");
        sb.AppendLine("}");
        sb.AppendLine("</style>");
        sb.AppendLine("</head>");
        sb.AppendLine("<body>");

        AddCollapsiblePanels(sb, "InBothButDifferent", dataSource);
        AddCollapsibleListPanels(sb, "OnlyInReference", dataSource.OnlyInReference);
        AddCollapsibleListPanels(sb, "OnlyInTarget", dataSource.OnlyInTarget);

        sb.AppendLine("<script>");
        sb.AppendLine("var coll = document.getElementsByClassName('collapsible');");
        sb.AppendLine("var i;");
        sb.AppendLine("for (i = 0; i < coll.length; i++) {");
        sb.AppendLine("  coll[i].addEventListener('click', function() {");
        sb.AppendLine("    this.classList.toggle('active');");
        sb.AppendLine("    var content = this.nextElementSibling;");
        sb.AppendLine("    if (content.style.display === 'block') {");
        sb.AppendLine("      content.style.display = 'none';");
        sb.AppendLine("    } else {");
        sb.AppendLine("      content.style.display = 'block';");
        sb.AppendLine("    }");
        sb.AppendLine("  });");
        sb.AppendLine("}");
        sb.AppendLine("</script>");

        sb.AppendLine("</body>");
        sb.AppendLine("</html>");

        return sb.ToString();
    }

    private void AddCollapsiblePanels(StringBuilder sb, string panelName, List<Dictionary<string, object>> dataList)
    {
        if (dataList == null || dataList.Count == 0)
            return;

        sb.AppendLine($"<button class='collapsible'>{panelName}</button>");
        sb.AppendLine("<div class='content'>");

        var keyProperties = dataList.First().Keys
                            .Where(x => x.StartsWith("Key_"))
                            .Select(c => c.Replace("Key_", ""))
                            .Distinct()
                            .ToList();
        var diffProperties = dataList.First().Keys
                            .Where(x => x.StartsWith("Reference_"))
                            .Select(c => c.Replace("Reference_", ""))
                            .Distinct()
                            .ToList();
        var comparedItemsProp = "ComparedItems";

        // Add headers
        sb.AppendLine("<table class='tnrReport'>");
        sb.AppendLine("<tr>");

        // Key properties
        if (keyProperties.Any())
            sb.AppendLine($"<th colspan='{keyProperties.Count}'>Key</th>");

        // Different properties
        foreach (var property in diffProperties)
            sb.AppendLine($"<th colspan='2'>{property}</th>");

        // ComparedItems property
        sb.AppendLine($"<th rowspan='2'>{comparedItemsProp}</th>");

        sb.AppendLine("</tr>");

        // Second header row
        sb.AppendLine("<tr>");

        foreach (var property in keyProperties)
        {
            sb.AppendLine($"<th>{property}</th>");
        }

        foreach (var property in diffProperties)
        {
            sb.AppendLine("<th>Reference</th><th>Target</th>");
        }
        sb.AppendLine("</tr>");

        // Add data (only first 100 rows)
        int rowsAdded = 0;
        foreach (var row in dataList.Take(MaxRowsPerTable))
        {
            sb.AppendLine("<tr>");

            // Key properties
            foreach (var keyProp in keyProperties)
            {
                sb.AppendLine($"<td>{row[$"Key_{keyProp}"]}</td>");
            }

            // Different properties
            foreach (var diffProp in diffProperties)
            {
                sb.AppendLine($"<td>{row[$"Reference_{diffProp}"]}</td>");
                sb.AppendLine($"<td>{row[$"Target_{diffProp}"]}</td>");
            }

            sb.AppendLine("</td>");

            sb.AppendLine("</tr>");
            rowsAdded++;
        }

        sb.AppendLine("</table>");
        sb.AppendLine("</div>");
    }


    private void AddCollapsibleListPanels(StringBuilder sb, string panelName, List<T>? dataList)
    {
        if (dataList == null || dataList.Count == 0)
            return;

        var accessor = TypeAccessor.Create(typeof(T));

        sb.AppendLine($"<button class='collapsible'>{panelName}</button>");
        sb.AppendLine("<div class='content'>");

        // Add headers
        sb.AppendLine("<table class='tnrReport'>");
        sb.AppendLine("<tr>");
        foreach (var member in accessor.GetMembers())
        {
            sb.AppendLine($"<th>{member.Name}</th>");
        }
        sb.AppendLine("</tr>");

        // Add data (only first 100 rows)
        int rowsAdded = 0;
        foreach (var item in dataList.Take(MaxRowsPerTable))
        {
            sb.AppendLine("<tr>");
            foreach (var member in accessor.GetMembers())
            {
                sb.AppendLine($"<td>{accessor[item, member.Name]}</td>");
            }
            sb.AppendLine("</tr>");
            rowsAdded++;
        }

        sb.AppendLine("</table>");
        sb.AppendLine("</div>");
    }

    private void OpenHtmlFile(string filePath)
    {
        try
        {
            // Start the default application associated with Excel
            Process.Start(new ProcessStartInfo(filePath) { UseShellExecute = true });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error opening Excel file: {ex.Message}");
        }
    }
}
