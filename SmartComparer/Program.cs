//using SmartComparer;

//// Example usage:


//public class Program
//{
//    private const int CNT = 10000000;
//    static void Main()
//    {

//        Console.WriteLine("Generate a large dataset");
//        List<ExampleItem> referenceList = GenerateLargeData();

//        List<ExampleItem> targetList = GenerateLargeDataWithChanges(referenceList);

//        Console.WriteLine($"Measure the performance of SmartCompare:{CNT} items");
//        var comparerFastMember = new ListComparer<ExampleItem>(new List<string> { nameof(ExampleItem.Id), nameof(ExampleItem.Name) }, new List<string>());
//        var diffResult = comparerFastMember.CompareList(referenceList, targetList).Result;

//        Console.WriteLine("InBothButDiff Count =>:" + diffResult.Count);
//        Console.WriteLine("OnlyInRef Count =>:" + diffResult.OnlyInReference?.Count);
//        Console.WriteLine("OnlyInTarget Count =>:" + diffResult.OnlyInTarget?.Count);

//        //var excelExporter = new HtmlExporter<ExampleItem>();
//        //var filePath = Path.Combine(Path.GetTempPath(), Guid.NewGuid() + "ComparisonDifferences.html");
//        //excelExporter.ExportDifferences(diffResult, filePath);

//    }


//    static List<ExampleItem> GenerateLargeData()
//    {
//        return Enumerable.Range(1, CNT)
//            .Select(i => new ExampleItem { Id = i, Name = $"Item{i}", Price = i + 100, Price1 = i + 90, Price2 = i + 80, Price3 = i + 70 })
//            .ToList();
//    }

//    static List<ExampleItem> GenerateLargeDataWithChanges(List<ExampleItem> originalData)
//    {
//        const int changesCount = CNT/ 2;

//        var inbothbutDiff  = originalData.OrderBy(g=>g.Id).Select((item, idx) =>
//            new ExampleItem { Id = item.Id, Name = item.Name, Price = idx < changesCount? item.Price*2: item.Price, Price1 = idx < changesCount ? item.Price1 * 2 : item.Price1

//            ,
//                Price2 = idx < changesCount ? item.Price2 * 2 : item.Price2
//                ,
//                Price3 = idx < changesCount ? item.Price3 * 2 : item.Price3

//            }
//        ).ToList().Take(originalData.Count - 100).ToList();


//        for (int i = changesCount; i < changesCount + 100; i++)
//        {
//            inbothbutDiff[i].Price *= 2;
//            inbothbutDiff[i].Price2 *= 2;
//            inbothbutDiff[i].Price3 *= 2;
//            inbothbutDiff[i].Price1 *= 2;
//        }

//        var onlyInRef = originalData.Take(2000).Select((item, idx) =>
//            new ExampleItem { Id = item.Id + originalData.Count+100, Name = item.Name, Price = item.Price, Price2 = item.Price2, Price3 = item.Price3}
//        ).ToList();

//        return inbothbutDiff.Concat(onlyInRef).ToList();
//    }
//}

