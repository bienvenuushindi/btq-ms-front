'use client';
// External libraries
import React from 'react';
import {Plus} from 'react-feather';
// Components
import Button from './Button';
import {SearchBar} from '@/components/SearchBar';
import ProductSearchResults from '@/components/products/ProductSearchResults';
import ModalContent from '@/components/modal/ModalContent';
import ModalHeader from '@/components/modal/ModalHeader';
import ModalBody from '@/components/modal/ModalBody';
import ModalFooter from '@/components/modal/ModalFooter';
import ModalContainer from '@/components/modal/ModalContainer';
import { useModal, useRequisitionForm } from '@/components/requisitions/hooks';


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

            <ModalContainer
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
            >
                <ModalContent>
                    <ModalHeader closeModal={closeModal} title={'Add Product'}/>
                    <ModalBody>
                        <div className={' focus-within:shadow-lg'}>
                            <SearchBar onSearch={updateParams}/>
                            <div>
                                {
                                    (url ? <ProductSearchResults url={url} setItems={setItems}/> :
                                        <span>Enter your query</span>)
                                }
                            </div>
                        </div>
                        {items.length === 0
                            ? ''
                            : <div>
                                <span>{items.length} item(s)</span>
                                <ul>
                                    {itemsList}
                                </ul>
                            </div>}
                    </ModalBody>
                    <ModalFooter closeModal={closeModal}>
                        <div className="flex items-center">
                            <Button type="button" onClick={handleSubmit}>Add </Button>
                        </div>
                    </ModalFooter>
                </ModalContent>

            </ModalContainer>
        </>
    );
}

