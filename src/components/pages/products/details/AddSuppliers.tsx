import React, {useState} from 'react';
import Button from '@/components/utils/Button';
import ModalContainer from '@/components/modal/ModalContainer';
import ModalContent from '@/components/modal/ModalContent';
import ModalHeader from '@/components/modal/ModalHeader';
import ModalBody from '@/components/modal/ModalBody';
import {PriceDetailForm} from '@/components/PriceDetailForm';
import {PlusCircle} from 'react-feather';
import {useFetcher} from '@/app/hooks/useFetcher';
import {API_ENDPOINTS} from '@/lib/api';

export default function AddSupplier({productDetailID = null, closeExternalModal = null, onSuccess = null}) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const {data: currentUser} = useFetcher(API_ENDPOINTS.CURRENT_USER);
  const currentSupplier = currentUser?.supplier || null;
  const isSupplier = currentUser?.role?.toString().toLowerCase() === 'supplier' && currentSupplier;
  const actionLabel = isSupplier ? 'Add to my products' : 'Add Supplier';
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
        <span className="text-neutral-50 ">{actionLabel}</span>
      </Button>
      <ModalContainer
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <ModalContent>
          <ModalHeader closeModal={closeModal} title={isSupplier ? 'Add Product Pricing' : 'Add Supplier'}/>
          <ModalBody>
             <PriceDetailForm
               productDetailID={productDetailID}
               initialSupplier={isSupplier ? currentSupplier : null}
               onSuccess={async () => {
                 if (onSuccess) {
                   await Promise.resolve(onSuccess());
                 }
                 closeModal();
               }}
             />
          </ModalBody>
        </ModalContent>

      </ModalContainer>
    </>

  );
}
