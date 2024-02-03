using System.Linq.Expressions;
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



    public class EqualityComparerV1<T> : IEqualityComparer<T>
    {
        private readonly Func<T, object[]> keySelectors;

        public EqualityComparerV1(List<string> keyProperties)
        {
            keySelectors = BuildKeySelectors(keyProperties);
        }

        private Func<T, object[]> BuildKeySelectors(List<string> keyProperties)
        {
            var type = typeof(T);
            var parameter = Expression.Parameter(type, "x");

            var keySelectors = keyProperties.Select(propertyName =>
            {
                var property = type.GetProperty(propertyName);
                var propertyAccess = Expression.Property(parameter, property);
                var propertyConversion = Expression.Convert(propertyAccess, typeof(object));

                return propertyConversion;
            }).ToArray();

            var arrayCreation = Expression.NewArrayInit(typeof(object), keySelectors);

            return Expression.Lambda<Func<T, object[]>>(arrayCreation, parameter).Compile();
        }

        public bool Equals(T x, T y)
        {
            var xKeys = keySelectors(x);
            var yKeys = keySelectors(y);

            return xKeys.SequenceEqual(yKeys);
        }

        public int GetHashCode(T obj)
        {
            var keys = keySelectors(obj);
            return keys.Aggregate(0, (currentHash, key) => HashCode.Combine(currentHash, key));
        }
    }
}
