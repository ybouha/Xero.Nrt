namespace SmartComparer;

public class ExampleItem
{
    protected bool Equals(ExampleItem other)
    {
        return Id == other.Id && Name == other.Name;
    }

    public override bool Equals(object? obj)
    {
        if (ReferenceEquals(null, obj)) return false;
        if (ReferenceEquals(this, obj)) return true;
        if (obj.GetType() != GetType()) return false;
        return Equals((ExampleItem)obj);
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(Id, Name);
    }


    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
}