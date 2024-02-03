using SmartComparer;

// Example usage:


public class Program
{
    private const int CNT = 10000000;

    static void Main()
    {
        Console.WriteLine("Generate a large dataset");
        List<ExampleItem> referenceList = GenerateLargeData();
        List<ExampleItem> targetList = GenerateLargeDataWithChanges(referenceList);

        Console.WriteLine($"Measure the performance of SmartCompare:{CNT} items");
        var comparerFastMember = new ListComparerV1<ExampleItem>(new List<string> { nameof(ExampleItem.Id), nameof(ExampleItem.Name) }, new List<string>());
        var diffResult = comparerFastMember.CompareObjects(referenceList, targetList);

        Console.WriteLine("InBothButDiff Count =>:" + diffResult.Count);
        Console.WriteLine("OnlyInRef Count =>:" + diffResult.OnlyInReference.Count);
        Console.WriteLine("OnlyInTarget Count =>:" + diffResult.OnlyInTarget .Count);

        //var excelExporter = new ExcelExporter<ExampleItem>();
        //var filePath = Path.Combine(Path.GetTempPath(), Guid.NewGuid() + "ComparisonDifferences.xlsx");
        //excelExporter.ExportDifferences(diffResult, filePath);

    }

    static List<ExampleItem> GenerateLargeData()
    {
        const int dataSize = CNT; // Adjust the size as needed
        var random = new Random();
        return Enumerable.Range(1, dataSize)
            .Select(i => new ExampleItem { Id = i, Name = $"Item{i}", Price = i + 100 })
            .ToList();
    }

    static List<ExampleItem> GenerateLargeDataWithChanges(List<ExampleItem> originalData)
    {
        const int changesCount = CNT/ 20;

        var inbothbutDiff  = originalData.OrderBy(g=>g.Id).Select((item, idx) =>
            new ExampleItem { Id = item.Id, Name = item.Name, Price = idx < changesCount? item.Price*2: item.Price }
        ).ToList().Take(originalData.Count - 1000).ToList();


        var onlyInRef = originalData.Take(2000).Select((item, idx) =>
            new ExampleItem { Id = item.Id + originalData.Count+100, Name = item.Name, Price = item.Price }
        ).ToList();

        for (int i = changesCount; i < changesCount + 100; i++)
        {
            inbothbutDiff[i].Price *= 2;
        }

        return inbothbutDiff.Concat(onlyInRef).ToList();
    }
}

