import React from 'react';
import clsx from 'clsx';
import Input from '@/components/Input';
import Button from '@/components/Button';

const DataGrid = <T, >({data, columns, tHeadProps}) => {
  return (
    <table className="w-full text-sm text-left text-gray-500 text-gray-400">
      <thead className="text-xs text-gray-700 uppercase   text-gray-400">
      <tr>
        {columns.map((column) => (
          <th scope="col" className="pr-6 py-3" {...tHeadProps}
              key={`thead-${column.key as React.Key}`}>{column.label}</th>
        ))}
      </tr>
      </thead>
      <tbody>

      {data.length === 0 ?
        <tr>
          <td colSpan={columns.length} className="text-center">No Data Found</td>
        </tr>
        :
        data.map((row, index) => (

          <tr className="bg-white border-b  border-gray-700" key={`row-${index}`}>
            {columns.map((column) => (
              <td key={`tbody-row-${column.key as React.Key}`}
                  className={column.key ? 'table-cell' : 'd-flex justify-content-end'}>
                {column.key ? renderCell(column, row) : renderCell(column, column.customKey)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const renderCell = (column, value: any) => {
  if (column.type === 'custom') {
    return column.customComponent;
  }
  const transformedValue = value.attributes && (column.dataTransformation?.(value.attributes[column.key]) || value.attributes[column.key]) || value[column.key];

  switch (column.type) {
    case 'text':
      return <span>{transformedValue}</span>;
    case 'radio':
      return (
        column.options.map((option, index) => <>
          <label>{option}</label>
          <Input
            key={option}
            type="radio"
            name={column.name}
            value={option}
            onChange={column.action}
            className={
              clsx('border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full ', column.className)
            }/>
        </>));
    case 'checkbox':
      return <Input
        checked={transformedValue}
        type="checkbox"
        className={
          clsx('border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full ', column.className)
        }
        onChange={column.action}/>;
    case 'button':
      return <Button size="sm" variant="outline" onClick={()=>column.action(value)}>{column.label}</Button>;
    case 'details':
      return <Button size="sm" variant="outline" onClick={() => {
        column.action(value);
      }}>{column.label}</Button>;
    default:
      return null;
  }
};

export default DataGrid;