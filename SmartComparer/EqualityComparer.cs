using FastMember;

namespace SmartComparer
{
    public class EqualityComparer<T> : IEqualityComparer<T>
    {
        private readonly List<string> _keyPops;
        private readonly TypeAccessor _typeAccessor;

        public EqualityComparer(List<string> keyPops)
        {
            _keyPops = keyPops;
            _typeAccessor = TypeAccessor.Create(typeof(T));
        }

        public bool Equals(T? x, T? y)
        {
            return _keyPops.All(column =>
            {
                object value1 = _typeAccessor[x, column];
                object value2 = _typeAccessor[y, column];
                return value1?.Equals(value2) ?? value2 == null;
            });
        }

        public int GetHashCode(T obj)
        {
            unchecked
            {
                return _keyPops.Select(column => _typeAccessor[obj, column]).Aggregate(17, (hashCode, value) => hashCode * 23 + (value?.GetHashCode() ?? 0));
            }
        }
    }

}
