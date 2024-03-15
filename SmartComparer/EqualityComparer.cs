using FastMember;

namespace SmartComparer
{
    public class EqualityComparerEx<T> : IEqualityComparer<T>
    {
        private readonly List<string> _keyPops;
        private readonly TypeAccessor _typeAccessor;

        public EqualityComparerEx(List<string> keyPops)
        {
            _keyPops = keyPops;
            _typeAccessor = TypeAccessor.Create(typeof(T));
        }

        public bool Equals(T? x, T? y)
        {
            return _keyPops.All(prop =>
            {
                object value1 = _typeAccessor[x, prop];
                object value2 = _typeAccessor[y, prop];
                return value1?.Equals(value2) ?? value2 == null;
            });
        }

        //public int GetHashCode(T obj)
        //{
        //    var hashCode = new HashCode();
        //    _keyPops.ForEach(p =>
        //    {
        //        hashCode.Add(_typeAccessor[obj, p]);
        //    });
        //    return hashCode.ToHashCode();
        //}


        public int GetHashCode(T obj)
        {
            // Combine hash codes of all key properties
            unchecked
            {
                int hashCode = 17;
                foreach (var prop in _keyPops)
                {
                    object value = _typeAccessor[obj, prop];
                    hashCode = hashCode * 31 + (value?.GetHashCode() ?? 0);
                }
                return hashCode;
            }
        }

    }

}
