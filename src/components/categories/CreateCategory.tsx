'use client';
import {type ReactNode, useState} from 'react';
import Button from '@/components/utils/Button';
import ModalHeader from '@/components/modal/ModalHeader';
import ModalBody from '@/components/modal/ModalBody';
import ModalContent from '@/components/modal/ModalContent';
import ModalContainer from '@/components/modal/ModalContainer';
import CategoryForm from '@/components/categories/CategoryForm';

type CreateCategoryProps = {
  revalidate?: () => void;
  buttonLabel?: ReactNode;
  buttonClassName?: string;
  buttonIntent?: string;
  category?: any;
  trigger?: ReactNode;
};

export default function CreateCategory({
  revalidate,
  buttonLabel = 'New Category',
  buttonClassName = '',
  buttonIntent = 'primary',
  category = null,
  trigger,
}: CreateCategoryProps) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const isEditMode = Boolean(category);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const handleSaved = async () => {
    await revalidate?.();
    closeModal();
  };

  return (
    <>
      {trigger ? (
        <button type="button" className="flex w-full items-center text-left" onClick={openModal}>
          {trigger}
        </button>
      ) : (
        <Button onClick={() => openModal()}
                size="small"
                intent={buttonIntent as any}
                className={`flex items-center justify-center space-x-1 rounded-2xl px-4 py-2 text-center  ${buttonClassName}`}> {buttonLabel}</Button>
      )}
      <ModalContainer
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <ModalContent>
          <ModalHeader closeModal={closeModal} title={isEditMode ? 'Edit Category' : 'Create Category'}/>
          <ModalBody>
            <CategoryForm category={category} onSaved={handleSaved}/>
          </ModalBody>
        </ModalContent>

      </ModalContainer>
    </>

  );
}
