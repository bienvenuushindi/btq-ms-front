'use client';
import React, {useContext, useState} from 'react';
import Card from '@/components/Card';
import {send} from '@/lib/api';
import {useCountries} from '@/app/hooks/useCountries';
import {useSuppliers} from '@/app/hooks/useSuppliers';
import Form from '@/components/Form';
import {SidebarContext} from '@/components/sidebar/SidebarContainer';
import ContainerOne from '@/components/ContainerOne';
import SelectSupplier from '@/components/requisitions/SelectSupplier';

export const PriceDetailForm = ({productDetailID}) => {
  const {setOpenBar} = useContext(SidebarContext);
  const [s_country, setCountry] = useState(null);
  const initial = {
    dozen: 0,
    box: 0,
    supplier_id: null,
    product_detail_id: productDetailID,
    currency: 'usd',
  };

  const {countries, error: countryError, isLoading: isCountryLoading} = useCountries();
  const {suppliers, error: supplierError, isLoading: isSupplierLoading} = useSuppliers(s_country);
  const [formState, setFormState] = useState({...initial});
  const [error, setError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    Object.keys(formState).forEach((key) => {
      formData.append(`price_detail[${key}]`, formState[key]);
    });

    try {
      await send('/product_details/' + productDetailID + '/price_details', formData);
      setOpenBar({state: true, target: 'price_details'});
    } catch (e) {
      setError(`Could not create product`);
    } finally {
      setFormState({...initial});
    }
  };

  const selectSupplier=(id)=>{
    setFormState((s)=>({...s,supplier_id:id}))
  }

  const content = {
    header: 'Add price',
    subheader: '',
    buttonText: 'Create'
  };
  const priceForm = [
    {
      label:'Select Supplier',
      input_type:'custom',
      component:   <SelectSupplier action={selectSupplier} />,
    },
    {
      label: 'Price of dozen',
      required: true,
      placeholder: 'Price of dozen',
      value: formState.dozen,
      name: 'dozen',
      type: 'number',
      input_type: 'text',
      className: '',
      action: (e) => {
        setFormState((s) => ({...s, dozen: e.target.value}));
      },
    },
    {
      label: 'Price of a box',
      required: true,
      placeholder: 'Price of a box',
      value: formState.box,
      name: 'box',
      input_type: 'text',
      type: 'number',
      className: '',
      action: (e) => {
        setFormState((s) => ({...s, box: e.target.value}));
      },
    },
    {
      label: 'Select currency',
      required: true,
      placeholder: 'Select currency',
      name: 'currency',
      input_type: 'select',
      className: '',
      options: [{code: 'fc', name: 'fc'}, {code: 'ugx', name: 'ugx'}, {code: 'usd', name: 'usd'}],
      action: (e) => {
        setFormState((s) => ({...s, currency: e.target.value}));
      }
    },
    {
      input_type: 'button',
      className: '',
      type: 'submit',
      placeholder: content.buttonText
    }
  ];
  return (
    <ContainerOne>
      <div className="w-full">
        <Form handleSubmit={handleSubmit} fields={priceForm}/>
      </div>
    </ContainerOne>
  );
};