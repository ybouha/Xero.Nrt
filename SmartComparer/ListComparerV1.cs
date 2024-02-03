using System.Diagnostics;
using System.Text.Json;
using FastMember;

namespace SmartComparer;

public class ListComparerV1<T> where T:class, new()
{
    private readonly List<string> keyProperties;
    private readonly List<string> ignoreProperties;

    private readonly TypeAccessor accessor;
    private readonly EqualityComparer<T> keyEqComparer;


    public ListComparerV1(List<string> keyProperties, List<string> ignoreProperties)
    {
        this.keyProperties = keyProperties;
        this.ignoreProperties = ignoreProperties;
        accessor = TypeAccessor.Create(typeof(T));
        keyEqComparer = new EqualityComparer<T>(keyProperties);
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

    public CompareResult<T> CompareObjects(List<T> referenceItems, List<T> targetItems)
    {
        List<T>? onlyInTarget = null;
        List<T>? onlyInReference = null;
        List<Dictionary<string, object>>? inBothButDiff = null;

        var refList = referenceItems
            .AsParallel()
            .Select(item => (keyEqComparer.GetHashCode(item), item))
            .ToList();

        var targetList = targetItems
            .AsParallel()
            .Select(item => (keyEqComparer.GetHashCode(item), item))
            .ToList();


        Parallel.Invoke(
            new ParallelOptions { MaxDegreeOfParallelism = Environment.ProcessorCount },
            () => onlyInTarget = MeasureTime(() => GetOnlyInList(targetItems, referenceItems), "Get OnlyInTarget"),
            () => onlyInReference = MeasureTime(() => GetOnlyInList(referenceItems, targetItems), "Get OnlyInReference"),
            () => inBothButDiff = MeasureTime(() => CompareExistingInBoth(referenceItems, targetItems), "Compare InBoth")
        );

        var result = new CompareResult<T>(inBothButDiff)
        {
            OnlyInReference = onlyInReference,
            OnlyInTarget = onlyInTarget
        };

        return result;
    }

    private List<Dictionary<string, object>>? CompareExistingInBoth(List<T> referenceItems, List<T> targetItems)
    {
        return referenceItems.Join(targetItems,
                x => x,
                y => y,
                (x, y) => new CoupleItem<T>(x, y)
                ,keyEqComparer)
            .AsParallel()
            .Select(CompareProperties)
            .Where(diffResult => diffResult.Count > 0)
            .ToList();
    }

    private List<T>? GetOnlyInList(List<T> baseItems, List<T> otherItems)
    {
        //var otherSet = new HashSet<T>(otherItems, keyEqComparer);
        //return baseItems.Where(item => !otherSet.Contains(item)).ToList();
        return baseItems.ExceptEx(otherItems, keyEqComparer).ToList();
    }


    private Dictionary<string, object> CompareProperties(CoupleItem<T> couple)
    {
        var keyValues = GetKeyValues(couple.ReferenceItem);
        var diff = new Dictionary<string, object>();
        foreach (var prop in accessor.GetMembers().Where(m => m.Type != typeof(object) && !ignoreProperties.Contains(m.Name)))
        {
            var referenceValue = accessor[couple.ReferenceItem, prop.Name];
            var targetValue = accessor[couple.TargetItem, prop.Name];
            if (Equals(referenceValue, targetValue)) continue;

            diff.Add($"Reference_{prop.Name}", referenceValue);
            diff.Add($"Target_{prop.Name}", targetValue);
        }

        if (diff.Count <= 0) return diff;
        foreach (var keyValuePair in keyValues)
        {
            diff.Add($"Key_{keyValuePair.Key}", keyValuePair.Value);
        }
        diff.Add("ComparedCouple", couple);
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

