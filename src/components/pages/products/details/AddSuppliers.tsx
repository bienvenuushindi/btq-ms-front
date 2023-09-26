import {useState} from 'react';
import Button from '@/components/Button';
import ModalContainer from '@/components/modal/ModalContainer';
import ModalContent from '@/components/modal/ModalContent';
import ModalHeader from '@/components/modal/ModalHeader';
import ModalBody from '@/components/modal/ModalBody';
import {PriceDetailForm} from '@/components/PriceDetailForm';

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
              className="px-3 py-2 rounded-md flex items-center space-x-1"> Add Price</Button>
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