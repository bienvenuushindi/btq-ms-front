'use client';

import {useRouter} from 'next/navigation';
import ModalContainer from '@/components/modal/ModalContainer';
import ModalContent from '@/components/modal/ModalContent';
import ModalHeader from '@/components/modal/ModalHeader';
import ModalBody from '@/components/modal/ModalBody';
import {SupplierForm} from '@/components/suppliers/SupplierForm';

export default function SupplierModal({
  isOpen,
  onClose,
  supplier,
}: {
  isOpen: boolean;
  onClose: () => void;
  supplier?: any;
}) {
  const router = useRouter();
  const isEditMode = Boolean(supplier);

  return (
    <ModalContainer isOpen={isOpen} onRequestClose={onClose}>
      <ModalContent className="max-w-6xl">
        <ModalHeader title={isEditMode ? 'Edit supplier' : 'Create supplier'} closeModal={onClose} titleClassName="sm:text-2xl md:text-3xl"/>
        <ModalBody>
          <SupplierForm
            embedded
            supplier={supplier}
            onSuccess={async () => {
              onClose();
              router.refresh();
            }}
          />
        </ModalBody>
      </ModalContent>
    </ModalContainer>
  );
}
