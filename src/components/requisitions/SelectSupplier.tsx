import {SearchBar} from '@/components/SearchBar';
import {API_URL} from '@/lib/api';
import React, {useState} from 'react';
import SearchSupplierResults from '@/components/requisitions/SearchSupplierResults';

export default function SelectSupplier({action, productId, supplierId}) {
  const [url, setUrl] = useState('');
  const callMe = (text) => {
    setUrl(text);
  };
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold my-2">Select Supplier </h2>
      <div className={'w-full flex justify-start flex-col items-start'}>
        <SearchBar updateList={callMe} submitTo={API_URL + '/suppliers/search/filter/' + productId}/>
        <div className="w-full">
          {
            (url ? <SearchSupplierResults url={url} action={action} productId={productId} supplierId={supplierId}/> :
              null)
          }
        </div>
      </div>
    </div>
  );
}