import React from 'react';
import TableLoader from '@/components/banners/TableLoader';
import clsx from 'clsx';
import {renderCell, RenderTableHead} from '@/components/table/DataGrid';
import {MoreVertical} from 'react-feather';
import Button from '@/components/utils/Button';
import CustomPopover from "@/components/popover/CustomPopover";

const resolveActionValue = (value, row) => (
    typeof value === 'function' ? value(row) : value
);

const DataGridWithActions = ({data, columns, tHeadProps, isLoading, loader, actions, onSorting}) => {
    return (
        <div className="relative w-full overflow-x-auto">
            <table className="min-w-[780px] w-full border-separate border-spacing-0 text-left text-sm">
                <thead className="sticky top-0 z-[1] bg-white text-xs">
                <tr>
                    <RenderTableHead tHeadProps={tHeadProps} columns={columns} onSorting={onSorting}/>
                    <th className="border-b border-slate-200 bg-slate-50/80 px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500 first:rounded-tl-[18px] last:rounded-tr-[18px] sm:text-xs">
                        Action
                    </th>
                </tr>
                </thead>
                <tbody>
                {isLoading && (<tr
                    className="bg-white">
                    <td colSpan={columns.length + 1} className="px-4 py-10 text-center">{loader ||
                        <TableLoader columnLength={columns.length}/>}
                    </td>
                </tr>)}
                {isLoading || (data.length === 0 ?
                    <tr
                        className="bg-white">
                        <td colSpan={columns.length + 1} className="h-40 px-4 text-center text-sm text-slate-500">No Data Found</td>
                    </tr>
                    :
                    data.map((row, index) => (

                        <tr
                            className="bg-white transition hover:bg-slate-50/80"
                            key={`row-${index}`}>
                            {columns.map((column) => (
                                <td key={`row-cell-${column.key as React.Key}-${column.label}`}
                                    className={clsx('border-b border-slate-300 px-4 py-3.5 align-middle text-xs overflow-ellipsis text-slate-600 sm:text-sm', column.type=='description' && 'w-80', column.key ? 'table-cell' : 'flex justify-start')}>
                                    {column.key ? renderCell(column, row) : renderCell(column, column.customKey)}
                                </td>
                            ))}
                            <td className="whitespace-nowrap border-b border-slate-300 px-4 py-3.5 text-start text-xs font-medium sm:text-sm">
                                <CustomPopover title={<span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700"><MoreVertical size={18} color="currentColor"/></span>}>
                                    <div
                                        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_34px_rgba(15,23,42,0.12)]">
                                        <div
                                            className="relative grid gap-1 bg-white p-2">
                                            <span className="pl-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Actions</span>
                                            <ul className="mt-1 space-y-1">
                                                {actions.map((action, index) => {
                                                    const actionLabel = resolveActionValue(action.label, row);
                                                    const actionClassName = resolveActionValue(action.className, row);
                                                    const actionIcon = resolveActionValue(action.icon, row);

                                                    return (
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
                                                            {actionIcon && (
                                                                <span
                                                                    className="mr-2">{actionIcon}</span>
                                                            )}
                                                            <span className={clsx('font-medium', actionClassName || '')}>{actionLabel}</span>
                                                        </Button>
                                                    </li>)
                                                })}
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
