'use client';
import Card from '@/components/Card';
import React, {useState} from 'react';
import {countries} from '@/data/countries';
import {send} from '@/lib/api';
import {useRouter} from 'next/navigation';
import Form from '@/components/Form';

export const ProductForm = () => {
  const router = useRouter();
  const initial = {name: '', short_description: '', description: '', active: false, country_origin: ''};
  const [formState, setFormState] = useState({...initial});
  const [error, setError] = useState('');
  const [photos, setPhotos] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(formState).forEach((key) => {
      formData.append(`product[${key}]`, formState[key]);
    });
    for (let i = 0; i < photos.length; i++) {
      formData.append('product[images][]', photos[i]);
    }
    try {
      await send('/products', formData);
      router.replace('/products');
    } catch (e) {
      setError(`Could not create product`);
    } finally {
      setFormState({...initial});
    }
  };

  const content = {
    header: 'Create a product',
    subheader: '',
    buttonText: 'Create'
  };
  const productForm = [
    {
      label: 'Name',
      required: true,
      placeholder: 'Product Name',
      value: formState.name,
      name: 'name',
      type: 'text',
      input_type: 'text',
      className: '',
      action: (e) => {
        setFormState((s) => ({...s, name: e.target.value}));
      },
    },
    {
      label: 'Short Description',
      required: true,
      placeholder: 'Product Bio',
      value: formState.short_description,
      name: 'short_description',
      input_type: 'text-area',
      className: '',
      action: (e) => {
        setFormState((s) => ({...s, short_description: e.target.value}));
      },
    },
    {
      label: 'Description',
      required: true,
      placeholder: 'Description',
      value: formState.description,
      name: 'description',
      input_type: 'text-area',
      className: '',
      action: (e) => {
        setFormState((s) => ({...s, description: e.target.value}));
      },
    },
    {
      label: 'Select Origin Country',
      required: true,
      placeholder: 'Select Country',
      name: 'country',
      input_type: 'select',
      className: '',
      options: countries,
      action: (e) => {
        setFormState((s) => ({...s, country_origin: e.target.value}));
      }
    },
    {
      label: 'Photos',
      input_type: 'image-file',
      image_props: {photos, setPhotos}
    },
    {
      label: 'Status ',
      input_type: 'checkbox',
      className: '',
      checked: formState.active,
      action: () => {
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

  return (
    <Card>
      <div className="w-full">
        <div className="text-center">
          <h2 className="text-3xl mb-2 text-black">{content.header}</h2>
          <p className="tex-lg text-black/25">{content.subheader}</p>
          <Form handleSubmit={handleSubmit} fields={productForm}/>
        </div>
      </div>
    </Card>
  );
};