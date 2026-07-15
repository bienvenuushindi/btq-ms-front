'use client';

import {useRouter} from 'next/navigation';
import ModalContainer from '@/components/modal/ModalContainer';
import ModalContent from '@/components/modal/ModalContent';
import ModalHeader from '@/components/modal/ModalHeader';
import ModalBody from '@/components/modal/ModalBody';
import {ProductForm} from '@/components/ProductForm';

export default function ProductCreateModal({
  isOpen,
  onClose,
  product,
}: {
  isOpen: boolean;
  onClose: () => void;
  product?: any;
}) {
  const router = useRouter();
  const isEditMode = Boolean(product);

  return (
    <ModalContainer isOpen={isOpen} onRequestClose={onClose}>
      <ModalContent className="max-w-6xl">
        <ModalHeader title={isEditMode ? 'Edit product' : 'Create product'} closeModal={onClose} titleClassName="sm:text-2xl md:text-3xl"/>
        <ModalBody>
          <ProductForm
            embedded
            product={product}
            productId={product?.id}
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
