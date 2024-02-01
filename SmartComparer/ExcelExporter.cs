using System.Diagnostics;
using FastMember;
using OfficeOpenXml;

namespace SmartComparer
{
    public class ExcelExporter<T>
    {
        public void ExportDifferences(CompareResult<T> dataSource, string filePath)
        {
            using (var package = new ExcelPackage())
            {
                AddWorksheet(package, "InBothButDifferent", dataSource);
                AddListWorksheet(package, "OnlyInReference", dataSource.OnlyInReference);
                AddListWorksheet(package, "OnlyInTarget", dataSource.OnlyInTarget);

                package.SaveAs(new FileInfo(filePath));
            }

            Console.WriteLine($"Excel file exported to: {filePath}");

            OpenExcelFile(filePath);
        }

        private void AddWorksheet(ExcelPackage package, string worksheetName, CompareResult<T> dataSource)
        {
            var worksheet = package.Workbook.Worksheets.Add(worksheetName);

            if (dataSource.Count > 0)
            {
                // Add headers
                var headers = dataSource.FirstRow.Keys.ToList();
                for (int i = 0; i < headers.Count; i++)
                {
                    worksheet.Cells[1, i + 1].Value = headers[i];
                }

                // Add data
                for (int row = 0; row < dataSource.Count; row++)
                {
                    var rowData = dataSource[row];
                    for (int col = 0; col < headers.Count; col++)
                    {
                        worksheet.Cells[row + 2, col + 1].Value = rowData[headers[col]];
                    }
                }
            }
        }

        private void AddListWorksheet(ExcelPackage package, string worksheetName, List<T>? dataList)
        {
            var worksheet = package.Workbook.Worksheets.Add(worksheetName);

            if (dataList.Count > 0)
            {
                // Use FastMember to access properties
                var accessor = TypeAccessor.Create(typeof(T));

                // Add headers
                var headers = accessor.GetMembers().Select(m => m.Name).ToList();
                for (int i = 0; i < headers.Count; i++)
                {
                    worksheet.Cells[1, i + 1].Value = headers[i];
                }

                // Add data
                for (int row = 0; row < dataList.Count; row++)
                {
                    var rowData = dataList[row];
                    for (int col = 0; col < headers.Count; col++)
                    {
                        worksheet.Cells[row + 2, col + 1].Value = accessor[dataList[row], headers[col]];
                    }
                }
            }
        }



        private void OpenExcelFile(string filePath)
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




}
