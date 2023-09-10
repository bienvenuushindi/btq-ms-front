'use client';
import Card from '@/components/Card';
import React, {useState} from 'react';
import {countries} from '@/data/countries';
import {send} from '@/lib/api';
import {useRouter} from 'next/navigation';
import Form from '@/components/Form';
import {useTags} from '@/app/hooks/useTags';
import SearchTagBox from '@/components/tags/SearchTag';
import ContainerOne from '@/components/ContainerOne';

export const SupplierForm = () => {
  const router = useRouter();
  const initial = {
    shop_name: '',
    line1: '',
    line2: '',
    city: '',
    phone_number1: '',
    phone_number2: '',
    country_id: '',
    tag_list: '',
    country_name: ''
  };
  const [formState, setFormState] = useState({...initial});
  const [error, setError] = useState('');
  const [photos, setPhotos] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(formState).forEach((key) => {
      formData.append(`supplier[${key}]`, formState[key]);
    });
    for (let i = 0; i < photos.length; i++) {
      formData.append('supplier[images][]', photos[i]);
    }
    try {
      // for (let pair of formData.entries()) {
      //   console.log(pair[0] + ', ' + pair[1]);
      // }
      await send('/suppliers', formData);
      router.replace('/suppliers');
    } catch (e) {
      setError(`Could not create supplier`);
    } finally {
      setFormState({...initial});
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
      input_type: 'select',
      className: '',
      options: {'CG': 'Congo', 'RW': 'RWANDA', 'UG': 'Uganda', 'KE': 'Kenya', 'QA': 'Qatar',},
      action: (e) => {
        const countryName = e.target.options[e.target.selectedIndex].text
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
      value: formState.phone_number1,
      name: 'Phone 1',
      type: 'tel',
      input_type: 'text',
      className: '',
      action: (e) => {
        setFormState((s) => ({...s, phone_number1: e.target.value}));
      },
    },
    {
      label: 'Phone 2',
      required: true,
      placeholder: 'Phone number 2',
      value: formState.phone_number2,
      name: 'Phone 2',
      type: 'tel',
      input_type: 'text',
      className: '',
      action: (e) => {
        setFormState((s) => ({...s, phone_number2: e.target.value}));
      },
    },
    {
      label: 'Address 1',
      required: true,
      placeholder: 'Avenue, Building name, Floor Number',
      value: formState.line1,
      name: 'line1',
      type: 'text',
      input_type: 'text',
      className: '',
      action: (e) => {
        setFormState((s) => ({...s, line1: e.target.value}));
      },
    },
    {
      label: 'Address 2',
      required: false,
      placeholder: 'Avenue, Building name, Floor Number',
      value: formState.line2,
      name: 'line2',
      type: 'text',
      input_type: 'text',
      className: '',
      action: (e) => {
        setFormState((s) => ({...s, line2: e.target.value}));
      },
    },
    {
      label: 'Enter Some Tags ...',
      required: false,
      placeholder: 'Add tag',
      tag_list: formState.tag_list,
      suggestion: <SearchTagBox path='/tags/search'/> ,
      input_type: 'tag',
      className: '',
      action: (tags) => {
        setFormState((s) => ({...s, tag_list: tags.join(',')}));
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
      placeholder: 'Submit'
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