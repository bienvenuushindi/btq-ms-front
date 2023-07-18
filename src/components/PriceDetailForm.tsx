'use client';
import {useCallback, useState} from 'react';
import Card from '@/components/Card';
import Input from '@/components/Input';
import Button from '@/components/Button';
import {useRouter, useParams} from 'next/navigation';
import {sendPost} from '@/lib/api';
import SelectInput from '@/components/SelectInput';
import {useCountries} from '@/app/hooks/useCountries';
import {useSuppliers} from '@/app/hooks/useSuppliers';
import clsx from 'clsx';


export const PriceDetailForm = () => {
  const router = useRouter();
  const path = useParams();
  const [s_country, setCountry] = useState(null);
  console.log(path.id);
  const initial = {
    dozen: 0.0,
    box: 0.0,
    supplier_id: null,
    product_detail_id: path.id,
    currency: 'usd'
  };

  const {countries, error: countryError, isLoading: isCountryLoading} = useCountries();
  const {suppliers, error: supplierError, isLoading: isSupplierLoading} = useSuppliers(s_country);
  console.log(countries);
  console.log(suppliers);
  const [formState, setFormState] = useState({...initial});
  const [error, setError] = useState('');
  const handleSubmit = async (e) => {
      e.preventDefault();
      const data = {
        price_detail: formState
      };
      console.log(data);
      try {
        await sendPost('/product_details/' + path.id + '/price_details', data);
        router.replace('/products/details/' + path.id);
      } catch (e) {
        setError(`Could not create product`);
      } finally {
        setFormState({...initial});
      }
    }
    // [
    //   formState.dozen,
    //   formState.box,
    // ]
// )

  const content = {
    header: 'Add price',
    subheader: '',
    buttonText: 'Create'
  };
  return (
    <>
      <Card>
        <div className="w-full">
          <div className="text-center">
            <h2 className="text-3xl mb-2 text-black">{content.header}</h2>
            <p className="tex-lg text-black/25">{content.subheader}</p>
          </div>
          <form onSubmit={handleSubmit} className="py-10 w-full">

            <div className="mb-8">
              <Input required
                     placeholder="Price of dozen"
                     value={formState.dozen}
                     type="number"
                     step="0.1"
                     className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                     onChange={(e) =>
                       setFormState((s) => ({...s, dozen: e.target.value}))}
              />
            </div>
            <div className="mb-8">
              <Input required
                     placeholder="Price of a box"
                     value={formState.box}
                     type="number"
                     step="0.1"
                     className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                     onChange={(e) =>
                       setFormState((s) => ({...s, box: e.target.value}))}
              />
            </div>
            <div className="mb-8">
              <SelectInput required
                // placeholder="Product Description"
                           className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                           onChange={(e) =>
                             setFormState((s) => ({...s, currency: e.target.value}))}>
                <option value="">Select currency</option>
                {['fc', 'ugx', 'usd'].map(curr => <option key={curr}
                                                          value={curr}>{curr}</option>)}
              </SelectInput>
            </div>
            <div className="mb-8 gap-3 flex">
              {countries.map(country => (
                <div key={country.attributes.code}>
                  <Input required
                         placeholder="Price of a box"
                         value={country.id}
                         type="radio"
                         name="country"
                         step="0.1"
                         className="border-solid border-gray border-2 text-lg  py-0 w-fit"
                         onChange={(e) =>
                           setCountry(e.target.value)}
                  /> <span>{country.attributes.name}</span>
                </div>
              ))}
            </div>
            <div className="mb-8">
              <SelectInput required
                           className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                           onChange={(e) =>
                             setFormState((s) =>{
                               // console.log(clsx('changed from = ', s.supplier_id, ' to= ' ,e.target.value))
                               // const newState = {...s, supplier_id: e.target.value}
                               // console.log(newState)
                               return ({...s, supplier_id: e.target.value})
                             })}>
                <option value="">Select supplier shop</option>
                {suppliers.map(supplier => <option key={supplier.id}
                                                   value={supplier.id}>{supplier.attributes.shop_name}</option>)}
              </SelectInput>
            </div>
            <div>
              <Button type="submit" intent="secondary">
                {content.buttonText}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </>
  );
};