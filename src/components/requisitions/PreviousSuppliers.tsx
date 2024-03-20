'use client';
import {useFetcher} from '@/app/hooks/useFetcher';
import {useEffect, useState} from 'react';
import SupplierList from '@/components/requisitions/SupplierList';
import ErrorBoundary from '@/components/ErrorBoundary';
import {API_ENDPOINTS} from "@/lib/api";

export default function PreviousSuppliers({action, supplierId, productId}) {
  const {data: productSuppliers = {}, error, isLoading} = useFetcher(API_ENDPOINTS.PRODUCT_DETAIL_SUPPLIERS(productId));
  const {suppliers: list = []} = productSuppliers;
  const [selected, setSelected] = useState(supplierId)
  const updateSelected = (id) => {
    setSelected(id)
    action(list.find((supplier) => supplier.id === id))
  }

  useEffect(()=>{
    setSelected(supplierId)
  },[supplierId])
  return (
    <>
      <ErrorBoundary error={error}>
        <SupplierList
          title={'Previous Suppliers'}
          suppliers={list}
          isLoading={isLoading}
          selected={selected}
          onUpdateSelected={updateSelected}
        />
      </ErrorBoundary>
    </>
  );
}