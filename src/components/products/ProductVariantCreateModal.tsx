'use client';

import {useRouter} from 'next/navigation';
import ModalContainer from '@/components/modal/ModalContainer';
import ModalContent from '@/components/modal/ModalContent';
import ModalHeader from '@/components/modal/ModalHeader';
import ModalBody from '@/components/modal/ModalBody';
import {ProductDetailForm} from '@/components/ProductDetailForm';

export default function ProductVariantCreateModal({
  isOpen,
  onClose,
  productId,
  variant,
}: {
  isOpen: boolean;
  onClose: () => void;
  productId?: any;
  variant?: any;
}) {
  const router = useRouter();
  const isEditMode = Boolean(variant);

  return (
    <ModalContainer isOpen={isOpen} onRequestClose={onClose}>
      <ModalContent className="max-w-4xl">
        <ModalHeader title={isEditMode ? 'Edit product variant' : 'Create product variant'} closeModal={onClose} titleClassName="text-2xl md:text-3xl"/>
        <ModalBody>
          <ProductDetailForm
            embedded
            productId={productId}
            variant={variant}
            variantId={variant?.id}
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
