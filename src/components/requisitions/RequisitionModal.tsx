'use client'
// File: "RequisitionModal.js"
import React, {useContext, useEffect, useState} from 'react';
import ModalContainer from '@/components/modal/ModalContainer';
import ModalContent from '@/components/modal/ModalContent';
import ModalHeader from '@/components/modal/ModalHeader';
import ModalBody from '@/components/modal/ModalBody';
import ModalFooter from '@/components/modal/ModalFooter';
import {SearchBar} from "@/components/SearchBar";
import RequisitionProductSearchResults from "@/components/requisitions/RequisitionProductSearchResults";
import {RequisitionContext} from "@/components/requisitions/RequisitionContext";
import {Button} from "@/components/ui/button";
import {Minus} from 'react-feather';

const RequisitionModal = ({
                              modalIsOpen,
                              updateParams,
                              closeModal,
                              url,
                              items,
                              setItems,
                              itemsList,
                              handleSubmit,
                          }) => {

    const {requisition} = useContext(RequisitionContext)
    const [oldItems, setOldItems] = useState([])

    useEffect(() => {
        if (requisition) {
            const productItems = Array.isArray(requisition.product_items) ? requisition.product_items : [];
            setOldItems(productItems.map((item => item.id)))
        }
    }, [requisition]);

    function reInitializeState() {
        setItems([])
        updateParams({q: ''})
        closeModal()
    }

    const removePendingItem = (itemId) => {
        setItems((prev) => prev.filter((item) => item.id !== itemId));
    };

    return (
        <ModalContainer isOpen={modalIsOpen} onRequestClose={reInitializeState}>
            <ModalContent>
                <ModalHeader closeModal={reInitializeState} title={'Add Items to Requisition'}/>
                <ModalBody>
                    <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
                        <SearchBar onSearch={updateParams}/>
                        <div className="mt-4">{url ?
                            <RequisitionProductSearchResults oldItems={oldItems}
                                                             url={url} setItems={setItems} items={items}/> :
                            <span className="text-sm text-slate-500">Search for products to add to this requisition.</span>}</div>
                    </div>
                    {items.length > 0 && (
                        <div className="space-y-4 rounded-[24px] border border-slate-200 bg-orange-50/50 p-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
                            <span className="block text-sm font-medium text-slate-700">
                                  {items.length} item(s) selected
                            </span>
                            <ul className="space-y-2">
                                {items.map((item, index) => (
                                    <li key={item.id} className="flex items-center justify-between gap-3 rounded-2xl border border-orange-100 bg-white px-3 py-2">
                                        <div className="min-w-0 flex-1">
                                            {itemsList?.[index] || (
                                                <span className="text-sm font-medium text-slate-700">{item.name}</span>
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removePendingItem(item.id)}
                                            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-amber-200 bg-amber-50 text-amber-700 transition hover:border-amber-300 hover:bg-amber-100"
                                            aria-label={`Remove ${item.name}`}
                                            title={`Remove ${item.name}`}
                                        >
                                            <Minus size={16} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </ModalBody>
                <ModalFooter closeModal={reInitializeState}>
                    <div className="flex items-center">
                        <Button type="button" variant="default" size="sm" onClick={handleSubmit} className="oasis-button rounded-2xl px-4 py-2">
                            Add to Requisition
                        </Button>
                    </div>
                </ModalFooter>
            </ModalContent>
        </ModalContainer>
    );
};

export default RequisitionModal;
