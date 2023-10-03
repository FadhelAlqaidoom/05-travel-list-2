import React from 'react';

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

export default Item;
