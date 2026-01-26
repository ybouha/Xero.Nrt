using System.Diagnostics;
using Collections.Pooled;
using System.Linq.Expressions;
using System.Reflection;

namespace SmartComparer;

public class ListComparer<T> where T : class, new()
{
    // Store name and getter for iterating and creating the diff dictionary
    private readonly List<(string Name, Func<T, object> Getter)> _keyPropertiesData; 
    private readonly List<(string Name, Func<T, object> Getter)> _propertiesToCompareData;

    private readonly EqualityComparerEx<T> keyEqComparer;

    // Gantt Chart Data
    public class TaskInfo
    {
        public string Name;
        public long Start;   // in ms or seconds
        public long End;
        public long Duration => End - Start;
    }

    private List<TaskInfo> _taskTimings = new List<TaskInfo>();
    private Stopwatch _globalStopwatch;

    public ListComparer(List<string> keyProperties, List<string> ignoreProperties)
    {
        _keyPropertiesData = new List<(string Name, Func<T, object> Getter)>(keyProperties.Count);
        var keyGetters = new List<Func<T, object>>(keyProperties.Count);

        foreach (var propName in keyProperties)
        {
             var getter = CreatePropertyGetter(propName);
             _keyPropertiesData.Add((propName, getter));
             keyGetters.Add(getter);
        }
        
        // Use fast member just to get the list of properties to compare easily, or standard reflection. 
        // Standard reflection is fine for init.
        var allProps = typeof(T).GetProperties(BindingFlags.Instance | BindingFlags.Public)
                                .Where(p => p.CanRead && p.GetIndexParameters().Length == 0);

        _propertiesToCompareData = new List<(string Name, Func<T, object> Getter)>();

        foreach (var prop in allProps)
        {
            if (ignoreProperties.Contains(prop.Name)) continue;
            if (keyProperties.Contains(prop.Name)) continue;
            
            _propertiesToCompareData.Add((prop.Name, CreatePropertyGetter(prop)));
        }

        keyEqComparer = new EqualityComparerEx<T>(keyGetters);
    }
    
    private Func<T, object> CreatePropertyGetter(string propertyName)
    {
        var propInfo = typeof(T).GetProperty(propertyName, BindingFlags.Instance | BindingFlags.Public);
        if (propInfo == null) throw new ArgumentException($"Property {propertyName} not found on {typeof(T).Name}");
        return CreatePropertyGetter(propInfo);
    }

    private Func<T, object> CreatePropertyGetter(PropertyInfo propInfo)
    {
        var parameter = Expression.Parameter(typeof(T), "i");
        var propertyAccess = Expression.Property(parameter, propInfo);
        
        // Handle value types by converting to object
        var conversion = Expression.Convert(propertyAccess, typeof(object));
        return Expression.Lambda<Func<T, object>>(conversion, parameter).Compile();
    }

    private async Task MeasureTimeAsync(Func<Task> taskFunc, string action)
    {
        long start = _globalStopwatch.ElapsedMilliseconds;
        
        var sw = new Stopwatch();
        sw.Start();
        await taskFunc();
        sw.Stop();
        
        long end = _globalStopwatch.ElapsedMilliseconds;
        
        lock (_taskTimings)
        {
            _taskTimings.Add(new TaskInfo { Name = action, Start = start, End = end });
        }
        
        Console.WriteLine($"Elapsed Time(seconds) for {action}:{sw.Elapsed.TotalSeconds:N}");
    }


    private TResult MeasureTime<TResult>(Func<TResult> taskFunc, string action)
    {
        long start = _globalStopwatch.ElapsedMilliseconds;

        var sw = new Stopwatch();
        sw.Start();
        TResult result = taskFunc();
        sw.Stop();
        
        long end = _globalStopwatch.ElapsedMilliseconds;

        lock (_taskTimings)
        {
            _taskTimings.Add(new TaskInfo { Name = action, Start = start, End = end });
        }

        Console.WriteLine($"Elapsed Time(seconds) for {action}:{sw.Elapsed.TotalSeconds:N}");
        return result;
    }

    public async Task<CompareResult<T>> CompareList(List<T> referenceItems, List<T> targetItems)
    {
        _globalStopwatch = Stopwatch.StartNew();
        _taskTimings.Clear();

        List<T>? onlyInTarget = null;
        List<T>? onlyInReference = null;
        List<PooledDictionary<string, object>>? inBothButDiff = new List<PooledDictionary<string, object>>();

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

        DrawGantt(_taskTimings);

        return result;

    }

    private void DrawGantt(List<TaskInfo> tasks)
    {
        if (tasks.Count == 0) return;
        
        long minTime = tasks.Min(t => t.Start);
        long maxTime = tasks.Max(t => t.End);
        long totalDuration = maxTime - minTime;
        
        const int chartWidth = 100; // Number of characters for the timeline
        double scale = totalDuration > 0 ? (double)chartWidth / totalDuration : 1;

        Console.WriteLine("\nParallel Task Visualization (Gantt Chart):");
        Console.WriteLine(new string('-', chartWidth + 20));

        foreach (var task in tasks.OrderBy(t => t.Start))
        {
            int startPos = (int)((task.Start - minTime) * scale);
            int durationLength = (int)(task.Duration * scale);
            if (durationLength == 0) durationLength = 1; // Ensure at least one char for very fast tasks

            Console.Write($"{task.Name.PadRight(25)}: ");
            
            Console.Write(new string(' ', startPos));
            Console.Write(new string('█', durationLength));
            
            Console.WriteLine($"  [{task.Start}ms - {task.End}ms] ({task.Duration}ms)");
        }
        Console.WriteLine(new string('-', chartWidth + 20));
    }


    private List<PooledDictionary<string, object>> CompareInBoth(IEnumerable<(T, T)> inBothEnumerator)
    {
        return inBothEnumerator.AsParallel()
            .Select(couple => CompareProperties(couple.Item1, couple.Item2))
            .Where(diff => diff.Count > 0)
            .ToList();
    }

    private PooledDictionary<string, object> CompareProperties(T referenceItem, T targetItem)
    {
        // Optimization: Don't allocate anything until we find a difference
        PooledDictionary<string, object>? diff = null;

        for (int i = 0; i < _propertiesToCompareData.Count; i++)
        {
            var propName = _propertiesToCompareData[i].Name;
            var getter = _propertiesToCompareData[i].Getter;

            var referenceValue = getter(referenceItem);
            var targetValue = getter(targetItem);

            if (Equals(referenceValue, targetValue)) continue;

            if (diff == null) diff = new PooledDictionary<string, object>();

            diff.Add($"Reference_{propName}", referenceValue);
            diff.Add($"Target_{propName}", targetValue);
        }

        if (diff == null) return new PooledDictionary<string, object>(); // Empty dictionary if no diffs

        // Add Key Values
        for (int i = 0; i < _keyPropertiesData.Count; i++)
        {
            var propName = _keyPropertiesData[i].Name;
            var getter = _keyPropertiesData[i].Getter;
            diff.Add($"Key_{propName}", getter(referenceItem));
        }

        diff.Add("ComparedItems", new CoupleItem<T>(referenceItem, targetItem));
        return diff;
    }
}
