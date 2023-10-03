import Item from './Item';

import React from 'react';

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

export default PackingList;
