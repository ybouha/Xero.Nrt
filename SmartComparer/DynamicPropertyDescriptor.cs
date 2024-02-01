using System.ComponentModel;

namespace SmartComparer;

public class DynamicPropertyDescriptor : PropertyDescriptor
{
    public DynamicPropertyDescriptor(string name, Type type) : base(name, null)
    {
        Type = type;
    }

    public Type Type { get; }

    public override object? GetValue(object component)
    {
        return component is Dictionary<string, object> dict && dict.ContainsKey(Name) ? dict[Name] : null;
    }

    public override bool IsReadOnly => false;

    public override Type PropertyType => Type;

    public override bool CanResetValue(object component) { throw new NotImplementedException(); }

    public override Type ComponentType => typeof(object);

    public override void ResetValue(object component) { throw new NotImplementedException(); }

    public override void SetValue(object? component, object? value) { throw new NotImplementedException(); }

    public override bool ShouldSerializeValue(object component) { throw new NotImplementedException(); }
}