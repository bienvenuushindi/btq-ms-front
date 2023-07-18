'use client';
import Card from '@/components/Card';
import Input from '@/components/Input';
import {useCallback, useState} from 'react';
import Textarea from '@/components/Textarea';
import SelectInput from '@/components/SelectInput';
import Button from '@/components/Button';
import {countries} from '@/data/countries';
import {sendPost} from '@/lib/api';
import {useRouter} from 'next/navigation';

export const ProductForm=() => {
  const countriesList = countries;
  const router = useRouter()
  const initial = {name: '', short_description: '', description: '', active: false, country_origin: ''};
  const [formState, setFormState] = useState({...initial});
  const [error, setError] = useState('');
  const handleSubmit = useCallback(async (e) => {
      e.preventDefault();
      const data = {
        product: formState
      };
      console.log(data);
      try {
        //submit promise
        await sendPost('/products', data)
        router.replace('/products');
      } catch (e) {
        setError(`Could not create product`);
      } finally {
        setFormState({...initial});
      }
    },
    [
      formState.name,
      formState.short_description,
      formState.description,
      formState.active,
      formState.country_origin,
    ]);

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
}