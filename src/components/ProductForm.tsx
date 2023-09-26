'use client';
import React, {useState} from 'react';
import {countries} from '@/data/countries';
import {send} from '@/lib/api';
import {useRouter} from 'next/navigation';
import Form from '@/components/Form';
import SearchTagBox from '@/components/tags/SearchTag';
import ContainerOne from '@/components/ContainerOne';

export const ProductForm = () => {
  const router = useRouter();
  const initial = {name: '', short_description: '', description: '', active: false, country_origin: '', tag_list: ''};
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
      label: 'Enter Some Tags ...',
      required: false,
      name: 'tag_list',
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
      name: 'photos',
      image_props: {photos, setPhotos}
    },
    {
      label: 'Status ',
      input_type: 'checkbox',
      className: '',
      labelClassName:'sr-only',
      name: 'active',
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
    <ContainerOne>
      <div className="w-full lg:w-2/4 mx-auto">
        <div className="text-center">
          <h2 className="text-3xl mb-2 text-black">{content.header}</h2>
          <p className="tex-lg text-black/25">{content.subheader}</p>
          <div className="mx-auto">
            <Form handleSubmit={handleSubmit} fields={productForm}/>
          </div>
        </div>
      </div>
    </ContainerOne>
  );
};