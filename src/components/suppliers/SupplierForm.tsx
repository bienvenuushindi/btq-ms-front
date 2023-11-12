'use client';
import React, {useState} from 'react';
import {BASE_URL, send} from '@/lib/api';
import {useRouter} from 'next/navigation';
import Form from '@/components/Form';
import SearchTagBox from '@/components/tags/SearchTag';
import ContainerOne from '@/components/ContainerOne';
import toastShow from '@/components/toast/toast-selector';

export const SupplierForm = ({supplier}) => {
  const isAddMode = !supplier;
  const router = useRouter();
  let initial = {
    shop_name: '',
    address1: '',
    address2: '',
    city: '',
    tel1: '',
    tel2: '',
    country_id: '',
    tags: '',
    country_name: ''
  };

  if (!isAddMode) {
    initial = {
      shop_name: supplier.shop_name,
      address1: supplier.address1,
      address2: supplier.address2,
      city: supplier.city,
      tel1: supplier.tel1,
      tel2: supplier.tel2,
      country_id: supplier.code,
      tags: supplier.tags.join(','),
      country_name: supplier.country
    };
  }

  const getImageUrls = () => {
    if (isAddMode) return [];
    return (supplier.image_urls).map((image_path) => (
      `${BASE_URL + image_path}`
    ));
  };
  const [formState, setFormState] = useState({...initial});
  const [error, setError] = useState('');
  const [photos, setPhotos] = useState(getImageUrls());

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(formState).forEach((key) => {
      formData.append(`supplier[${key}]`, formState[key]);
    });
    for (let i = 0; i < photos.length; i++) {
      if (typeof photos[i] === "string" && photos[i].includes('no-img.png')) {
        continue
      }
      formData.append('supplier[images][]', photos[i]);
    }
    try {
      if(isAddMode){
        await send('/suppliers', formData);
        toastShow('Supplier created successfully')
        router.replace('/suppliers');
      }else{
        await send(`/suppliers/${supplier.id}`, formData, 'PUT');
        toastShow('Supplier updated successfully')
      }

    } catch (e) {
      setError(`Could not create supplier`);
    } finally {
      // setFormState({...initial});
    }
  };

  const content = {
    header: 'Create a supplier',
    subheader: '',
    buttonText: 'Create'
  };
  const supplierForm = [
    {
      label: 'Shop name',
      required: true,
      placeholder: 'shop Name',
      value: formState.shop_name,
      name: 'shop_name',
      type: 'text',
      input_type: 'text',
      className: '',
      action: (e) => {
        setFormState((s) => ({...s, shop_name: e.target.value}));
      },
    },
    {
      label: 'Select Origin Country',
      required: true,
      placeholder: 'Select Country',
      name: 'country_id',
      value: formState.country_name,
      input_type: 'select',
      className: '',
      options: {'CG': 'Congo', 'RW': 'RWANDA', 'UG': 'Uganda', 'KE': 'Kenya', 'QA': 'Qatar',},
      action: (e) => {
        const countryName = e.target.options[e.target.selectedIndex].text;
        setFormState((s) => ({...s, country_id: e.target.value, country_name: countryName}));
      }
    },
    {
      label: 'City',
      required: true,
      placeholder: 'City',
      value: formState.city,
      name: 'city',
      type: 'text',
      input_type: 'text',
      className: '',
      action: (e) => {
        setFormState((s) => ({...s, city: e.target.value}));
      },
    },
    {
      label: 'Phone 1',
      required: true,
      placeholder: 'Phone number 1',
      value: formState.tel1,
      name: 'Phone 1',
      type: 'tel',
      input_type: 'text',
      className: '',
      action: (e) => {
        setFormState((s) => ({...s, tel1: e.target.value}));
      },
    },
    {
      label: 'Phone 2',
      required: true,
      placeholder: 'Phone number 2',
      value: formState.tel2,
      name: 'Phone 2',
      type: 'tel',
      input_type: 'text',
      className: '',
      action: (e) => {
        setFormState((s) => ({...s, tel2: e.target.value}));
      },
    },
    {
      label: 'Address 1',
      required: true,
      placeholder: 'Avenue, Building name, Floor Number',
      value: formState.address1,
      name: 'address1',
      type: 'text',
      input_type: 'text',
      className: '',
      action: (e) => {
        setFormState((s) => ({...s, address1: e.target.value}));
      },
    },
    {
      label: 'Address 2',
      required: false,
      placeholder: 'Avenue, Building name, Floor Number',
      value: formState.address2,
      name: 'address2',
      type: 'text',
      input_type: 'text',
      className: '',
      action: (e) => {
        setFormState((s) => (
          {...s, address2: e.target.value}
        ));
      },
    },
    {
      label: 'Enter Some Tags ...',
      required: false,
      placeholder: 'Add tag',
      tags: formState.tags,
      suggestion: <SearchTagBox path="/tags/search"/>,
      input_type: 'tag',
      className: '',
      action: (tags) => {
        setFormState((s) => (
          {...s, tags: tags.join(',')}));
      },
    },
    {
      label: 'Photos',
      input_type: 'image-file',
      image_props: {photos, setPhotos}
    },
    {
      input_type: 'button',
      className: '',
      type: 'submit',
      placeholder: isAddMode ? 'Create' : 'Update'
    }
  ];

  return (
    <ContainerOne>
      <div className="w-full lg:w-2/4 mx-auto">
        <div className="text-center">
          <h2 className="text-3xl mb-2 text-black">{content.header}</h2>
          <p className="tex-lg text-black/25">{content.subheader}</p>
          <Form handleSubmit={handleSubmit} fields={supplierForm}/>
        </div>
      </div>
    </ContainerOne>
  );
};