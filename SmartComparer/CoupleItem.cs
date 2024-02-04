using System.Text.Json;

namespace SmartComparer
{
    public class CoupleItem<T>
    {
        public CoupleItem((int, int) idx, T referenceItem, T targetItem)
        {
            ReferenceItem = referenceItem;
            TargetItem = targetItem;
            Idx = idx;
        }

        public (int, int) Idx { get; set; }

        public T ReferenceItem { get; set; }

        public T TargetItem { get; set; }

        public override string ToString() => JsonSerializer.Serialize(this);
    }
}
