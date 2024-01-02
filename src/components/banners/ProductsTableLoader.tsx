import React from 'react';

const ProductsTableLoader = () => {
  const generatePlaceholderRows = () => {
    return Array.from({ length: 8 }).map((_, rowIndex) => (
      <tr key={`row-${rowIndex}`} className='flex items-center justify-around  '>
        <td className="p-2 flex-grow ">
          <div className="h-16 w-full bg-gray-200 animate-pulse rounded"></div>
        </td>
        <td className="p-2 flex-grow ">
          <div className="h-4 w-full bg-gray-200 animate-pulse rounded-lg"></div>
        </td>
        <td className="p-2 flex-grow ">
          <div className="h-4 w-full bg-gray-200 animate-pulse rounded-lg"></div>
        </td>
        <td className="p-2 flex-grow ">
          <div className="h-4 w-full bg-gray-200 animate-pulse rounded-full"></div>
        </td>
        <td className="p-2 flex-grow ">
          <div className="h-4 w-full bg-gray-200 animate-pulse rounded-lg"></div>
        </td>
        <td className="p-2 flex-grow ">
          <div className="h-10 w-full  bg-gray-200 animate-pulse rounded-lg"></div>
        </td>
      </tr>
    ));
  };

  return (
    <div className="sticky top-0 bg-white p-4 shadow-lg">
      {/*<div className="font-bold text-xl mb-4">Loading...</div>*/}
      <table className="w-full  table-">
        <tbody>{generatePlaceholderRows()}</tbody>
      </table>
    </div>
  );
};

export default ProductsTableLoader;
