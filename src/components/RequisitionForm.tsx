'use client';
import React, {useContext} from 'react';
import {Plus} from 'react-feather';
import {useModal, useRequisitionForm} from '@/components/requisitions/hooks';
import RequisitionModal from "@/components/requisitions/RequisitionModal";
import {Button} from "@/components/ui/button";
import {RequisitionContext} from "@/components/requisitions/RequisitionContext";

export default function RequisitionForm({requisitionID, revalidate}) {
    const {mutate} = useContext(RequisitionContext)
    const {modalIsOpen, openModal, closeModal} = useModal();
    const props = useRequisitionForm({
        requisitionID,
        revalidate,
        closeModal,
    });
    const itemsList = props.items.map((item, index) => (
        <li
            key={`selected-item-${item.id}`}
            className="text-gray-800 flex items-center gap-2 bg-white p-2  border-b transition-shadow"
        >
            <span className="font-semibold">{index + 1}.</span>
            <span className="flex-grow">{item.name}</span>
        </li>
    ));

    return (
        <>
            <div className="flex gap-2">
                <Button onClick={() => openModal()} size="sm"
                        variant={'default'}
                        className="px-3 py-2 rounded-md flex items-center space-x-1">
                    <Plus
                        size={20}
                        color={'#FFFFFF'}
                    /> Add Products
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

