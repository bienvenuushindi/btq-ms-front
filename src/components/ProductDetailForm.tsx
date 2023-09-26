'use client';
import React, {useState} from 'react';
import Card from '@/components/Card';
import {useRouter, useParams} from 'next/navigation';
import {send} from '@/lib/api';
import Form from '@/components/Form';
import SearchTagBox from '@/components/tags/SearchTag';
import ContainerOne from '@/components/ContainerOne';

export const ProductDetailForm = () => {
  const router = useRouter();
  const path = useParams();
  const initial = {
    size: '',
    expired_date: '',
    unit_price: 0.0,
    dozen_price: 0.0,
    box_price: 0.0,
    dozen_units: 12,
    box_units: 1,
    currency: '',
    active: '',
    tag_list: '',
    supplier_id: null,
  };
  const [formState, setFormState] = useState({...initial});
  const [error, setError] = useState('');
  const [photos, setPhotos] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(formState).forEach((key) => {
      formData.append(`product_detail[${key}]`, formState[key]);
    });
    for (let i = 0; i < photos.length; i++) {
      formData.append('product_detail[images][]', photos[i]);
    }
    try {
      //submit promise
      await send('/products/' + path.id + '/product_details', formData);
      router.replace('/products/' + path.id);
    } catch (e) {
      setError(`Could not create product`);
    } finally {
      setFormState({...initial});
    }
  };

  const productDetailForm = [
    {
      label: 'Size',
      required: true,
      placeholder: 'Product Size',
      value: formState.size,
      name: 'size',
      type: 'number',
      input_type: 'number',
      className: '',
      action: (e) => {
        setFormState((s) => ({...s, size: e.target.value}));
      },
    },
    {
      label: 'Expiration date',
      required: true,
      placeholder: 'Expired Date',
      value: formState.expired_date,
      name: 'expired_date',
      input_type: 'date',
      type: 'date',
      className: '',
      action: (e) => {
        setFormState((s) => ({...s, expired_date: e.target.value}));
      },
    },
    {
      label: 'Choose currency',
      placeholder: 'Select Currency',
      name: 'currency',
      input_type: 'radio',
      className: '',
      options: ['fc', 'ugx', 'usd'],
      action: (e) => {
        setFormState((s) => ({...s, currency: e.target.value}));
      }
    },
    [
      {
        label: 'Box Price',
        required: true,
        placeholder: 'Box Price',
        value: formState.dozen_price,
        name: 'box-price',
        input_type: 'number',
        type: 'number',
        className: '',
        action: (e) => {
          setFormState((s) => ({...s, box_price: e.target.value}));
        },
      },{
      label: 'Unit Qty in Box',
      required: true,
      placeholder: 'Box Units',
      value: formState.dozen_price,
      name: 'box-units',
      input_type: 'number',
      type: 'number',
      className: '',
      action: (e) => {
        setFormState((s) => ({...s, box_units: e.target.value}));
      },
    },
    ],
    [
      {
        label: 'Dozen Price',
        required: true,
        placeholder: 'Dozen Price',
        value: formState.dozen_price,
        name: 'dozen-price',
        input_type: 'number',
        type: 'number',
        className: '',
        action: (e) => {
          setFormState((s) => ({...s, dozen_price: e.target.value}));
        },
      },
      {
        label: 'Unit Qty in Dozen',
        required: true,
        placeholder: 'Dozen units',
        value: formState.dozen_units,
        name: 'dozen-units',
        input_type: 'number',
        type: 'number',
        className: '',
        action: (e) => {
          setFormState((s) => ({...s, dozen_units: e.target.value}));
        },
      },
    ],
    {
      label: 'Unit Price',
      required: true,
      placeholder: 'Unit Price',
      value: formState.unit_price,
      name: 'unit-price',
      input_type: 'number',
      type: 'number',
      className: '',
      action: (e) => {
        setFormState((s) => ({...s, unit_price: e.target.value}));
      },
    },
    {
      label: 'Enter Some Tags ...',
      required: false,
      placeholder: 'Add tag',
      tag_list: formState.tag_list,
      suggestion: <SearchTagBox path='/tags/search'/> ,
      input_type: 'tag',
      name: 'tags',
      className: '',
      action: (tags) => {
        setFormState((s) => ({...s, tag_list: tags.join(',')}));
      },
    },
    {
      label: 'Photos',
      name: 'photos',
      input_type: 'image-file',
      image_props: {photos, setPhotos}
    },
    {
      label: 'Status',
      input_type: 'checkbox',
      className: '',
      checked: formState.active,
      action: (e) => {
        setFormState((s) => ({...s, active: !formState.active}));
      }
    },
    {
      input_type: 'button',
      className: '',
      type: 'submit',
      placeholder: 'Submit'
    }
  ];

  const content = {
    header: 'Create a product',
    subheader: '',
    buttonText: 'Create'
  };
  return (
    <ContainerOne>
        <div className="w-full lg:w-2/4 mx-auto">
          <div className="text-center">
            <h2 className="text-3xl mb-2 text-black">{content.header}</h2>
            <p className="tex-lg text-black/25">{content.subheader}</p>
          </div>
          <Form fields={productDetailForm} handleSubmit={handleSubmit}/>
        </div>
    </ContainerOne>
  );
};