'use client';

import React from 'react';
import {Plus} from 'react-feather';
import {useModal, useRequisitionForm} from '@/components/requisitions/hooks';
import RequisitionModal from "@/components/requisitions/RequisitionModal";
import Button from "@/components/Button";


export default function RequisitionForm({requisitionID, revalidate}) {
    const {modalIsOpen, openModal, closeModal} = useModal();
    const {items, setItems, url, updateParams, error, handleSubmit} = useRequisitionForm({
        requisitionID,
        revalidate,
        closeModal,
    });

    const itemsList = items.map((item, index) => (
        <li key={item.id}>
            {index}
            {item.name}
        </li>
    ));

    return (
        <>
            <div className="flex gap-2">
                <Button onClick={() => openModal()} size="small"
                        intent={'primary'}
                        className="px-3 py-2 rounded-md flex items-center space-x-1">
                    <Plus
                        size={20}
                        color={'#FFFFFF'}
                    /> Add Products
                </Button>
            </div>

            <RequisitionModal
                modalIsOpen={modalIsOpen}
                closeModal={closeModal}
                updateParams={updateParams}
                url={url}
                items={items}
                itemsList={itemsList}
                setItems={setItems}
                handleSubmit={handleSubmit}
            />
        </>
    );
}

