namespace SmartComparer;

public class ExampleItem
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
}

public class Customer
{
    protected bool Equals(Customer other)
    {
        return CustomerId == other.CustomerId && FirstName == other.FirstName && LastName == other.LastName && BirthDate.Equals(other.BirthDate) && Email == other.Email && PhoneNumber == other.PhoneNumber && Address == other.Address && City == other.City && PostalCode == other.PostalCode && Country == other.Country && TotalPurchaseAmount == other.TotalPurchaseAmount && IsPreferredCustomer == other.IsPreferredCustomer;
    }

    public override bool Equals(object? obj)
    {
        if (ReferenceEquals(null, obj)) return false;
        if (ReferenceEquals(this, obj)) return true;
        if (obj.GetType() != this.GetType()) return false;
        return Equals((Customer) obj);
    }

    public override int GetHashCode()
    {
        var hashCode = new HashCode();
        hashCode.Add(CustomerId);
        hashCode.Add(FirstName);
        hashCode.Add(LastName);
        hashCode.Add(BirthDate);
        hashCode.Add(Email);
        hashCode.Add(PhoneNumber);
        hashCode.Add(Address);
        hashCode.Add(City);
        hashCode.Add(PostalCode);
        hashCode.Add(Country);
        hashCode.Add(TotalPurchaseAmount);
        hashCode.Add(IsPreferredCustomer);
        return hashCode.ToHashCode();
    }

    public int CustomerId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateTime BirthDate { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public string Address { get; set; }
    public string City { get; set; }
    public string PostalCode { get; set; }
    public string Country { get; set; }
    public decimal TotalPurchaseAmount { get; set; }
    public bool IsPreferredCustomer { get; set; }
}