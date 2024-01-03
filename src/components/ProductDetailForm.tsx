'use client';
import React, {useState} from 'react';
import Card from '@/components/Card';
import {useRouter, useParams} from 'next/navigation';
import {BASE_URL, send} from '@/lib/api';
import Form from '@/components/Form';
import SearchTagBox from '@/components/tags/SearchTag';
import ContainerOne from '@/components/ContainerOne';
import toastShow from '@/components/toast/toast-selector';

export const ProductDetailForm = ({variant=null}:{variant?: any}) => {
  const router = useRouter();
  const path = useParams();
  const isAddMode = !variant
  console.log(variant)
  let initial = {
    size: '',
    expired_date: '',
    unit_price: 0.0,
    dozen_price: 0.0,
    box_price: 0.0,
    dozen_units: 12,
    box_units: 1,
    tags: '',
    supplier_id: null,
    currency: '',
    status: false,
  };
  let  content = {
    header: 'Create a product variant',
    subheader: '',
    buttonText: 'Create'
  };
  if (!isAddMode) {
    initial = {
      size: variant.size,
      expired_date: variant.expired_date,
      unit_price: variant.unit_price,
      dozen_price: variant.dozen_price,
      box_price: variant.box_price,
      dozen_units: variant.dozen_units,
      box_units: variant.box_units,
      currency: variant.currency,
      status: variant.status,
      tags: variant.tags.join(','),
      supplier_id: null,
    };

    content = {
      header: 'Update Product variant',
      subheader: '',
      buttonText: 'Update'
    };
  }

  const getImageUrls = () => {
    if (isAddMode) return [];
    return (variant.image_urls).map((image_path) => (
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
      formData.append(`product_detail[${key}]`, formState[key]);
    });
    for (let i = 0; i < photos.length; i++) {
      formData.append('product_detail[images][]', photos[i]);
    }
    try {

      if(isAddMode){
        //submit promise
        await send('/products/' + path.id + '/product_details', formData);
        toastShow('success','Supplier created successfully')
        router.push('/products/' + path.id);
      }else{
        await send('/products/' + path.id + '/product_details/'+path.variant, formData, "PUT");
        toastShow('success','Supplier updated successfully')
      }
    } catch (e) {
      setError(`Could not create product`);
    } finally {
      // setFormState({...initial});
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
      value: formState.currency,
      options: ['fc', 'ugx', 'usd'],
      action: (e) => {
        setFormState((s) => ({...s, currency: e.target.value}));
      }
    },
    [
      {
        label: 'Box Price',
        required: false,
        placeholder: 'Box Price',
        value: formState.box_price,
        name: 'box-price',
        input_type: 'number',
        type: 'number',
        className: '',
        action: (e) => {
          setFormState((s) => ({...s, box_price: e.target.value}));
        },
      },{
      label: 'Unit Qty in Box',
      required: false,
      placeholder: 'Box Units',
      value: formState.box_units,
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
        required: false,
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
        required: false,
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
      required: false,
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
      tags: formState.tags,
      suggestion: <SearchTagBox path='/tags/search'/> ,
      input_type: 'tag',
      name: 'tags',
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
      label: 'Status',
      input_type: 'checkbox',
      className: '',
      checked: formState.status,
      action: (e) => {
        setFormState((s) => ({...s, status: !formState.status}));
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
          </div>
          <Form fields={productDetailForm} handleSubmit={handleSubmit}/>
        </div>
    </ContainerOne>
  );
};