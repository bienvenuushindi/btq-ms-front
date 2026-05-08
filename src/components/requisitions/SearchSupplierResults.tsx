'use client';
import {useEffect, useState} from 'react';
import SupplierList from '@/components/requisitions/SupplierList';
import {useFetcher} from "@/app/hooks/useFetcher";
import DataLoading from '@/components/state/Loading';

export default function SearchSupplierResults({url, action, supplierId}) {
  const {data: suppliers=[], meta,  error, isLoading} = useFetcher(url);
  const [selected, setSelected] = useState(supplierId);
  const updateSelected = (id) => {
    setSelected(id);
    const supplier = suppliers.find((item) => item.id === id);
    action(supplier ? {...supplier, price: 0, quantity_type: ''} : {id: id, price: 0, quantity_type: ''});
  };

  useEffect(() => {
    setSelected(supplierId);
  }, [supplierId]);

  return (
    <>
      {!url ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
          Start typing to search for a supplier.
        </div>
      ) : isLoading ? (
        <DataLoading/>
      ) : error ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          We couldn&apos;t load suppliers right now. Try a different search or try again in a moment.
        </div>
      ) : suppliers.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
          No matching suppliers found. Try a different search term.
        </div>
      ) : (
        <SupplierList
          title={`Search Results (${meta && meta.total || 0})`}
          suppliers={suppliers}
          isLoading={isLoading}
          selected={selected}
          onUpdateSelected={updateSelected}
        />
      )}
    </>
  );
}
