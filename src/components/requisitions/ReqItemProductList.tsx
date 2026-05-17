'use client'
import React, {useContext, useEffect, useState} from 'react';
import {deleteItem} from '@/lib/api';
import DeleteAlert from '@/components/DeleteAlert';
import ContainerOne from '@/components/utils/wrappers/ContainerOne';
import ReqProductItem from '@/components/requisitions/ReqProductItem';
import Card from '@/components/utils/wrappers/Card';
import Text from "@/components/Text";
import {RequisitionContext} from "@/components/requisitions/RequisitionContext";
import {isPurchasedStatus} from '@/lib/helper';

const statusFilters = [
    {key: 'all', label: 'All'},
    {key: 'pending', label: 'Pending'},
    {key: 'purchased', label: 'Purchased'},
];

export default function ReqItemProductList({details, revalidate}) {
    const {requisitionID, requisition} = useContext(RequisitionContext)
    const isArchived = Boolean(requisition?.archived);
    const [data, setData] = useState(details);
    const [statusFilter, setStatusFilter] = useState('all');
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    useEffect(() => {
        setData(details);
    }, [details]);
    const filteredData = data.filter((item) => {
        const purchased = isPurchasedStatus(item?.status);
        if (statusFilter === 'purchased') return purchased;
        if (statusFilter === 'pending') return !purchased;
        return true;
    });
    const filterCounts = data.reduce((counts, item) => {
        if (isPurchasedStatus(item?.status)) counts.purchased += 1;
        else counts.pending += 1;
        counts.all += 1;
        return counts;
    }, {all: 0, pending: 0, purchased: 0});
    const handleCancelDelete = () => {
        setShowDeleteAlert(false);
    };
    const handleConfirmDelete = async () => {
        const newList = data.filter((item: { product_detail_id: any; }) => item.product_detail_id != itemToDelete)
        await deleteItem('/requisitions/' + requisitionID + '/product_details/' + itemToDelete + '/remove_item');
        setData(newList);
        await revalidate?.();
        setShowDeleteAlert(false);
    };
    const removeItem = async (id) => {
        setShowDeleteAlert(true);
        setItemToDelete(id);
    };
    return (
        <ContainerOne>
            <Card className='w-full rounded-[26px] border-slate-200/90 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]'>
                <div className="flex flex-col gap-2 border-b border-slate-200 pb-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">Line items</p>
                        <Text intent="tertiary" size="large" className="text-lg font-extrabold md:text-xl">Items in this requisition</Text>
                        <p className="mt-1 text-xs text-slate-500 md:text-sm">
                            {isArchived
                                ? 'Open any row to review supplier, pricing, quantity, expiration date, and notes.'
                                : 'Open any row to update supplier, pricing, quantity, expiration date, and notes.'}
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        {statusFilters.map((filter) => {
                            const active = statusFilter === filter.key;
                            return (
                                <button
                                    key={filter.key}
                                    type="button"
                                    onClick={() => setStatusFilter(filter.key)}
                                    className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                                        active
                                            ? 'border-blue-600 bg-blue-600 text-white'
                                            : 'border-slate-200 bg-slate-100 text-slate-700 hover:border-slate-300 hover:bg-white'
                                    }`}
                                >
                                    {filter.label} {filterCounts[filter.key]}
                                </button>
                            );
                        })}
                    </div>
                </div>
                {data.length === 0 ? (
                    <div className="flex min-h-[180px] items-center justify-center rounded-[20px] border border-dashed border-slate-200 bg-slate-50/70 px-6 py-8 text-center">
                        <div>
                            <p className="text-base font-semibold text-slate-900">No products in this requisition yet</p>
                            <p className="mt-2 text-xs text-slate-500 md:text-sm">Use the add action above to start building this requisition.</p>
                        </div>
                    </div>
                ) : filteredData.length === 0 ? (
                    <div className="flex min-h-[160px] items-center justify-center rounded-[20px] border border-dashed border-slate-200 bg-slate-50/70 px-6 py-8 text-center">
                        <div>
                            <p className="text-base font-semibold text-slate-900">No {statusFilter} items</p>
                            <p className="mt-2 text-xs text-slate-500 md:text-sm">Use another status filter to view the rest of this requisition.</p>
                        </div>
                    </div>
                ) : (
                <ul className="space-y-3 py-4">
                    {filteredData.map((row: { isOpen: boolean; id: React.Key; }) => {
                        row.isOpen = false;
                        return <li key={row.id}
                                   className="rounded-[22px] border border-slate-200 bg-slate-50/70 p-2 shadow-[0_8px_18px_rgba(15,23,42,0.03)]">
                            <ReqProductItem
                                row={row}
                                removeItem={removeItem}
                            />
                        </li>;
                    })}
                </ul>
                )}
            </Card>
            {showDeleteAlert && (
                <DeleteAlert
                    onCancel={handleCancelDelete}
                    onDelete={handleConfirmDelete}
                    show={showDeleteAlert}
                    message="Are you sure you want to remove
              this product?"
                />
            )}
        </ContainerOne>
    )
}
