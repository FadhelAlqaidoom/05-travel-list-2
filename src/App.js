import React, { useState } from 'react';
import Logo from './components/Logo';
import Form from './components/Form';
import PackingList from './components/PackingList';
import Stats from './components/Stats';

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

export default App;
