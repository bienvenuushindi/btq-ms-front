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
            const {product_items} = requisition;
            setOldItems(product_items.map((item => item.id)))
        }
    }, [requisition]);

    function reInitializeState() {
        setItems([])
        updateParams({q: ''})
        closeModal()
    }

    return (
        <ModalContainer isOpen={modalIsOpen} onRequestClose={reInitializeState}>
            <ModalContent>
                <ModalHeader closeModal={reInitializeState} title={'Add Product'}/>
                <ModalBody>
                    <div className={' focus-within:shadow-lg'}>
                        <SearchBar onSearch={updateParams}/>
                        <div>{url ?
                            <RequisitionProductSearchResults oldItems={oldItems}
                                                             url={url} setItems={setItems}/> :
                            <span>Enter your query</span>}</div>
                    </div>
                    {items.length > 0 && (
                        <div className="space-y-4 p-4 bg-gray-100 rounded-lg shadow-md">
                            <span className="block text-sm font-medium text-gray-700">
                                  {items.length} item(s)
                            </span>
                            <ul className="space-y-2 list-decimal list-inside">{itemsList}</ul>
                        </div>
                    )}
                </ModalBody>
                <ModalFooter closeModal={reInitializeState}>
                    <div className="flex items-center">
                        <Button type="button" variant="default" size="sm" onClick={handleSubmit}>
                            Add
                        </Button>
                    </div>
                </ModalFooter>
            </ModalContent>
        </ModalContainer>
    );
};

export default RequisitionModal;
