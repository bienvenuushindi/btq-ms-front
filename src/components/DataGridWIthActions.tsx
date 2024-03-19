import React from 'react';
import TableLoader from '@/components/banners/TableLoader';
import clsx from 'clsx';
import {renderCell, RenderTableHead} from '@/components/DataGrid';
import {MoreVertical} from 'react-feather';
import Button from '@/components/Button';
import CustomPopover from "@/components/popover/CustomPopover";

const DataGridWithActions = ({data, columns, tHeadProps, isLoading, loader, actions, onSorting}) => {
    return (
        <div className="w-full relative">
            <table className="w-full text-sm text-left text-gray-500 -dark:text-gray-40 shadow-md ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 -dark:bg-gray-700 -dark:text-gray-400">
                <tr>
                    <RenderTableHead tHeadProps={tHeadProps} columns={columns} onSorting={onSorting}/>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sr-only">
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
                            className="bg-white border-b -dark:bg-gray-800 -dark:border-gray-700 hover:bg-gray-50 -dark:hover:bg-gray-600"
                            key={`row-${index}`}>
                            {columns.map((column) => (
                                <td key={`row-cell-${column.key as React.Key}-${column.label}`}
                                    className={clsx('px-1 py-3', column.key ? 'table-cell' : 'flex justify-start')}>
                                    {column.key ? renderCell(column, row) : renderCell(column, column.customKey)}
                                </td>
                            ))}
                            <td className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium">
                                <CustomPopover title={<MoreVertical size={20}/>}>
                                    <div
                                        className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                                        <div
                                            className="relative grid gap-1 bg-white p-1">
                                            <span className="text-lg font-semibold">Actions</span>
                                            <ul className="mt-2 space-y-2">
                                                {actions.map((action, index) => (
                                                    <li key={'action' + index}
                                                        className="flex items-center space-x-2">
                                                        <Button
                                                            size="small"
                                                            intent="text"
                                                            className="text-gray-600 hover:text-gray-800 flex items-center w-full"
                                                            onClick={() => {
                                                                action.onClick(row.id);
                                                            }}
                                                        >
                                                            {action.icon && (
                                                                <span
                                                                    className="text-gray-500">{action.icon}</span>
                                                            )}
                                                            {action.label}
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
