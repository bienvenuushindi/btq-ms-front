// File: "RequisitionModal.js"
import React from 'react';
import ModalContainer from '@/components/modal/ModalContainer';
import ModalContent from '@/components/modal/ModalContent';
import ModalHeader from '@/components/modal/ModalHeader';
import ModalBody from '@/components/modal/ModalBody';
import ModalFooter from '@/components/modal/ModalFooter';
import {SearchBar} from "@/components/SearchBar";
import Button from "@/components/Button";
import ProductSearchResults from "@/components/products/ProductSearchResults"; // Adjust the import based on your project structure

const RequisitionModal = ({
                              modalIsOpen,
                              closeModal,
                              updateParams,
                              url,
                              items,
                              setItems,
                              itemsList,
                              handleSubmit,
                          }) => {
    return (
        <ModalContainer isOpen={modalIsOpen} onRequestClose={closeModal}>
            <ModalContent>
                <ModalHeader closeModal={closeModal} title={'Add Product'}/>
                <ModalBody>
                    <div className={' focus-within:shadow-lg'}>
                        <SearchBar onSearch={updateParams}/>
                        <div>{url ? <ProductSearchResults url={url} setItems={setItems}/> :
                            <span>Enter your query</span>}</div>
                    </div>
                    {items.length === 0 && (
                        <div>
                            <span>{items.length} item(s)</span>
                            <ul>{itemsList}</ul>
                        </div>
                    )}
                </ModalBody>
                <ModalFooter closeModal={closeModal}>
                    <div className="flex items-center">
                        <Button type="button" onClick={handleSubmit}>
                            Add
                        </Button>
                    </div>
                </ModalFooter>
            </ModalContent>
        </ModalContainer>
    );
};

export default RequisitionModal;
