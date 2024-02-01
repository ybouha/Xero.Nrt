using System.ComponentModel;

namespace SmartComparer;

public class CompareResult<T> : List<Dictionary<string, object>>, ITypedList
{
    public Dictionary<string, object> FirstRow
    {
        get
        {
            if (Count == 0) return new Dictionary<string, object>();
            int maxCnt = this.Max(c => c.Count);
            return this.First(d => d.Count == maxCnt);
        }
    }

    public Dictionary<string, Type> ColumnTypes { get; }

    public List<T>? OnlyInReference { get; internal set; } = new();

    public List<T>? OnlyInTarget { get; internal set; } = new();


    public CompareResult(List<Dictionary<string, object>>? data) : base(data)
    {
        ColumnTypes = FirstRow.Keys.ToDictionary(column => column, column => FirstRow[column]?.GetType() ?? typeof(string));
    }

    PropertyDescriptorCollection ITypedList.GetItemProperties(PropertyDescriptor[] listAccessors)
    {
        var descriptors = FirstRow.Keys.Select(key => new DynamicPropertyDescriptor(key, ColumnTypes[key])).ToArray();
        return new PropertyDescriptorCollection(descriptors);
    }

    string ITypedList.GetListName(PropertyDescriptor[] listAccessors) { throw new NotImplementedException(); }
}