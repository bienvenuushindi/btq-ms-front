'use client';
import {useFetcher} from '@/app/hooks/useFetcher';
import {useEffect, useState} from 'react';
import SupplierList from '@/components/requisitions/SupplierList';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function PreviousSuppliers({action, supplierId, productId}) {
  const {data: product = {}, error, isLoading} = useFetcher('/product_details/' + productId + '/suppliers');
  const {attributes: productSuppliers = {}} = product;
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