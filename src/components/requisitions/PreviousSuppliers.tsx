'use client';
import {useFetcher} from '@/app/hooks/useFetcher';
import {useEffect, useMemo, useRef, useState} from 'react';
import SupplierList from '@/components/requisitions/SupplierList';
import ErrorBoundary from '@/components/ErrorBoundary';
import {API_ENDPOINTS} from "@/lib/api";

export default function PreviousSuppliers({action, supplierId, productId, currentSupplier}) {
  const {data: productSuppliers = {}, error, isLoading} = useFetcher(API_ENDPOINTS.PRODUCT_DETAIL_SUPPLIERS(productId));
  const {suppliers: list = []} = productSuppliers;
  const supplierKey = (supplier) => supplier?.id?.toString();
  const normalizedCurrentSupplier = useMemo(() => currentSupplier?.id ? {
    ...currentSupplier,
    address: currentSupplier.address || {}
  } : null, [currentSupplier]);
  const currentSupplierKey = supplierKey(normalizedCurrentSupplier);
  const mergedList = useMemo(() => normalizedCurrentSupplier && !list.some((supplier) => supplierKey(supplier) === currentSupplierKey)
    ? [normalizedCurrentSupplier, ...list]
    : list, [currentSupplierKey, list, normalizedCurrentSupplier]);
  const [selected, setSelected] = useState(supplierId)
  const appliedSupplierRef = useRef(null);
  const updateSelected = (id) => {
    const previousSelected = selected;
    setSelected(id)
    const accepted = action(mergedList.find((supplier) => supplierKey(supplier) === id?.toString()))
    if (accepted === false) setSelected(previousSelected);
  }

  useEffect(()=>{
    setSelected(supplierId)
  },[supplierId])

  useEffect(() => {
    const selectedSupplier = mergedList.find((supplier) => supplierKey(supplier) === supplierId?.toString());
    const selectedSupplierKey = supplierKey(selectedSupplier);
    if (!selectedSupplier || appliedSupplierRef.current === selectedSupplierKey) return;

    appliedSupplierRef.current = selectedSupplierKey;
    action(selectedSupplier, {silent: true});
  }, [action, mergedList, supplierId]);

  return (
    <>
      <ErrorBoundary error={error}>
        <SupplierList
          title={'Supplier History'}
          emptyMessage={'No saved supplier history for this item yet.'}
          suppliers={mergedList}
          isLoading={isLoading}
          selected={selected}
          onUpdateSelected={updateSelected}
        />
      </ErrorBoundary>
    </>
  );
}
