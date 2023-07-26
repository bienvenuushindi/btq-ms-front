'use client';
import Card from '@/components/Card';
import Input from '@/components/Input';
import React, {useCallback, useState} from 'react';
import Textarea from '@/components/Textarea';
import SelectInput from '@/components/SelectInput';
import Button from '@/components/Button';
import {countries} from '@/data/countries';
import {sendPost} from '@/lib/api';
import {useRouter} from 'next/navigation';
import Image from 'next/image';
import clsx from 'clsx';

export const ProductForm = () => {
  const MAX_AMOUNT = 5;
  const countriesList = countries;
  const router = useRouter();
  const initial = {name: '', short_description: '', description: '', active: false, country_origin: ''};
  const [formState, setFormState] = useState({...initial});
  const [error, setError] = useState('');
  const [photos, setPhotos] = useState([]);

  const handlePhotosArray = files => {
    const photosToUpload = [...photos];
    files.some((file) => {
      photosToUpload.push(file);
    });
    setPhotos(photosToUpload);
  };

  const handlePhotoEvent = (e) => {
    const uploadedPhotos = Array.prototype.slice.call(e.target.files);
    handlePhotosArray(uploadedPhotos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // {name: '', short_description: '', description: '', active: false, country_origin: ''};
    const formData = new FormData();
    Object.keys(formState).forEach((key) => {
      formData.append(`product[${key}]`, formState[key]);
    });
    for (let i = 0; i < photos.length; i++) {
      console.log(photos[i]);
      formData.append('product[images][]', photos[i]);
    }
    try {
      //submit promise
      await sendPost('/products', formData);
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

  return (
    <Card>
      <div className="w-full">
        <div className="text-center">
          <h2 className="text-3xl mb-2 text-black">{content.header}</h2>
          <p className="tex-lg text-black/25">{content.subheader}</p>
        </div>
        <form onSubmit={handleSubmit} className="py-10 w-full">
          <div className="mb-8">
            <Input required
                   placeholder="Product Name"
                   value={formState.name}
                   type="text"
                   className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                   onChange={(e) =>
                     setFormState((s) => ({...s, name: e.target.value}))
                   }/>
          </div>
          <div className="mb-8">
            <Input required
                   placeholder="Product Bio"
                   value={formState.short_description}
                   type="text"
                   className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                   onChange={(e) =>
                     setFormState((s) => ({...s, short_description: e.target.value}))
                   }/>
          </div>
          <div className="mb-8">
            <Textarea
              required
              placeholder="Product Description"
              value={formState.description}
              type="text"
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={(e) =>
                setFormState((s) => ({...s, description: e.target.value}))}
            />
          </div>
          <div className="mb-8">
            <SelectInput required
              // placeholder="Product Description"
                         className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                         onChange={(e) =>
                           setFormState((s) => ({...s, country_origin: e.target.value}))}>
              {Object.keys(countriesList).map(country => <option key={country}
                                                                 value={country}>{countriesList[country]}</option>)}
            </SelectInput>
          </div>
          <div className="mb-8">
            <input
              id="photosUpload"
              type="file"
              className="hidden"
              accept=".jpg, .jpeg, .png, .webp"
              onChange={handlePhotoEvent}
              disabled={photos.length === MAX_AMOUNT}
            />
            <label htmlFor="photosUpload">
              <a type="button"
                 className={clsx('bg-violet-500',
                   'text-white',
                   'border-transparent',
                   'hover:bg-violet-600', photos.length === MAX_AMOUNT && 'bg-black')}>{photos.length === MAX_AMOUNT ? 'Limit Reached!' : 'Add Photos'}
              </a>
            </label>

            <div className="add_spot_photos_div">
              {photos && photos.map((photo, index) => {
                return <div key={index}>
                  <button type="button" className="filter_photo" onClick={() =>
                    setPhotos((photos) => {
                      return photos.filter((photo, i) => i !== index);
                    })}>x
                  </button>
                  <Image width={60} height={60} src={URL.createObjectURL(photo)} alt="Upload file"/>
                </div>;
              })}
            </div>
          </div>
          <div className="mb-8">
            Public
            <Input
              placeholder="Product Bio"
              checked={formState.active}
              type="checkbox"
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={(e) =>
                setFormState((s) => ({...s, active: !formState.active}))
              }/>
          </div>
          <div>
            <Button type="submit" intent="secondary">
              {content.buttonText}
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};