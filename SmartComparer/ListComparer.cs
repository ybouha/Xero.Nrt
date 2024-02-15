using FastMember;
using System.Diagnostics;

namespace SmartComparer;

public class ListComparer<T> where T : class, new()
{
    private readonly List<string> keyProperties;

    private readonly TypeAccessor accessor;
    private readonly EqualityComparerEx<T> keyEqComparer;
    private List<string> _propNamesToCompare;

    public ListComparer(List<string> keyProperties, List<string> ignoreProperties)
    {
        this.keyProperties = keyProperties;
        accessor = TypeAccessor.Create(typeof(T));
        keyEqComparer = new EqualityComparerEx<T>(keyProperties);

        _propNamesToCompare = accessor.GetMembers().Where(m => m.Type != typeof(object)
            && !ignoreProperties.Contains(m.Name)
            && !keyProperties.Contains(m.Name)
            ).Select(x => x.Name).ToList();


    }

    private async Task MeasureTimeAsync(Func<Task> taskFunc, string action)
    {
        var sw = new Stopwatch();
        sw.Start();
        await taskFunc();
        sw.Stop();
        Console.WriteLine($"Elapsed Time for {action}:{sw.Elapsed.TotalSeconds:N}");
    }


    private TResult MeasureTime<TResult>(Func<TResult> taskFunc, string action)
    {
        var sw = new Stopwatch();
        sw.Start();
        TResult result = taskFunc();
        sw.Stop();
        Console.WriteLine($"Elapsed Time for {action}:{sw.Elapsed.TotalSeconds:N}");
        return result;
    }

    public async Task<CompareResult<T>> CompareList(List<T> referenceItems, List<T> targetItems)
    {
        List<T>? onlyInTarget = null;
        List<T>? onlyInReference = null;
        List<Dictionary<string, object>>? inBothButDiff = null;

        var comparerSet = new HashSetComparer<T>(referenceItems.Count, targetItems.Count, keyEqComparer);

        var sw = new Stopwatch();
        sw.Start();

        await Task.WhenAll(
            MeasureTimeAsync(() => Task.Run(() => referenceItems.ForEach(x => comparerSet.AddLeftItem(x))), "Build Ref HashSet"),
            MeasureTimeAsync(() => Task.Run(() => targetItems.ForEach(x => comparerSet.AddRightItem(x))), "Build Target HashSet")
        );

        Parallel.Invoke(
            new ParallelOptions { MaxDegreeOfParallelism = Environment.ProcessorCount },
            () => onlyInTarget = MeasureTime(() => comparerSet.OnlyInRight().ToList(), "Get OnlyInTarget"),
            () => onlyInReference = MeasureTime(() => comparerSet.OnlyInLeft().ToList(), "Get OnlyInReference"),
            () => inBothButDiff = MeasureTime(() => CompareInBoth(comparerSet.InBoth()), "Compare InBoth")
        );

        var result = new CompareResult<T>(inBothButDiff)
        {
            OnlyInReference = onlyInReference,
            OnlyInTarget = onlyInTarget
        };


        sw.Stop();
        Console.WriteLine($"Elapsed Time for Compare: {sw.Elapsed.TotalSeconds:N}");

        return result;

    }

    private List<Dictionary<string, object>> CompareInBoth(IEnumerable<(T, T)> inBothEnumerator)
    {
        return inBothEnumerator.AsParallel()
            .Select(couple => CompareProperties(couple.Item1, couple.Item2))
            .Where(diff => diff.Count > 0)
            .ToList();
    }

    private Dictionary<string, object> CompareProperties(T referenceItem, T targetItem)
    {
        var keyValues = GetKeyValues(referenceItem);
        Dictionary<string, object> diff = new Dictionary<string, object>();
        foreach (var property in _propNamesToCompare)
        {
            var referenceValue = accessor[referenceItem, property];
            var targetValue = accessor[targetItem, property];
            if (Equals(referenceValue, targetValue)) continue;

            diff.Add($"Reference_{property}", referenceValue);
            diff.Add($"Target_{property}", targetValue);
           
        }

        if (diff.Count == 0 ) return diff;
        foreach (var keyValuePair in keyValues)
        {
            diff.Add($"Key_{keyValuePair.Key}", keyValuePair.Value);
        }
        diff.Add("ComparedItems", new CoupleItem<T>(referenceItem, targetItem));
        return diff;
    }



    private Dictionary<string, object> GetKeyValues(T item)
    {
        var keyValues = new Dictionary<string, object>();
        foreach (var keyProperty in keyProperties)
        {
            var value = accessor[item, keyProperty];
            keyValues.Add(keyProperty, value);
        }
        return keyValues;
    }
}


