using Collections.Pooled;
using FastMember;
using System.Collections.Concurrent;
using System.Diagnostics;
using System.Threading.Channels;

namespace SmartComparer;

public class ListComparerV1<T> where T : class, new()
{
    private readonly List<string> keyProperties;

    private readonly TypeAccessor accessor;
    private readonly EqualityComparerEx<T> keyEqComparer;
    private List<string> _propNamesToCompare;
    private readonly Channel<CoupleItem<T>> bufferBlock;
    private PooledSet<(int, int)> processedCouples;

    public ListComparerV1(List<string> keyProperties, List<string> ignoreProperties)
    {
        this.keyProperties = keyProperties;
        accessor = TypeAccessor.Create(typeof(T));
        keyEqComparer = new EqualityComparerEx<T>(keyProperties);

        _propNamesToCompare = accessor.GetMembers().Where(m => m.Type != typeof(object)
            && !ignoreProperties.Contains(m.Name)
            ).Select(x => x.Name).ToList();

        bufferBlock = Channel.CreateUnbounded<CoupleItem<T>>();

    }

    private async Task MeasureTimeAsync(Func<Task> taskFunc, string action)
    {
        var sw = new Stopwatch();
        sw.Start();
        await taskFunc();
        sw.Stop();
        Console.WriteLine($"Elapsed Time for {action}:{sw.Elapsed.TotalSeconds:N}");
    }
    public async Task<CompareResult<T>> CompareObjectsAsync(List<T> referenceItems, List<T> targetItems)
    {
        ConcurrentBag<Dictionary<string, object>> inBothButDiff = new ConcurrentBag<Dictionary<string, object>>();
        var onlyInReference = new ConcurrentBag<T>();
        var onlyInTarget = new ConcurrentBag<T>();

        var tragetHashSet = new PooledSetEx<T>(targetItems.Count, keyEqComparer);
        var refHashSet = new PooledSetEx<T>(targetItems.Count, keyEqComparer);

        processedCouples = new PooledSet<(int, int)>();

        var sw = new Stopwatch();
        sw.Start();

        await Task.WhenAll(
            MeasureTimeAsync(() => Task.Run(() => referenceItems.ForEach(x => refHashSet.Add(x))), "Build Ref HashSet"),
            MeasureTimeAsync(() => Task.Run(() => targetItems.ForEach(x => tragetHashSet.Add(x))), "Build Target HashSet")
        );

        await Task.WhenAll(
            MeasureTimeAsync(() => ScanListAsync(refHashSet, tragetHashSet, onlyInReference, bufferBlock), "Get OnlyInTarget"),
            MeasureTimeAsync(() => ScanListAsync(tragetHashSet, refHashSet, onlyInTarget, bufferBlock, isReference: false), "Get OnlyInReference"),
            MeasureTimeAsync(() => CompareExistingInBothAsync(bufferBlock, inBothButDiff), "Compare InBoth")
        );

        var result = new CompareResult<T>(inBothButDiff.ToList())
        {
            OnlyInReference = onlyInReference.ToList(),
            OnlyInTarget = onlyInTarget.ToList()
        };

        sw.Stop();
        Console.WriteLine($"Elapsed Time for Compare: {sw.Elapsed.TotalSeconds:N}");

        return result;
    }

    private int blockCnt = 2;


    private void CompleteBlock()
    {
        blockCnt--;
        if (blockCnt == 0) bufferBlock.Writer.Complete();
    }

    

    private async Task CompareExistingInBothAsync(Channel<CoupleItem<T>> buffer, ConcurrentBag<Dictionary<string, object>> inBothButDiff)
    {
        await foreach (var couple in buffer.Reader.ReadAllAsync())
        {
            if(!processedCouples.Add(couple.Idx))continue;
            var diff = new Dictionary<string, object>();
            foreach (var propName in _propNamesToCompare)
            {
                var referenceValue = accessor[couple.ReferenceItem, propName];
                var targetValue = accessor[couple.TargetItem, propName];
                if (Equals(referenceValue, targetValue)) continue;
                diff.Add($"Reference_{propName}", referenceValue);
                diff.Add($"Target_{propName}", targetValue);
            }
            if (diff.Count > 0)
            {
                foreach (var keyValuePair in GetKeyValues(couple.ReferenceItem))
                {
                    diff.Add($"Key_{keyValuePair.Key}", keyValuePair.Value);
                }

                diff.Add("ComparedCouple", couple);
                inBothButDiff.Add(diff);
            }
        }
    }


    private async Task ScanListAsync(PooledSetEx<T> items, PooledSetEx<T> bag, ConcurrentBag<T> onlyIn, Channel<CoupleItem<T>> buffer, bool isReference = true)
    {
        var tasks = items.Select(async item =>
        {
            bool match = bag.TryGetValue(item.value, out var otherItem);
            if (match)
            {
                await buffer.Writer.WriteAsync(isReference
                    ? new CoupleItem<T>((item.index, otherItem.index), item.value, otherItem.value)
                    : new CoupleItem<T>((otherItem.index, item.index), otherItem.value, item.value));
            }
            else onlyIn.Add(item.value);
        }).ToArray();

        await Task.WhenAll(tasks);
        CompleteBlock();
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


