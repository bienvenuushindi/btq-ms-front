import {SearchBar} from '@/components/SearchBar';
import {API_ENDPOINTS} from '@/lib/api';
import React, {useState} from 'react';
import SearchSupplierResults from '@/components/requisitions/SearchSupplierResults';
import {updateUrl} from '@/lib/helper';

export default function SelectSupplier({action, productId, supplierId}) {
  const [url, setUrl] = useState<string | null>(null);
  const updateParams = (newFilters) => {
    const query = newFilters?.q?.trim?.() || '';
    if (!query) {
      setUrl(null);
      return;
    }

    setUrl(updateUrl(API_ENDPOINTS.SEARCH_SUPPLIERS(productId), {q: query}));
  }
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold my-2">Choose Supplier</h2>
      <div className={'w-full flex justify-start flex-col items-start'}>
        <SearchBar onSearch={updateParams} />
        <div className="w-full">
           <SearchSupplierResults url={url} action={action} supplierId={supplierId}/>
        </div>
      </div>
    </div>
  );
}
