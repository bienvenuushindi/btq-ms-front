'use client';
import React, {useContext} from 'react';
import {Plus} from 'react-feather';
import {useModal, useRequisitionForm} from '@/components/requisitions/hooks';
import RequisitionModal from "@/components/requisitions/RequisitionModal";
import {Button} from "@/components/ui/button";
import {RequisitionContext} from "@/components/requisitions/RequisitionContext";

export default function RequisitionForm({requisitionID, revalidate}) {
    const {requisition} = useContext(RequisitionContext)
    const isArchived = Boolean(requisition?.archived);
    const {modalIsOpen, openModal, closeModal} = useModal();
    const props = useRequisitionForm({
        requisitionID,
        revalidate,
        closeModal,
    });
    const itemsList = props.items.map((item, index) => (
        <li
            key={`selected-item-${item.id}`}
            className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-[0_6px_14px_rgba(15,23,42,0.04)] transition-shadow"
        >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-primary">{index + 1}</span>
            <span className="flex-grow">{item.name}</span>
        </li>
    ));

    return (
        <>
            <div className="flex gap-2">
                <Button onClick={() => openModal()} size="sm"
                        variant={'default'}
                        disabled={isArchived}
                        title={isArchived ? 'Archived requisitions are view only' : 'Add items'}
                        className="oasis-button flex items-center space-x-1 rounded-2xl px-4 py-3">
                    <Plus
                        size={20}
                        color={'#FFFFFF'}
                    /> Add Items
                </Button>
            </div>

            <RequisitionModal
                modalIsOpen={modalIsOpen}
                itemsList={itemsList}
                closeModal={closeModal}
                {...props}
            />
        </>
    );
}
