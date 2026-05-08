import React, {useState} from 'react';
import {send} from '@/lib/api';
import {useRouter} from 'next/navigation';
import ContainerOne from '@/components/utils/wrappers/ContainerOne';
import Form from '@/components/forms/Form';
import CategoryTree from '@/components/categories/CategoryTree';
import toastShow from "@/components/toast/toast-selector";
import {useRouteTransition} from '@/components/navigation/RouteTransitionProvider';
import {API_ENDPOINTS} from '@/lib/api';
import {revalidateCache} from '@/lib/cache';

export default function CategoryForm({category = null}: { category?: any }) {
  const router = useRouter();
  const {startNavigation} = useRouteTransition();
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createCategory = async (e?) => {
    e?.preventDefault?.();
    if (isSubmitting) return;

    setError('');
    setIsSubmitting(true);
    const formData = new FormData();

    Object.keys(formState).forEach((key) => {
      formData.append(`category[${key}]`, formState[key]);
    });

    try {
      if (isAddMode) {
        //submit promise
        await send('/categories', formData);
        await revalidateCache({
          prefixes: [API_ENDPOINTS.CATEGORIES],
          keys: [API_ENDPOINTS.CATEGORY_TREE_STRUCTURE],
        });
        toastShow('success', 'Category created successfully')
        startNavigation('Returning to categories...');
        router.push('/categories');
      } else {
        await send('/categories/' + category.id, formData, "PUT");
        await revalidateCache({
          prefixes: [API_ENDPOINTS.CATEGORIES],
          keys: [API_ENDPOINTS.CATEGORY_TREE_STRUCTURE],
        });
        toastShow('success', 'Category updated successfully')
        startNavigation('Returning to categories...');
        router.push('/categories');
      }

    } catch (e) {
      const message = e instanceof Error ? e.message : `Could not ${isAddMode ? 'create' : 'update'} category`;
      setError(message);
      toastShow('error', message);
    } finally {
      setIsSubmitting(false);
    }
  };

   function updateCategory(id){
    setFormState((s) => ({...s, parent_category_id: id}));
  }


  const productForm = [
    [{
      label: 'Name',
      required: true,
      placeholder: 'Category name',
      value: formState.name,
      name: 'name',
      type: 'text',
      input_type: 'text',
      className: '',
      action: (e) => {
        setFormState((s) => ({...s, name: e.target.value}));
      },
    }],
    {
      label: 'Description',
      required: true,
      placeholder: 'Category description',
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
      className: 'w-full justify-center',
      type: 'submit',
      disabled: isSubmitting,
      placeholder: isSubmitting
        ? (isAddMode ? 'Creating category...' : 'Updating category...')
        : (isAddMode ? 'Create category' : 'Update category')
    }
  ];
  return (
    <ContainerOne>
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-400">Categories</p>
          <h2 className="mt-2 font-display text-4xl font-bold text-slate-900">{content.header}</h2>
          <p className="mt-3 max-w-2xl text-base text-slate-500">
            Define the category label, add context, and place it correctly in the category tree.
          </p>
        </div>
        <div className="oasis-panel p-6 lg:p-8">
          {error && (
            <div className="mb-4 rounded-[22px] border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium leading-6 text-rose-700">
              {error}
            </div>
          )}
          <div className="mx-auto">
            <Form handleSubmit={createCategory} fields={productForm}/>
          </div>
        </div>
      </div>
    </ContainerOne>
  );
}
