'use client';
import {useFetcher} from '@/app/hooks/useFetcher';
import {useEffect, useState} from 'react';
import SupplierList from '@/components/requisitions/SupplierList';
import ErrorBoundary from '@/components/ErrorBoundary';
import {API_ENDPOINTS} from "@/lib/api";

export default function PreviousSuppliers({action, supplierId, productId, currentSupplier}) {
  const {data: productSuppliers = {}, error, isLoading} = useFetcher(API_ENDPOINTS.PRODUCT_DETAIL_SUPPLIERS(productId));
  const {suppliers: list = []} = productSuppliers;
  const normalizedCurrentSupplier = currentSupplier?.id ? {
    ...currentSupplier,
    address: currentSupplier.address || {}
  } : null;
  const mergedList = normalizedCurrentSupplier && !list.some((supplier) => supplier.id === normalizedCurrentSupplier.id)
    ? [normalizedCurrentSupplier, ...list]
    : list;
  const [selected, setSelected] = useState(supplierId)
  const updateSelected = (id) => {
    setSelected(id)
    action(mergedList.find((supplier) => supplier.id === id))
  }

  useEffect(()=>{
    setSelected(supplierId)
  },[supplierId])
  return (
    <>
      <ErrorBoundary error={error}>
        <SupplierList
          title={'Previous Suppliers'}
          suppliers={mergedList}
          isLoading={isLoading}
          selected={selected}
          onUpdateSelected={updateSelected}
        />
      </ErrorBoundary>
    </>
  );
}
