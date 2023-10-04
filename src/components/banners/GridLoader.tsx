import React from 'react';

const GridLoader = ({ rows = 3, cols = 1, height = 4, className= '' }) => {
  const generateItems = (rowCount, colCount, itemHeight) => {
    const rowItems = [];
    for (let i = 0; i < rowCount; i++) {
      for (let j = 0; j < colCount; j++) {
        rowItems.push(
          <div
            key={`item-${i}-${j}`}
            className={`animate-pulse bg-gray-200 h-${itemHeight} mb-2`}
          />
        );
      }
    }
    return rowItems;
  };

  return (
    <div className={`grid grid-rows-${rows} grid-cols-1 gap-4 md:grid-cols-${cols} md:gap-4 ${className}`}>
      {generateItems(rows, cols, height)}
    </div>
  );
};


export default GridLoader;