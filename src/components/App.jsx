import { useState } from "react";

const groceryItems = [
  // {
  //   id: 1,
  //   name: "Kopi Bubuk",
  //   quantity: 2,
  //   checked: false,
  // },
  // {
  //   id: 2,
  //   name: "Gula Pasir",
  //   quantity: 5,
  //   checked: false,
  // },
  // {
  //   id: 3,
  //   name: "Air Mineral",
  //   quantity: 3,
  //   checked: false,
  // },
  // {
  //   id: 4,
  //   name: "Minyak",
  //   quantity: 10,
  //   checked: false,
  // },
];

export default function App() {
  const [items, setItems] = useState(groceryItems);

  function handleAddItem(item) {
    setItems([...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }

  function handleErase() {
    setItems([]);
  }

  return (
    <div className="app">
      <Header />
      <Form onAddItem={handleAddItem} onDeleteItem={handleDeleteItem} />

      <GroceryList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onEraseItem={handleErase}
      />
      <Footer items={items} />
    </div>
  );
}

function Header() {
  return <h1>Catatan Belanja Wafa 📝</h1>;
}

function Form({ onAddItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!name) return;

    const newItem = { name, quantity, checked: false, id: Date.now() };

    onAddItem(newItem);

    setName("");
    setQuantity(1);
  }
  const quantityNum = [...Array(20)].map((_, i) => (
    <option value={i + 1} key={i + 1}>
      {" "}
      {i + 1}{" "}
    </option>
  ));
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Hari ini belanja apa kita?</h3>

      <select
        value={quantity}
        onChange={(q) => setQuantity(Number(q.target.value))}
      >
        {" "}
        {quantityNum}
      </select>
      <input
        type="text"
        placeholder="nama barang..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button>Tambah</button>
    </form>
  );
}

function GroceryList({ items, onDeleteItem, onToggleItem, onEraseItem }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;
  // if (sortBy == 'input') {
  //   sortedItems = items;
  // }

  // if (sortBy === 'name') {
  //   sortedItems = items.slice().sort((a,b) => a.name.localeCompare(b.name));
  // }

  // if (sortBy === 'checked') {
  //   sortedItems = items.sort((a, b) => b.checked - a.checked);
  // }

  switch (sortBy) {
    case "input":
      sortedItems = items;
      break;
    case "name":
      sortedItems = items.slice().sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "checked":
      sortedItems = items.sort((a, b) => b.checked - a.checked);
      break;
    default:
      sortedItems = items;
      break;
  }

  return (
    <>
      <div className="list">
        <ul>
          {sortedItems.map((item) => (
            <Item
              item={item}
              key={item.id}
              onDeleteItem={onDeleteItem}
              onToggleItem={onToggleItem}
              onEraseItem={onEraseItem}
            />
          ))}
        </ul>
      </div>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Urut1kan berdasarkan urutan input</option>
          <option value="name">Urutkan berdasarkan nama barang</option>
          <option value="checked">Urutkan berdasarkan ceklis</option>
        </select>
        <button onClick={() => onEraseItem()}>Bersihkan Daftar</button>
      </div>
    </>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li key={item.id}>
      <input
        type="checkbox"
        checked={item.checked}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.checked ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.name}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>&times;</button>
    </li>
  );
}
function Footer({ items }) {
  const checkedItems = items.filter((item) => item.checked).length;
  return (
    <footer className="stats">
      Ada {items.length} barang di daftar belanjaan, {checkedItems} barang sudah
      dibeli ({((checkedItems / items.length) * 100).toFixed(0)}%)
    </footer>
  );
}
