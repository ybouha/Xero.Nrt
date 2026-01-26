using System.Diagnostics;
using System.Reflection;
using Collections.Pooled;
using OfficeOpenXml;

namespace SmartComparer
{
    public class ExcelExporter<T>
    {
        private const int MaxRowsPerSheet = 1000000; // Excel row count limit

        public void ExportDifferences(CompareResult<T> dataSource, string filePath)
        {
            using (var package = new ExcelPackage())
            {
                AddWorksheets(package, dataSource);
                package.SaveAs(new FileInfo(filePath));
            }

            Console.WriteLine($"Excel file exported to: {filePath}");

            OpenExcelFile(filePath);
        }

        private void AddWorksheets(ExcelPackage package, CompareResult<T> dataSource)
        {
            var inBothButDifferent = dataSource;
            var onlyInReference = dataSource.OnlyInReference;
            var onlyInTarget = dataSource.OnlyInTarget;

            int index = 1;

            index = AddWorksheet(package, "InBothButDifferent", inBothButDifferent, index);
            index = AddListWorksheets(package, "OnlyInReference", onlyInReference, index);
            index = AddListWorksheets(package, "OnlyInTarget", onlyInTarget, index);
        }

        private int AddWorksheet(ExcelPackage package, string worksheetName, List<PooledDictionary<string, object>> dataList, int index)
        {
            int remainingRows = dataList.Count;
            int sheetIndex = 1;

            while (remainingRows > 0)
            {
                var worksheet = package.Workbook.Worksheets.Add($"{worksheetName}_{sheetIndex}");

                // Add headers
                var headers = dataList.First().Keys.ToList();
                for (int i = 0; i < headers.Count; i++)
                {
                    worksheet.Cells[1, i + 1].Value = headers[i];
                }

                // Add data
                int row = 0;
                int rowsAdded = 0;
                for (; row < remainingRows && rowsAdded < MaxRowsPerSheet; row++, rowsAdded++)
                {
                    var rowData = dataList[row];
                    for (int col = 0; col < headers.Count; col++)
                    {
                        worksheet.Cells[row + 2, col + 1].Value = rowData[headers[col]];
                    }
                }

                remainingRows -= rowsAdded;
                index++;

                sheetIndex++;
            }

            return index;
        }

        private int AddListWorksheets(ExcelPackage package, string worksheetName, List<T>? dataList, int index)
        {
            if (dataList == null || dataList.Count == 0)
                return index;

            var typeMembers = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance)
                .Where(p => p.CanRead && p.GetIndexParameters().Length == 0)
                .ToArray();

            int remainingRows = dataList.Count;
            int sheetIndex = 1;

            while (remainingRows > 0)
            {
                var worksheet = package.Workbook.Worksheets.Add($"{worksheetName}_{sheetIndex}");

                // Add headers
                var headers = typeMembers.Select(m => m.Name).ToList();
                for (int i = 0; i < headers.Count; i++)
                {
                    worksheet.Cells[1, i + 1].Value = headers[i];
                }

                // Add data
                int row = 0;
                int rowsAdded = 0;
                for (; row < remainingRows && rowsAdded < MaxRowsPerSheet; row++, rowsAdded++)
                {
                    var rowData = dataList[row];
                    for (int col = 0; col < headers.Count; col++)
                    {
                        worksheet.Cells[row + 2, col + 1].Value = typeMembers[col].GetValue(dataList[row]);
                    }
                }

                remainingRows -= rowsAdded;
                index++;

                sheetIndex++;
            }

            return index;
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