import React from 'react';

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

export default Stats;
