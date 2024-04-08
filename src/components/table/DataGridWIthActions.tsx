import React from 'react';
import TableLoader from '@/components/banners/TableLoader';
import clsx from 'clsx';
import {renderCell, RenderTableHead} from '@/components/table/DataGrid';
import {MoreVertical} from 'react-feather';
import Button from '@/components/utils/Button';
import CustomPopover from "@/components/popover/CustomPopover";
import {className} from "postcss-selector-parser";

const DataGridWithActions = ({data, columns, tHeadProps, isLoading, loader, actions, onSorting}) => {
    return (
        <div className="w-full relative ">
            <table className="w-full text-sm text-left  -dark:text-gray-40">
                <thead className="text-xs bg-lightBlue-100 uppercase -dark:bg-gray-700 -dark:text-gray-400">
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
                                        className="overflow-hidden rounded-lg shadow-md ring-1 ring-black/5">
                                        <div
                                            className="relative grid gap-1 bg-white p-1">
                                            <span className="text-lg text-gray-500 pl-2">Actions</span>
                                            <ul className="mt-1 space-y-2 ">
                                                {actions.map((action, index) => (
                                                    <li key={'action' + index}
                                                        className="flex items-center space-x-2 border-t border-gray-200 px-2">
                                                        <Button
                                                            size="small"
                                                            intent="text"
                                                            className="text-gray-500 hover:text-gray-800 flex items-center w-full px-2 mt-1"
                                                            onClick={() => {
                                                                action.onClick(row.id);
                                                            }}
                                                        >
                                                            {action.icon && (
                                                                <span
                                                                    className="mr-2">{action.icon}</span>
                                                            )}
                                                            <span className={clsx(action.className || '')}>{action.label}</span>
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
