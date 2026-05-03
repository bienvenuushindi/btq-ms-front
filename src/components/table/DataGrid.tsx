import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Input from '@/components/forms/Input';
import Image from 'next/image';
import TableLoader from '@/components/banners/TableLoader';
import { ArrowDown, ArrowUp } from 'react-feather';
import {truncateDescription} from "@/lib/helper";
import {Button} from "@/components/ui/button";

const DataGrid = ({ data, columns, tHeadProps, isLoading, loader, onSorting }: { data:any, columns:any, tHeadProps:any, isLoading:any, loader?:any, onSorting?:any }) => {
  return (
    <div className="w-full  h-full ">
      <table className="w-full text-sm">
        <thead className="bg-[#1f4254] text-xs uppercase text-primary-foreground">
        <tr>
          <RenderTableHead tHeadProps={tHeadProps} columns={columns} onSorting={onSorting} />
        </tr>
        </thead>
        <tbody>
        {isLoading && (
          <tr>
            <td colSpan={columns.length} className="text-center">
              {loader || <TableLoader columnLength={columns.length} />}
            </td>
          </tr>
        )}
        {isLoading ||
          (data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center h-40">
                No Data Found
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                className=" border-b"
                key={`row-${index}`}
              >
                {columns.map((column,colIndex) => (
                  <td
                    key={`tr-${index}-td-${colIndex}-${column.key ? column.key : ''}`}
                    className={clsx(
                      'px-1 py-3',
                      column.key ? 'table-cell' : 'flex justify-start '
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
  if (value) {
    transformedValue = column.dataTransformation?.(value[column.key]) || value[column.key];
  } else {
    transformedValue = value[column.key];
  }

  if(column.appendTransformation){
    transformedValue = column.appendTransformation(value[column.key], value)
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
      return <Button size="sm" variant="secondary" onClick={() => column.action(value)}>{column.label}</Button>;
    case 'details':
      return <Button size="sm" variant="secondary" onClick={() => {
        column.action(value);
      }}>{column.label}</Button>;
    case 'picture':
      return (
        <div className="flex gap-1 items-center">
          <Image
            src={transformedValue}
            alt="Image"
            className="rounded-md border border-gray-100"
            width={60}
            height={60}
            priority
          />
          {/*<span>{column.label}</span>*/}
        </div>
      );
    case 'description':
      return (
          <span className="text-gray-500">
             {truncateDescription(transformedValue,100)}
          </span>
      )
    default:
      return <span className={clsx(['size', 'date' ,'total_price', 'shop_name', 'name', 'unit_price', 'box_price', 'dozen_price'].includes(column.key)? 'font-bold' : 'text-gray-500')}>{transformedValue}</span>;
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
          className="p-1"
          {...tHeadProps}
          key={`thead-${column.key as React.Key}-${column.label}`}
        >
          <div className="flex items-center justify-start">
            <span className=" text-white py-1 text-left font-medium  uppercase tracking-wider ">{column.label}</span>
            {column.sortable && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 rounded-none bg-transparent p-0 text-white shadow-none hover:bg-transparent focus-visible:bg-transparent"
                onClick={() => handleSort(column.key)}
              >
                {params.sort === column.key ? (
                  params.direction === 'asc' ? (
                    <ArrowUp size={12} color="#FFFFFF" />
                  ) : (
                    <ArrowDown size={12} color="#FFFFFF" />
                  )
                ) : (
                  <ArrowDown size={12} color="#FFFFFF"/>
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
