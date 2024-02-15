using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

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
        sb.AppendLine(".content {");
        sb.AppendLine("  padding: 0 18px;");
        sb.AppendLine("  display: none;");
        sb.AppendLine("  overflow: hidden;");
        sb.AppendLine("  background-color: #f1f1f1;");
        sb.AppendLine("}");
        sb.AppendLine("</style>");
        sb.AppendLine("</head>");
        sb.AppendLine("<body>");

        AddCollapsiblePanels(sb, "InBothButDifferent", dataSource.InBothButDifferent);
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

        // Add headers
        sb.AppendLine("<table border='1'>");
        sb.AppendLine("<tr>");
        foreach (var header in dataList.First().Keys)
        {
            sb.AppendLine($"<th>{header}</th>");
        }
        sb.AppendLine("</tr>");

        // Add data (only first 100 rows)
        int rowsAdded = 0;
        foreach (var row in dataList.Take(MaxRowsPerTable))
        {
            sb.AppendLine("<tr>");
            foreach (var value in row.Values)
            {
                sb.AppendLine($"<td>{value}</td>");
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

        var accessor = TypeAccessor.Create(typeof(T));

        sb.AppendLine($"<button class='collapsible'>{panelName}</button>");
        sb.AppendLine("<div class='content'>");

        // Add headers
        sb.AppendLine("<table border='1'>");
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
        // Code to open the HTML file in the default browser
    }
}
