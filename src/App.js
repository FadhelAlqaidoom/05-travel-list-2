import React, { useState } from 'react';

const App = () => {
  const [items, setItems] = useState([
    { id: 1, description: 'Passports', quantity: 2, packed: false },
    { id: 2, description: 'Socks', quantity: 12, packed: false },
  ]);
  const [sortBy, setSortBy] = useState('input');

  const sortList = (items, sortBy, setItems) => {
    let sortedList = [...items];
    if (sortBy === 'input') {
      sortedList.sort((a, b) => a.id - b.id);
    } else if (sortBy === 'name') {
      sortedList.sort((a, b) =>
        a.description[0]
          .toLowerCase()
          .localeCompare(b.description[0].toLowerCase())
      );
    } else {
      sortedList.sort((a, b) => b.packed - a.packed);
    }
    setItems(sortedList);
  };
  return (
    <div className="app">
      <Logo />
      <Form
        items={items}
        setItems={setItems}
        sortBy={sortBy}
        sortList={sortList}
      />
      <PackingList
        items={items}
        setItems={setItems}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortList={sortList}
      />
      <Stats items={items} />
    </div>
  );
};

const Logo = () => {
  return <h1>FAR AWAY</h1>;
};

const Form = ({ items, setItems, sortBy, sortList }) => {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };
    const newItems = [...items, newItem];
    setItems(newItems);
    sortList(newItems, sortBy, setItems);
    setDescription('');
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

const PackingList = ({
  items,
  setItems,
  sortBy,
  setSortBy,
  sortList,
}) => {
  const clearList = (items) => {
    setItems([]);
  };
  const removeItem = (idToRemove) => {
    const filteredItems = items.filter(
      (item) => item.id !== idToRemove
    );
    setItems(filteredItems);
  };
  const onChangePacked = (idToPackedItem) => {
    const updatedItems = items.map((item) => {
      if (item.id === idToPackedItem) {
        return { ...item, packed: !item.packed };
      }
      return item;
    });
    setItems(updatedItems);
  };
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            removeItem={removeItem}
            onChangePacked={onChangePacked}
          />
        ))}
      </ul>
      <div className="actions">
        <select
          value={sortBy}
          onChange={(e) => {
            const newSortBy = e.target.value;
            setSortBy(newSortBy);
            sortList(items, newSortBy, setItems); // Notice the extra parameters
          }}
        >
          <option value="input">sort by input order</option>
          <option value="name">sort by name</option>
          <option value="packed">sort by packed status</option>
        </select>
        <button onClick={() => clearList(items)}>CLEAR LIST</button>
      </div>
    </div>
  );
};

const Item = ({ item, removeItem, onChangePacked }) => {
  return (
    <li>
      <span
        style={item.packed ? { textDecoration: 'line-through' } : {}}
      >
        <input
          type="checkbox"
          onChange={() => onChangePacked(item.id)}
        />{' '}
        {item.quantity} {item.description}
      </span>
      <button onClick={() => removeItem(item.id)}>❌</button>
    </li>
  );
};

const Stats = ({ items }) => {
  // const itemsPacked = (items) => {
  //   let packed = 0;
  //   items.forEach((item) => {
  //     if (item.packed === true) packed = packed + 1;
  //   });
  //   return packed; // Returning the count
  // };
  // const packed = itemsPacked;

  const itemsPacked = items.filter((item) => item.packed).length;
  const percentage = ((itemsPacked / items.length) * 100).toFixed(2);
  return (
    <footer className="stats">
      <em>
        {Number(percentage) === 100
          ? 'You got everything! Ready to go!'
          : `Your have ${
              items.length
            } items on your list, and you already
        packed ${itemsPacked} (${
              items.length === 0 ? '0.00' : percentage
            }
        %)`}
      </em>
    </footer>
  );
};

export default App;
