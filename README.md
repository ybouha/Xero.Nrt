# SmartComparer

**SmartComparer** is a high-performance .NET library designed to efficiently compare large lists of objects. It leverages advanced memory management and fast reflection techniques to identify differences between two datasets quickly.
![alt text](https://github.com/ybouha/SmartComparer/blob/master/SmartCompare.png?raw=true)
## Features

- **High Performance**: Uses **Compiled Expression Trees** for rapid property access and `HashSet` for O(1) lookups.
- **Memory Efficient**: Utilizes `Collections.Pooled` to reduce garbage collection pressure during large comparisons.
- **Detailed Reporting**:
  - **Excel Export**: Generates multi-sheet Excel reports highlighting differences (`EPPlus`).
  - **HTML Export**: Creates interactive HTML reports with collapsible sections.
  - **Console Gantt Chart**: Visualizes parallel task execution timeline in the console.
- **Flexible Comparison**:
  - Compare by specific key properties.
  - Ignore specific properties during comparison.
  - Detects items "Only in Reference", "Only in Target", and "In Both but Different".

## Getting Started

### Prerequisites

- .NET 8.0 SDK

### Dependencies

This project relies on the following key NuGet packages:
- `EPPlus.Core`
- `Collections.Pooled`
- `CommandLineParser`

### Usage

Here is a basic example of how to use `ListComparer` to compare two lists of objects:

```csharp
using SmartComparer;

// 1. Define your data model
public class ExampleItem
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
}

// 2. Prepare your lists
var referenceList = new List<ExampleItem> { /* ... populate data ... */ };
var targetList = new List<ExampleItem> { /* ... populate data ... */ };

// 3. Configure the comparer
// Define which properties act as unique keys (e.g., "Id")
var keyProperties = new List<string> { nameof(ExampleItem.Id) };
// Define properties to ignore (optional)
var ignoreProperties = new List<string>();

var comparer = new ListComparer<ExampleItem>(keyProperties, ignoreProperties);

// 4. Perform the comparison
var result = await comparer.CompareList(referenceList, targetList);

// 5. Inspect results
Console.WriteLine($"Only in Reference: {result.OnlyInReference?.Count}");
Console.WriteLine($"Only in Target: {result.OnlyInTarget?.Count}");
Console.WriteLine($"In Both but Different: {result.Count}");

// 6. Export results (Optional)
// Export to HTML
var htmlExporter = new HtmlExporter<ExampleItem>();
htmlExporter.ExportDifferences(result, "comparison_report.html");

// Export to Excel
var excelExporter = new ExcelExporter<ExampleItem>();
excelExporter.ExportDifferences(result, "comparison_report.xlsx");
```

## Project Structure

- **ListComparer.cs**: Core logic for comparing lists.
- **EqualityComparer.cs**: Custom equality comparers for `HashSet` operations.
- **ExcelExporter.cs**: Handles exporting comparison results to `.xlsx`.
- **HtmlExporter.cs**: Handles exporting comparison results to `.html`.
- **Program.cs**: Contains example usage and performance testing code.
