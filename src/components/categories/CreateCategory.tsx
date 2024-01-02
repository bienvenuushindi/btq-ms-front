'use client';
import {useState} from 'react';
import Button from '@/components/Button';
import ModalHeader from '@/components/modal/ModalHeader';
import ModalBody from '@/components/modal/ModalBody';
import ModalContent from '@/components/modal/ModalContent';
import ModalContainer from '@/components/modal/ModalContainer';
import CategoryForm from '@/components/categories/CategoryForm';


export default function CreateCategory({revalidate}) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <>
      <Button onClick={() => openModal()}
              size="small"
              intent={'primary'}
              className="px-3 py-2 rounded-md flex items-center space-x-1"> New Category</Button>
      <ModalContainer
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <ModalContent>
          <ModalHeader closeModal={closeModal} title={'Create Category'}/>
          <ModalBody>
            <CategoryForm/>
          </ModalBody>
        </ModalContent>

      </ModalContainer>
    </>

  );
}