import React from 'react';
import TableLoader from '@/components/banners/TableLoader';
import clsx from 'clsx';
import {renderCell, RenderTableHead} from '@/components/table/DataGrid';
import {MoreVertical} from 'react-feather';
import Button from '@/components/utils/Button';
import CustomPopover from "@/components/popover/CustomPopover";

const DataGridWithActions = ({data, columns, tHeadProps, isLoading, loader, actions, onSorting}) => {
    return (
        <div className="w-full relative ">
            <table className="w-full text-sm text-left  -dark:text-gray-40">
                <thead className="bg-[#1f4254] text-xs uppercase text-primary-foreground">
                <tr>
                    <RenderTableHead tHeadProps={tHeadProps} columns={columns} onSorting={onSorting}/>
                    <th className=" py-2  text-left text-xs font-medium text-white uppercase tracking-wider ">
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody>
                {isLoading && (<tr
                    className="bg-white border-b -dark:bg-gray-800 -dark:border-gray-700 hover:bg-gray-50 -dark:hover:bg-gray-600">
                    <td colSpan={columns.length} className="text-center">{loader ||
                        <TableLoader columnLength={columns.length}/>}
                    </td>
                </tr>)}
                {isLoading || (data.length === 0 ?
                    <tr
                        className="bg-white border-b -dark:bg-gray-800 -dark:border-gray-700 hover:bg-gray-50 -dark:hover:bg-gray-600">
                        <td colSpan={columns.length} className="text-center">No Data Found</td>
                    </tr>
                    :
                    data.map((row, index) => (

                        <tr
                            className="bg-white border-b border-b-gray-600 -dark:bg-gray-800 -dark:border-gray-700 hover:bg-gray-50 -dark:hover:bg-gray-600"
                            key={`row-${index}`}>
                            {columns.map((column) => (
                                <td key={`row-cell-${column.key as React.Key}-${column.label}`}
                                    className={clsx('px-1 py-3 overflow-ellipsis', column.type=='description' && 'w-80', column.key ? 'table-cell' : 'flex justify-start')}>
                                    {column.key ? renderCell(column, row) : renderCell(column, column.customKey)}
                                </td>
                            ))}
                            <td className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium">
                                <CustomPopover title={<MoreVertical size={20} color="#0f172a"/>}>
                                    <div
                                        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_34px_rgba(15,23,42,0.12)]">
                                        <div
                                            className="relative grid gap-1 bg-white p-2">
                                            <span className="pl-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Actions</span>
                                            <ul className="mt-1 space-y-1">
                                                {actions.map((action, index) => (
                                                    <li key={'action' + index}
                                                        className="border-t border-slate-100 first:border-t-0">
                                                        <Button
                                                            size="small"
                                                            intent="text"
                                                            className="mt-1 flex w-full items-center rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                                                            onClick={() => {
                                                                action.onClick(row);
                                                            }}
                                                        >
                                                            {action.icon && (
                                                                <span
                                                                    className="mr-2">{action.icon}</span>
                                                            )}
                                                            <span className={clsx('font-medium', action.className || '')}>{action.label}</span>
                                                        </Button>
                                                    </li>))}
                                            </ul>
                                        </div>
                                    </div>
                                </CustomPopover>
                            </td>
                        </tr>
                    )))}
                </tbody>

            </table>
        </div>
    );
};

export default DataGridWithActions;
