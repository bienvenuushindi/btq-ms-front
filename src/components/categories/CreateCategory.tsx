'use client';
import {useState} from 'react';
import Button from '@/components/utils/Button';
import ModalHeader from '@/components/modal/ModalHeader';
import ModalBody from '@/components/modal/ModalBody';
import ModalContent from '@/components/modal/ModalContent';
import ModalContainer from '@/components/modal/ModalContainer';
import CategoryForm from '@/components/categories/CategoryForm';


export default function CreateCategory({
  revalidate,
  buttonLabel = 'New Category',
  buttonClassName = '',
  buttonIntent = 'primary',
}) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <>
      <Button onClick={() => openModal()}
              size="small"
              intent={buttonIntent as any}
              className={`flex items-center justify-center space-x-1 rounded-2xl px-4 py-2 text-center  ${buttonClassName}`}> {buttonLabel}</Button>
      <ModalContainer
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <ModalContent>
          <ModalHeader closeModal={closeModal} title={'Create Category'}/>
          <ModalBody>
            <CategoryForm />
          </ModalBody>
        </ModalContent>

      </ModalContainer>
    </>

  );
}
