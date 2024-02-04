using FastMember;
using System.Linq.Expressions;

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
            return _keyPops.All(column =>
            {
                object value1 = _typeAccessor[x, column];
                object value2 = _typeAccessor[y, column];
                return value1?.Equals(value2) ?? value2 == null;
            });
        }

        public int GetHashCode(T obj)
        {
            var hashCode = new HashCode();
            _keyPops.ForEach(p =>
            {
                hashCode.Add(_typeAccessor[obj, p]);
            });
            return hashCode.ToHashCode();
        }


    }

}
