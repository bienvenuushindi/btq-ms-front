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
    <div className="h-full w-full overflow-x-auto">
      <table className="min-w-[720px] w-full border-separate border-spacing-0 text-sm">
        <thead className="sticky top-0 z-[1] bg-white text-xs">
        <tr>
          <RenderTableHead tHeadProps={tHeadProps} columns={columns} onSorting={onSorting} />
        </tr>
        </thead>
        <tbody>
        {isLoading && (
          <tr className="bg-white">
            <td colSpan={columns.length} className="px-4 py-10 text-center">
              {loader || <TableLoader columnLength={columns.length} />}
            </td>
          </tr>
        )}
        {isLoading ||
          (data.length === 0 ? (
            <tr className="bg-white">
              <td colSpan={columns.length} className="h-40 px-4 text-center text-sm text-slate-500">
                No Data Found
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                className="bg-white transition hover:bg-slate-50/80"
                key={`row-${index}`}
              >
                {columns.map((column,colIndex) => (
                  <td
                    key={`tr-${index}-td-${colIndex}-${column.key ? column.key : ''}`}
                    className={clsx(
                      'border-b border-slate-300 px-4 py-3.5 align-middle text-xs text-slate-600 sm:text-sm',
                      index === 0 && 'first:rounded-tl-[18px] last:rounded-tr-[18px]',
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
    transformedValue = column.dataTransformation?.(value[column.key], value) || value[column.key];
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
        <div className="flex items-center">
          <Image
            src={transformedValue}
            alt="Image"
            className="h-9 w-9 rounded-full border border-slate-200 bg-white object-cover"
            width={36}
            height={36}
            priority
          />
        </div>
      );
    case 'description':
      return (
          <span className="text-slate-500">
             {truncateDescription(transformedValue,100)}
          </span>
      )
    default:
      return <span className={clsx(['size', 'date' ,'total_price', 'shop_name', 'name', 'unit_price', 'box_price', 'dozen_price'].includes(column.key)? 'font-semibold text-slate-900' : 'text-slate-500')}>{transformedValue}</span>;
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
          className="border-b border-slate-200 bg-slate-50/80 px-4 py-3 text-left first:rounded-tl-[18px] last:rounded-tr-[18px]"
          {...tHeadProps}
          key={`thead-${column.key as React.Key}-${column.label}`}
        >
          <div className="flex items-center justify-start gap-1.5">
            <span className="py-1 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500 sm:text-xs">{column.label}</span>
            {column.sortable && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 rounded-full bg-transparent p-0 text-slate-400 shadow-none hover:bg-slate-100 hover:text-slate-600 focus-visible:bg-slate-100"
                onClick={() => handleSort(column.key)}
              >
                {params.sort === column.key ? (
                  params.direction === 'asc' ? (
                    <ArrowUp size={12} color="#64748b" />
                  ) : (
                    <ArrowDown size={12} color="#64748b" />
                  )
                ) : (
                  <ArrowDown size={12} color="#cbd5e1"/>
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
