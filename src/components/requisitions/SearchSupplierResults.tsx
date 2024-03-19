'use client';
import {useEffect, useState} from 'react';
import SupplierList from '@/components/requisitions/SupplierList';
import ErrorBoundary from '@/components/ErrorBoundary';
import {useFetcher} from "@/app/hooks/useFetcher";
import {API_ENDPOINTS} from "@/lib/api";

export default function SearchSupplierResults({url, action, supplierId}) {
  const {data: suppliers=[], error, isLoading} = useFetcher(url);
  const [selected, setSelected] = useState(supplierId);
  const updateSelected = (id) => {
    setSelected(id);
    action({id: id, price: 0, quantity_type: ''});
  };

  useEffect(() => {
    setSelected(supplierId);
  }, [supplierId]);

  return (
    <>
      <ErrorBoundary error={error}>
        <SupplierList
          title={'Search Results'}
          suppliers={suppliers}
          isLoading={isLoading}
          selected={selected}
          onUpdateSelected={updateSelected}
        />
      </ErrorBoundary>
    </>
  );
}