import {SearchBar} from '@/components/SearchBar';
import {API_URL} from '@/lib/api';
import React, {useState} from 'react';
import SearchSupplierResults from '@/components/requisitions/SearchSupplierResults';
import {updateUrl} from '@/lib/utils';

export default function SelectSupplier({action, productId, supplierId}) {
  const [url, setUrl] = useState(API_URL + '/suppliers/search/filter/' + productId);
  const updateParams = (newFilters) => {
    setUrl((prevUrl) => {
      return  updateUrl(prevUrl, newFilters);
    });
  }
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold my-2">Select Supplier </h2>
      <div className={'w-full flex justify-start flex-col items-start'}>
        <SearchBar onSearch={updateParams} />
        <div className="w-full">
          {
            (url ? <SearchSupplierResults url={url} action={action} supplierId={supplierId}/> :
              null)
          }
        </div>
      </div>
    </div>
  );
}