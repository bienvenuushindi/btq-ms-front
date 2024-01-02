import React, {useState} from 'react';
import {send} from '@/lib/api';
import {useRouter} from 'next/navigation';
import ContainerOne from '@/components/ContainerOne';
import Form from '@/components/Form';
import CategoryTree from '@/components/categories/CategoryTree';

export default function CategoryForm() {
  const router = useRouter();
  const initial = {name: '', description: '', active: false, parent_category_id: null};
  const [formState, setFormState] = useState({...initial});
  const [error, setError] = useState('');
  const createCategory = async () => {
    const formData = new FormData();

    Object.keys(formState).forEach((key) => {
      formData.append(`category[${key}]`, formState[key]);
    });

    try {
      const result = await send('/categories', formData);
      router.replace('/categories');
    } catch (e) {
      console.log(`Could not create category`);
      console.log(e);
    } finally {
    }
  };

   function updateCategory(id){
    setFormState((s) => ({...s, parent_category_id: id}));
  }

  const content = {
    header: 'Create a category',
    subheader: '',
    buttonText: 'Create'
  };

  const productForm = [
    {
      label: 'Name',
      required: true,
      placeholder: 'Category Name',
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
      input_type: 'custom',
      component: <CategoryTree action={updateCategory}/>,
    },
    {
      label: 'Status ',
      input_type: 'checkbox',
      className: '',
      labelClassName: 'sr-only',
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
          <div className="mx-auto">
            <Form handleSubmit={createCategory} fields={productForm}/>
          </div>
        </div>
      </div>
    </ContainerOne>
  );
}