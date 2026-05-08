import Card from '@/components/utils/wrappers/Card';
import React, {useState} from 'react';
import {getImageUrls} from '@/lib/helper';
import PriceItemData from "@/components/sections/sidebar/price-details/PriceItemData";
import Button from '@/components/utils/Button';
import {Edit2, MapPin, Minus, Phone} from 'react-feather';
import ModalContainer from '@/components/modal/ModalContainer';
import ModalContent from '@/components/modal/ModalContent';
import ModalHeader from '@/components/modal/ModalHeader';
import ModalBody from '@/components/modal/ModalBody';
import {PriceDetailForm} from '@/components/PriceDetailForm';
import {deleteItem} from '@/lib/api';
import toastShow from '@/components/toast/toast-selector';
import Image from 'next/image';
import DeleteAlert from '@/components/DeleteAlert';


export default function PriceItem({details, supplier, productDetailId, onRefresh}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const {
    id,
    shop_name,
    image_urls,
    address: supplierAddress,
  } = supplier;

  const {
    city,
    country,
    address1,
    address2,
    tel1,
    tel2
  } = supplierAddress || {};

  const handleRemove = async () => {
    setIsDeleting(true);
    try {
      await deleteItem(`/product_details/${productDetailId}/price_details/supplier/${id}`);
      toastShow('success', 'Supplier removed from product successfully');
      await Promise.resolve(onRefresh?.());
      setShowDeleteAlert(false);
    } catch (error) {
      toastShow('error', error instanceof Error ? error.message : 'Could not remove supplier');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
    <Card className="my-4 overflow-hidden border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
      <div className="flex flex-col" key={'supplier-price-details' + id}>
        <div className="border-b border-slate-100 px-4 py-4 sm:px-5">
          <div className="flex items-start gap-3">
            <Image
              src={getImageUrls(image_urls)[0]}
              alt={shop_name}
              width={52}
              height={52}
              className="h-13 w-13 rounded-2xl border border-slate-200 bg-slate-50 object-cover"
            />
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-lg font-semibold text-slate-900">{shop_name}</h3>
              <div className="mt-2 space-y-2 text-sm text-slate-500">
                <div className="flex items-start gap-2">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-slate-400"/>
                  <div>
                    <p>{`${country || 'Country'} / ${city || 'City'}`}</p>
                    <p>{address1 || 'Address'}</p>
                    {address2 ? <p>{address2}</p> : null}
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Phone size={15} className="mt-0.5 shrink-0 text-slate-400"/>
                  <div>
                    <p>{tel1 || 'N/A'}</p>
                    {tel2 ? <p>{tel2}</p> : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-4 sm:px-5">
          <PriceItemData details={details} />
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/70 px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              intent="secondary"
              size="small"
              className="flex h-9 w-9 items-center justify-center rounded-xl p-0 text-slate-600 hover:text-slate-900"
              onClick={() => setIsEditOpen(true)}
              aria-label="Edit supplier pricing"
              title="Edit supplier pricing"
            >
              <Edit2 size={14}/>
            </Button>
            <Button
              type="button"
              intent="none"
              size="small"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-rose-200 p-0 text-rose-600 hover:bg-rose-50"
              onClick={() => setShowDeleteAlert(true)}
              disabled={isDeleting}
              aria-label="Remove supplier from product"
              title="Remove supplier from product"
            >
              <Minus size={14}/>
            </Button>
          </div>
        </div>
      </div>
    </Card>
      <ModalContainer
        isOpen={isEditOpen}
        onRequestClose={() => setIsEditOpen(false)}
      >
        <ModalContent>
          <ModalHeader closeModal={() => setIsEditOpen(false)} title={'Edit Supplier Pricing'}/>
          <ModalBody>
            <PriceDetailForm
              productDetailID={productDetailId}
              initialSupplier={supplier}
              initialDetails={details}
              onSuccess={async () => {
                await Promise.resolve(onRefresh?.());
                setIsEditOpen(false);
              }}
            />
          </ModalBody>
        </ModalContent>
      </ModalContainer>
      {showDeleteAlert && (
        <DeleteAlert
          onCancel={() => setShowDeleteAlert(false)}
          onDelete={handleRemove}
          show={showDeleteAlert}
          message={`Are you sure you want to remove ${shop_name} from this product variant?`}
        />
      )}
    </>
  );
}
