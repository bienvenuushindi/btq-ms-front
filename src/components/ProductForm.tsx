'use client';
import React, {useState} from 'react';
import {countries} from '@/data/countries';
import {BASE_URL, send} from '@/lib/api';
import {useParams, useRouter} from 'next/navigation';
import Form from '@/components/Form';
import SearchTagBox from '@/components/tags/SearchTag';
import ContainerOne from '@/components/ContainerOne';
import toastShow from '@/components/toast/toast-selector';

export const ProductForm = ({product}) => {
  const isAddMode = !product;
  const params = useParams();
  console.log(product)
  const router = useRouter();
  let initial = {name: '', short_description: '', description: '', active: false, country_origin: '', tags: ''};
  if (!isAddMode) {
    initial = {
      name: product.name, short_description: product.short_description,
      description: product.description, active: product.active,
      country_origin: product.country_origin,
      tags: product.tags.join(',')
    };
  }
  const getImageUrls = () => {
    if (isAddMode) return [];
    return (product.image_urls).map((image_path) => (
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
      formData.append(`product[${key}]`, formState[key]);
    });
    for (let i = 0; i < photos.length; i++) {
      formData.append('product[images][]', photos[i]);
    }
    try {
      if(isAddMode){
        await send('/products', formData);
        toastShow('success','Supplier created successfully')
        router.replace('/products');
      }else{

        const productID = params.id;
        await send(`/products/${productID}`, formData, 'PUT');
        toastShow('success','Supplier updated successfully')
      }

    } catch (e) {
      setError(`Could not create product`);
    } finally {
      // setFormState({...initial});
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
      value: formState.country_origin,
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
      tags: formState.tags,
      suggestion: <SearchTagBox path='/tags/search'/> ,
      input_type: 'tag',
      className: '',
      action: (tags) => {
        setFormState((s) => ({...s, tags: tags.join(',')}));
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