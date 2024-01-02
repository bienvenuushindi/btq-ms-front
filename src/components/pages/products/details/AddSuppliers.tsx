import React, {useState} from 'react';
import Button from '@/components/Button';
import ModalContainer from '@/components/modal/ModalContainer';
import ModalContent from '@/components/modal/ModalContent';
import ModalHeader from '@/components/modal/ModalHeader';
import ModalBody from '@/components/modal/ModalBody';
import {PriceDetailForm} from '@/components/PriceDetailForm';
import {PlusCircle} from 'react-feather';

export default function AddSupplier({productDetailID = null, closeExternalModal = null}) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  }
  const closeModal = () => {
    setIsOpen(false);
    closeExternalModal && closeExternalModal();
  }
  return (
    <>
      <Button onClick={() => openModal()}
              size="small"
              intent={'primary'}
              className="py-1 rounded-md flex items-center gap-1 text-sm">
        <PlusCircle color="#FFFFFF" size={20}/>
        <span className="text-neutral-50 ">Add Price</span>
      </Button>
      <ModalContainer
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <ModalContent>
          <ModalHeader closeModal={closeModal} title={'Add Price'}/>
          <ModalBody>
             <PriceDetailForm productDetailID={productDetailID}/>
          </ModalBody>
        </ModalContent>

      </ModalContainer>
    </>

  );
}