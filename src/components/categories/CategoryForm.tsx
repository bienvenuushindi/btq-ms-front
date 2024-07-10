import React, {useState} from 'react';
import {send} from '@/lib/api';
import {useRouter} from 'next/navigation';
import ContainerOne from '@/components/utils/wrappers/ContainerOne';
import Form from '@/components/forms/Form';
import CategoryTree from '@/components/categories/CategoryTree';
import toastShow from "@/components/toast/toast-selector";

export default function CategoryForm({category = null}: { category?: any }) {
  const router = useRouter();
  const isAddMode = !category
  let initial = {name: '', description: '', active: false, parent_category_id: null};
  let content = {
    header: 'Create a category',
    subheader: '',
    buttonText: 'Create'
  };

  if (!isAddMode) {
    initial = {name: category.name, description: category.description, active: category.active, parent_category_id: category.parent_category_id}
    content = {
      header: 'Update Category',
      subheader: '',
      buttonText: 'Update'
    };
  }
  const [formState, setFormState] = useState({...initial});
  const [error, setError] = useState('');
  const createCategory = async () => {
    const formData = new FormData();

    Object.keys(formState).forEach((key) => {
      formData.append(`category[${key}]`, formState[key]);
    });

    try {
      if (isAddMode) {
        //submit promise
        await send('/categories', formData);
        toastShow('success', 'Category created successfully')
        router.push('/categories');
      } else {
        await send('/categories/' + category.id, formData, "PUT");
        toastShow('success', 'Category updated successfully')
      }

    } catch (e) {
      console.log(`Could not create category`);
    } finally {
    }
  };

   function updateCategory(id){
    setFormState((s) => ({...s, parent_category_id: id}));
  }


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
      input_type: 'toggle',
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