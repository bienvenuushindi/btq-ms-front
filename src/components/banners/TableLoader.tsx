import React from 'react';

const TableLoader = ({columnLength}) => {
  const generatePlaceholderRows = () => {
    return Array.from({length: 10}).map((_, rowIndex) => (
      <tr key={`row-${rowIndex}`} className="flex items-center justify-around">
        {Array.from({length: columnLength}).map((_, cellIndex) => (
          <td className="p-2 flex-grow" key={`cell-${rowIndex}-${cellIndex}`}>
            <div className="h-6 w-full bg-gray-200 animate-pulse rounded"></div>
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="sticky top-0 bg-white p-4 shadow-lg">
      <table className="w-full">
        <tbody>{generatePlaceholderRows()}</tbody>
      </table>
    </div>
  );
};

export default TableLoader;
