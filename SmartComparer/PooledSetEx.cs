using System.Buffers;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Runtime.Serialization;
using Collections.Pooled;

namespace SmartComparer;

public class PooledSetEx<T> : IDisposable, IEnumerable<PooledSetEx<T>.Slot>
{
    private const int Lower31BitMask = 0x7FFFFFFF;

    private static readonly ArrayPool<int> s_bucketPool = ArrayPool<int>.Shared;
    private static readonly ArrayPool<Slot> s_slotPool = ArrayPool<Slot>.Shared;
    private int[] _buckets;
    private Slot[] _slots;
    private int _size;

    private int _lastIndex;
    private int _freeList;
    private int _version;
    private readonly bool _clearOnFree;


    public PooledSetEx(int capacity, ClearMode clearMode, IEqualityComparer<T> comparer) : this(clearMode, comparer)
    {
        if (capacity > 0) Initialize(capacity);
    }

    public PooledSetEx(ClearMode clearMode, IEqualityComparer<T> comparer)
    {
        Comparer = comparer;
        _lastIndex = 0;
        Count = 0;
        _freeList = -1;
        _version = 0;
        _size = 0;
        _clearOnFree = ShouldClear(clearMode);
    }

    public PooledSetEx(int capacity, IEqualityComparer<T> comparer) : this(capacity, ClearMode.Auto, comparer)
    {
    }


    private readonly ReaderWriterLockSlim _lock = new ReaderWriterLockSlim(LockRecursionPolicy.SupportsRecursion);
    public bool AddConccurent(T item)
    {
        _lock.EnterWriteLock();
        try
        {
            return Add(item);
        }
        finally
        {
            if (_lock.IsWriteLockHeld) _lock.ExitWriteLock();
        }
    }

    private int InternalGetHashCode(T item)
    {
        if (item == null) return 0;
        return Comparer.GetHashCode(item) & Lower31BitMask;
    }

    private bool AddIfNotPresent(T value)
    {
        var hashCode = InternalGetHashCode(value);
        var bucket = hashCode % _size;
        var slots = _slots;
        for (var i = _buckets[bucket] - 1; i >= 0; i = slots[i].next)
            if (slots[i].hashCode == hashCode && Comparer.Equals(slots[i].value, value))
                return false;

        int index;
        if (_freeList >= 0)
        {
            index = _freeList;
            _freeList = slots[index].next;
        }
        else
        {
            index = _lastIndex;
            _lastIndex++;
        }

        slots[index].hashCode = hashCode;
        slots[index].value = value;
        slots[index].AlreadyUsed = false;
        slots[index].next = _buckets[bucket] - 1;
        slots[index].index = index;
        _buckets[bucket] = index + 1;
        Count++;
        _version++;

        return true;
    }


    private int InternalIndexOf(T item)
    {
        Debug.Assert(_buckets != null, "_buckets was null; callers should check first");

        var hashCode = InternalGetHashCode(item);
        var slots = _slots;
        for (var i = _buckets[hashCode % _size] - 1; i >= 0; i = slots[i].next)
        {
            if (slots[i].hashCode == hashCode && Comparer.Equals(slots[i].value, item)) return i;
        }
        return -1;
    }


    public bool Contains(T item)
    {
        var hashCode = InternalGetHashCode(item);
        var slots = _slots;
        for (var i = _buckets[hashCode % _size] - 1; i >= 0; i = slots[i].next)
            if (slots[i].hashCode == hashCode && Comparer.Equals(slots[i].value, item))
                return true;
        return false;
    }

    public void CopyTo(T[] array, int arrayIndex)
        => CopyTo(array, arrayIndex, Count);

    public void CopyTo(T[] array, int arrayIndex, int count)
    {
        int numCopied = 0;
        for (int i = 0; i < _lastIndex && numCopied < count; i++)
        {
            if (_slots[i].hashCode >= 0)
            {
                array[arrayIndex + numCopied] = _slots[i].value;
                numCopied++;
            }
        }
    }

    public bool Remove(T item)
    {
        var hashCode = InternalGetHashCode(item);
        var bucket = hashCode % _size;
        var last = -1;
        var slots = _slots;
        for (var i = _buckets[bucket] - 1; i >= 0; last = i, i = slots[i].next)
            if (slots[i].hashCode == hashCode && Comparer.Equals(slots[i].value, item))
            {
                if (last < 0)
                    _buckets[bucket] = slots[i].next + 1;
                else
                    slots[last].next = slots[i].next;
                slots[i].hashCode = -1;
                if (_clearOnFree) slots[i].value = default;
                slots[i].next = _freeList;

                Count--;
                _version++;
                if (Count == 0)
                {
                    _lastIndex = 0;
                    _freeList = -1;
                }
                else
                {
                    _freeList = i;
                }

                return true;
            }

        return false;
    }

    public int Count { get; private set; }



    public bool Add(T item)
    {
        return AddIfNotPresent(item);
    }


    public bool TryGetValue(T equalValue, out Slot actualValue)
    {
        var i = InternalIndexOf(equalValue);
        if (i >= 0)
        {
            actualValue = _slots[i];
            return true;
        }
        actualValue = default;
        return false;
    }


    public IEqualityComparer<T> Comparer { get; }



    private void Initialize(int capacity)
    {
        Debug.Assert(_buckets == null, "Initialize was called but _buckets was non-null");

        _size = HashHelpers.GetPrime(capacity);
        _buckets = s_bucketPool.Rent(_size);
        Array.Clear(_buckets, 0, _buckets.Length);
        _slots = s_slotPool.Rent(_size);
    }



    private void ReturnArrays()
    {
        if (_slots?.Length > 0)
            try
            {
                s_slotPool.Return(_slots, _clearOnFree);
            }
            catch (ArgumentException)
            {
            }

        if (_buckets?.Length > 0)
            try
            {
                s_bucketPool.Return(_buckets);
            }
            catch (ArgumentException)
            {
            }

        _slots = null;
        _buckets = null;
    }

    private static bool ShouldClear(ClearMode mode)
    {
#if NETCOREAPP2_1
            return mode == ClearMode.Always
                || (mode == ClearMode.Auto && RuntimeHelpers.IsReferenceOrContainsReferences<T>());
#else
        return mode != ClearMode.Never;
#endif
    }



    public void Dispose()
    {
        ReturnArrays();
        _size = 0;
        _lastIndex = 0;
        Count = 0;
        _freeList = -1;
        _version++;
    }


    public struct Slot
    {
        internal int hashCode;
        internal int next;
        internal T value;
        internal bool AlreadyUsed;
        public int index;
    }

    public struct Enumerator : IEnumerator<Slot>, IEnumerator
    {
        private readonly PooledSetEx<T> _set;
        private int _index;
        private readonly int _version;

        internal Enumerator(PooledSetEx<T> set)
        {
            _set = set;
            _index = 0;
            _version = set._version;
            Current = default;
        }

        void IDisposable.Dispose()
        {
        }

        public bool MoveNext()
        {
            while (_index < _set._lastIndex)
            {
                if (_set._slots[_index].hashCode >= 0)
                {
                    Current = _set._slots[_index];
                    _index++;
                    return true;
                }

                _index++;
            }

            _index = _set._lastIndex + 1;
            Current = default;
            return false;
        }

        public Slot Current { get; private set; }

        object IEnumerator.Current => Current;

        void IEnumerator.Reset()
        {
            _index = 0;
            Current = default;
        }
    }

    public IEnumerator<Slot> GetEnumerator()
    {
        return new Enumerator(this);
    }

    IEnumerator IEnumerable.GetEnumerator()
    {
        return new Enumerator(this);
    }
}