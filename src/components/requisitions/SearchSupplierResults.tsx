'use client';
import {useSuppliers} from '@/app/hooks/useSuppliers';
import {RadioGroup} from '@headlessui/react';
import {CheckCircle} from 'react-feather';
import {useEffect, useState} from 'react';
import SupplierList from '@/components/requisitions/SupplierList';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function SearchSupplierResults({url, action, supplierId}) {
  const {suppliers, error, isLoading} = useSuppliers(url);
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