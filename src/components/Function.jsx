export default function Footer({ items }) {
  const checkedItems = items.filter((item) => item.checked).length;
  const totalItemsCount = items.length;
  const percentageChecked =
    totalItemsCount > 0
      ? ((checkedItems / totalItemsCount) * 100).toFixed(0)
      : 0;

  return (
    <footer className="stats">
      Ada {items.length} barang di daftar belanjaan, {checkedItems} barang sudah
      dibeli {percentageChecked}%
    </footer>
  );
}
