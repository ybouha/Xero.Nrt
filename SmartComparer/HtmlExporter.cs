using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.Json;
using Collections.Pooled;

namespace SmartComparer;

public class HtmlExporter<T>
{
    private readonly PropertyInfo[] _typeMembers;

    public HtmlExporter()
    {
        _typeMembers = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance)
            .Where(p => p.CanRead && p.GetIndexParameters().Length == 0)
            .ToArray();
    }

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

        // Append HTML content
        sb.Append(@"<!DOCTYPE html><html>
            <head><title>Data Differences</title>");

        // Append CSS content
        sb.Append(@"<style>.collapsible {
    background-color: #777;
    color: white;
    cursor: pointer;
    padding: 10px;
    width: 100%;
    border: none;
    text-align: left;
    outline: none;
    font-size: 15px;
}
.collapsible:after {
    content: '\25B8'; /* Unicode for small triangle pointing right */
    color: white;
    float: right;
    font-weight: bold;
}
.active:after {
    content: '\25BE'; /* Unicode for small triangle pointing down */
}
.content {
    display: none;
    overflow: hidden;
    background-color: #f1f1f1;
}
.tnrReport {
    border-collapse: collapse;
    width: 100%;
}
.tnrReport tr th {
    background-color: #3c454f;
    color: #ffffff;
    padding: 3px 3px 3px 3px;
    border: 1px solid #cccccc;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
    font-weight: normal;
    text-transform: capitalize;
}
.tnrReport tr td {
    padding: 2px 2px 2px 2px;
    color: black;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 11px;
    border: 1px solid #cccccc;
    vertical-align: middle;
    white-space: nowrap;
}
.tnrReport tr td:first-child {
    text-align: left;
    font-weight: bold;
}
</style>");


        sb.Append("</head><body>");

        AddCollapsiblePanels(sb, "InBothButDifferent", dataSource);
        AddCollapsibleListPanels(sb, "OnlyInReference", dataSource.OnlyInReference);
        AddCollapsibleListPanels(sb, "OnlyInTarget", dataSource.OnlyInTarget);

        sb.Append(@"<script>
            var coll = document.getElementsByClassName('collapsible');
            var i;
            for (i = 0; i < coll.length; i++) {
                coll[i].addEventListener('click', function() {
                    this.classList.toggle('active');
                    var content = this.nextElementSibling;
                    if (content.style.display === 'block') {
                        content.style.display = 'none';
                    } else {
                        content.style.display = 'block';
                    }
                });
            }
        </script>");

        sb.AppendLine("</body></html>");
        return sb.ToString();
    }

    private void AddCollapsiblePanels(StringBuilder sb, string panelName, List<PooledDictionary<string, object>> dataList)
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
        sb.AppendLine($"<th colspan='{_typeMembers.Length + 1}'>{comparedItemsProp}</th>");

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

        sb.AppendLine("<th>Type</th>");
        foreach (var property in _typeMembers)
        {
            sb.AppendLine($"<th>{property.Name}</th>");
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
                sb.AppendLine($"<td rowspan=\"2\">{row[$"Key_{keyProp}"]}</td>");
            }

            // Different properties
            foreach (var diffProp in diffProperties)
            {
                sb.AppendLine($"<td rowspan=\"2\">{row[$"Reference_{diffProp}"]}</td>");
                sb.AppendLine($"<td rowspan=\"2\">{row[$"Target_{diffProp}"]}</td>");
            }


            // Parse and render ComparedItems
            var comparedItems = JsonSerializer.Deserialize<CoupleItem<T>>(row[comparedItemsProp].ToString());
            if (comparedItems != null)
            {
                // Reference Item
                sb.AppendLine($"<td>Reference</td>");
                foreach (var property in _typeMembers)
                {
                    var value = property.GetValue(comparedItems.ReferenceItem);
                    sb.AppendLine($"<td>{value}</td>");
                }
                sb.AppendLine("</tr>");
                // Target Item
                sb.AppendLine("<tr>");
                sb.AppendLine($"<td>Target</td>");
                foreach (var property in _typeMembers)
                {
                    var value = property.GetValue(comparedItems.TargetItem);
                    sb.AppendLine($"<td>{value}</td>");
                }
            }
            else
            {
                sb.AppendLine("<tr></tr>");
            }


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
        
        // Use the cached _typeMembers for headers and access
        
        sb.AppendLine($"<button class='collapsible'>{panelName}</button>");
        sb.AppendLine("<div class='content'>");

        // Add headers
        sb.AppendLine("<table class='tnrReport'>");
        sb.AppendLine("<tr>");
        foreach (var member in _typeMembers)
        {
            sb.AppendLine($"<th>{member.Name}</th>");
        }
        sb.AppendLine("</tr>");

        // Add data (only first 100 rows)
        int rowsAdded = 0;
        foreach (var item in dataList.Take(MaxRowsPerTable))
        {
            sb.AppendLine("<tr>");
            foreach (var member in _typeMembers)
            {
                sb.AppendLine($"<td>{member.GetValue(item)}</td>");
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
