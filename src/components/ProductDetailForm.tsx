'use client';
import {useCallback, useState} from 'react';
import Card from '@/components/Card';
import Input from '@/components/Input';
import Button from '@/components/Button';
import {useRouter, useParams} from 'next/navigation';
import {sendPost} from '@/lib/api';

export const ProductDetailForm = () => {
  const router = useRouter()
  const path = useParams();
  console.log(path.id);
  const initial = {
    size: '',
    expired_date: '',
    unit_price: 0.0,
    dozen_price: 0.0,
    box_price: 0.0,
    dozen_units: 12,
    box_units: 1
  };
  const [formState, setFormState] = useState({...initial});
  const [error, setError] = useState('');
  const handleSubmit = useCallback(async (e) => {
      e.preventDefault();
      const data = {
        product_detail: formState
      };
      console.log(data);
      try {
        //submit promise
        await sendPost('/products/' + path.id + '/product_details', data);
        router.replace('/products/');
      } catch (e) {
        setError(`Could not create product`);
      } finally {
        setFormState({...initial});
      }
    },
    [
      formState.size,
      formState.expired_date,
      formState.unit_price,
      formState.dozen_price,
      formState.box_price,
      formState.dozen_units,
      formState.box_units,
    ]);

  const content = {
    header: 'Create a product',
    subheader: '',
    buttonText: 'Create'
  };
  return (
    <>
      <Card>
        <div className="w-full">
          <div className="text-center">
            <h2 className="text-3xl mb-2 text-black">{content.header}</h2>
            <p className="tex-lg text-black/25">{content.subheader}</p>
          </div>
          <form onSubmit={handleSubmit} className="py-10 w-full">
            <div className="mb-8">
              <Input required
                     placeholder="Size"
                     value={formState.size}
                     type="text"
                     className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                     onChange={(e) =>
                       setFormState((s) => ({...s, size: e.target.value}))
                     }/>
            </div>
            <div className="mb-8">
              <Input required
                     placeholder="Expired Date"
                     value={formState.expired_date}
                     type="date"
                     className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                     onChange={(e) =>
                       setFormState((s) => ({...s, expired_date: e.target.value}))
                     }/>
            </div>
            <div className="mb-8">
              <Input required
                     placeholder="Price of Unit"
                     value={formState.unit_price}
                     type="number"
                     step="0.1"
                     className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                     onChange={(e) =>
                       setFormState((s) => ({...s, unit_price: e.target.value}))}
              />
            </div>
            <div className="mb-8">
              <Input required
                     placeholder="Price of a dozen"
                     value={formState.dozen_price}
                     type="number"
                     step="0.1"
                     className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                     onChange={(e) =>
                       setFormState((s) => ({...s, dozen_price: e.target.value}))}
              />
            </div>
            <div className="mb-8">
              <Input required
                     placeholder="Price of a box"
                     value={formState.box_price}
                     type="number"
                     step="0.1"
                     className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                     onChange={(e) =>
                       setFormState((s) => ({...s, box_price: e.target.value}))}
              />
            </div>
            <div className="mb-8">
              <Input required
                     placeholder="How many item in a dozen"
                     value={formState.dozen_units}
                     type="number"
                     step="1"
                     className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                     onChange={(e) =>
                       setFormState((s) => ({...s, dozen_units: e.target.value}))}
              />
            </div>
            <div className="mb-8">
              <Input required
                     placeholder="How many item in a box"
                     value={formState.box_units}
                     type="number"
                     step="1"
                     className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                     onChange={(e) =>
                       setFormState((s) => ({...s, box_units: e.target.value}))}
              />
            </div>
            <div>
              <Button type="submit" intent="secondary">
                {content.buttonText}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </>
  );
};