import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Image from 'next/image';
import TableLoader from '@/components/banners/TableLoader';
import { ArrowDown, ArrowUp } from 'react-feather';

const DataGrid = ({ data, columns, tHeadProps, isLoading, loader, onSorting }: { data:any, columns:any, tHeadProps:any, isLoading:any, loader?:any, onSorting?:any }) => {
  return (
    <div className="w-full relative">
      <table className="w-full text-sm text-left text-gray-500 -dark:text-gray-40">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 -dark:bg-gray-700 -dark:text-gray-400">
        <tr>
          <RenderTableHead tHeadProps={tHeadProps} columns={columns} onSorting={onSorting} />
        </tr>
        </thead>
        <tbody>
        {isLoading && (
          <tr className="bg-white border-b -dark:bg-gray-800 -dark:border-gray-700 hover:bg-gray-50 -dark:hover:bg-gray-600">
            <td colSpan={columns.length} className="text-center">
              {loader || <TableLoader columnLength={columns.length} />}
            </td>
          </tr>
        )}
        {isLoading ||
          (data.length === 0 ? (
            <tr className="bg-white border-b -dark:bg-gray-800 -dark:border-gray-700 hover:bg-gray-50 -dark:hover:bg-gray-600">
              <td colSpan={columns.length} className="text-center">
                No Data Found
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                className="bg-white border-b -dark:bg-gray-800 -dark:border-gray-700 hover:bg-gray-50 -dark:hover:bg-gray-600"
                key={`row-${index}`}
              >
                {columns.map((column) => (
                  <td
                    key={`tbody-row-${column.key as React.Key}-${column.label}`}
                    className={clsx(
                      'px-1 py-4',
                      column.key ? 'table-cell' : 'd-flex justify-content-end'
                    )}
                  >
                    {column.key ? renderCell(column, row) : renderCell(column, column.customKey)}
                  </td>
                ))}
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};
export const renderCell = (column, value: any) => {
  if (column.type === 'custom') {
    return column.customComponent;
  }
  let transformedValue;
  if (value.attributes) {
    transformedValue = column.dataTransformation?.(value.attributes[column.key]) || value.attributes[column.key];
  } else {
    transformedValue = value[column.key];
  }

  if(column.appendTransformation){
    transformedValue = column.appendTransformation(value.attributes[column.key], value.attributes)
  }
  switch (column.type) {
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
      return <Button size="small" intent="primary" onClick={() => column.action(value)}>{column.label}</Button>;
    case 'details':
      return <Button size="small" intent="secondary" onClick={() => {
        column.action(value);
      }}>{column.label}</Button>;
    case 'picture':
      return (
        <div className="flex gap-1 items-center">
          <Image
            src={transformedValue}
            alt="Image"
            className="rounded-md border border-gray-100"
            width={48}
            height={48}
            priority
          />
          {/*<span>{column.label}</span>*/}
        </div>
      );
    default:
      return <span>{transformedValue}</span>;
  }
};
export const RenderTableHead = ({ columns, onSorting, tHeadProps }) => {
  const [params, setParams] = useState({ direction: 'desc', sort: 'created_at' });
  const handleSort = (column) => {
    let direction = 'asc';
    if (params.sort === column) {
      direction = params.direction === 'asc' ? 'desc' : 'asc';
    }
    setParams({ sort: column, direction });
    onSorting({ sort: column, direction });
  };

  return (
    <>
      {columns.map((column) => (
        <th
          scope="col"
          className="px-1 py-3"
          {...tHeadProps}
          key={`thead-${column.key as React.Key}-${column.label}`}
        >
          <div className="flex items-center justify-between">
            <span>{column.label}</span>
            {column.sortable && (
              <Button
                intent="none"
                className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
                onClick={() => handleSort(column.key)}
              >
                {params.sort === column.key ? (
                  params.direction === 'asc' ? (
                    <ArrowUp size={16} />
                  ) : (
                    <ArrowDown size={16} />
                  )
                ) : (
                  <ArrowDown size={16} />
                )}
              </Button>
            )}
          </div>
        </th>
      ))}
    </>
  );
};

export default DataGrid;