'use client';
import React, {useState} from 'react';
import {API_ENDPOINTS, send} from '@/lib/api';
import {useRouter} from 'next/navigation';
import Form from '@/components/forms/Form';
import ContainerOne from '@/components/utils/wrappers/ContainerOne';
import toastShow from '@/components/toast/toast-selector';
import CategoryTreeMultipleSelection from "@/components/categories/CategoryTreeMultipleSelection";
import {useRouteTransition} from '@/components/navigation/RouteTransitionProvider';
import {revalidateCache} from '@/lib/cache';

export const SupplierForm = ({supplier}: { supplier?: any }) => {
    const isAddMode = !supplier;
    const router = useRouter();
    const {startNavigation} = useRouteTransition();
    let initial = {
        shop_name: '',
        address1: '',
        address2: '',
        city: '',
        tel1: '',
        tel2: '',
        country_id: '',
        tags: '',
        country_name: '',
        categories: []
    };

    if (!isAddMode) {
        const {
            shop_name,
            tags,
            address: supplierAddress,
        } = supplier;

        const {
            city,
            country,
            code,
            address1,
            address2,
            tel1,
            tel2
        } = supplierAddress
        initial = {
            shop_name: shop_name,
            address1: address1,
            address2: address2,
            city: city,
            tel1: tel1,
            tel2: tel2,
            country_id: code,
            tags: tags.join(','),
            country_name: country,
            categories: supplier?.categories ? supplier.categories.map(item => item.id) : []
        };
    }

    const getImageUrls = () => {
        if (isAddMode) return [];
        return (supplier.image_urls).map((image_path) => (
            image_path
        ));
    };
    const [formState, setFormState] = useState({...initial});
    const [error, setError] = useState('');
    const [photos, setPhotos] = useState([...getImageUrls()]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isPlaceholderImage = (photo: any) => (
        typeof photo === 'string' && (
            photo.includes('supplier-placeholder.png') ||
            photo.includes('product-placeholder.png') ||
            photo.includes('no-img.png')
        )
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setError('');
        setIsSubmitting(true);
        const formData = new FormData();
        Object.keys(formState).forEach((key) => {
            formData.append(`supplier[${key}]`, formState[key]);
        });
        for (let i = 0; i < photos.length; i++) {
            if (isPlaceholderImage(photos[i])) {
                continue;
            }
            formData.append('supplier[images][]', photos[i]);
        }
        try {
            if (isAddMode) {
                await send('/suppliers', formData);
                await revalidateCache({
                    prefixes: [API_ENDPOINTS.SUPPLIERS],
                });
                toastShow('success', 'Supplier created successfully')
  
            } else {
                await send(`/suppliers/${supplier.id}`, formData, 'PUT');
                await revalidateCache({
                    keys: [API_ENDPOINTS.SUPPLIER_BY_ID(supplier.id)],
                    prefixes: [API_ENDPOINTS.SUPPLIERS],
                });
                toastShow('success', 'Supplier updated successfully')
              
            }
            startNavigation('Returning to suppliers...');
            router.push('/suppliers');

        } catch (e) {
            const message = e instanceof Error ? e.message : `Could not ${isAddMode ? 'create' : 'update'} supplier`;
            setError(message);
            toastShow('error', message);
        } finally {
            setIsSubmitting(false);
        }
    };

    function updateCategory(ids: any[]) {
        setFormState((s) => ({...s, categories: [...ids]}));
    }

    const content = {
        header: isAddMode ? 'Create a supplier' : 'Update supplier',
        subheader: '',
        buttonText: 'Create'
    };
    const supplierForm = [
        [
            {
                label: 'Shop name',
                required: true,
                placeholder: 'Supplier name',
                value: formState.shop_name,
                name: 'shop_name',
                type: 'text',
                input_type: 'text',
                className: '',
                action: (e) => {
                    setFormState((s) => ({...s, shop_name: e.target.value}));
                },
            },
            {
                label: 'Made in',
                required: true,
                placeholder: 'Select country',
                name: 'country_id',
                value: formState.country_name,
                input_type: 'select',
                className: '',
                options: {'CG': 'Congo', 'RW': 'RWANDA', 'UG': 'Uganda', 'KE': 'Kenya', 'QA': 'Qatar',},
                action: (e) => {
                    const countryName = e.target.options[e.target.selectedIndex].text;
                    setFormState((s) => ({...s, country_id: e.target.value, country_name: countryName}));
                }
            }
        ],
        [
            {
                label: 'City',
                required: true,
                placeholder: 'City',
                value: formState.city,
                name: 'city',
                type: 'text',
                input_type: 'text',
                className: '',
                action: (e) => {
                    setFormState((s) => ({...s, city: e.target.value}));
                },
            },
            {
                label: 'Phone 1',
                required: true,
                placeholder: 'Primary phone number',
                value: formState.tel1,
                name: 'Phone 1',
                type: 'tel',
                input_type: 'text',
                className: '',
                action: (e) => {
                    setFormState((s) => ({...s, tel1: e.target.value}));
                },
            }
        ],
        [
            {
                label: 'Phone 2',
                required: false,
                placeholder: 'Secondary phone number',
                value: formState.tel2,
                name: 'Phone 2',
                type: 'tel',
                input_type: 'text',
                className: '',
                action: (e) => {
                    setFormState((s) => ({...s, tel2: e.target.value}));
                },
            },
            {
                label: 'Address 1',
                required: true,
                placeholder: 'Avenue, building, floor',
                value: formState.address1,
                name: 'address1',
                type: 'text',
                input_type: 'text',
                className: '',
                action: (e) => {
                    setFormState((s) => ({...s, address1: e.target.value}));
                },
            }
        ],
        {
            label: 'Address 2',
            required: false,
            placeholder: 'Additional address details',
            value: formState.address2,
            name: 'address2',
            type: 'text',
            input_type: 'text',
            className: '',
            action: (e) => {
                setFormState((s) => (
                    {...s, address2: e.target.value}
                ));
            },
        },
        {
            label: 'Tags',
            required: false,
            placeholder: 'Add tags',
            tags: formState.tags,
            suggestion_url: API_ENDPOINTS.SEARCH_TAGS,
            input_type: 'tag',
            className: '',
            action: (tags) => {
                setFormState((s) => (
                    {...s, tags: tags.join(',')}));
            },
        },
        {
            label: 'Photos',
            input_type: 'image-file',
            image_props: {photos, setPhotos}
        },
        {
            input_type: 'button',
            className: 'w-full justify-center',
            type: 'submit',
            disabled: isSubmitting,
            placeholder: isSubmitting
                ? (isAddMode ? 'Creating supplier...' : 'Updating supplier...')
                : (isAddMode ? 'Create supplier' : 'Update supplier')
        }
    ];

    const supplierFormCategory = [
        {
            input_type: 'custom',
            component: <CategoryTreeMultipleSelection action={updateCategory}
                                                      initialSelectionIds={formState.categories}/>,
        }
    ];

    const fields = {
        left: supplierForm,
        right: supplierFormCategory
    }

    return (
        <ContainerOne>
            <div className="w-full mx-auto">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-400">Suppliers</p>
                        <h2 className="mt-2 font-display text-4xl font-bold text-slate-900">{content.header}</h2>
                        <p className="mt-3 max-w-2xl text-base text-slate-500">
                            Capture the supplier profile, contact details, category coverage, and supporting media in one place.
                        </p>
                    </div>
                    {error && (
                        <div className="mb-4 rounded-[22px] border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium leading-6 text-rose-700">
                            {error}
                        </div>
                    )}
                    <Form handleSubmit={handleSubmit} fields={fields}/>
                </div>
            </div>
        </ContainerOne>
    );
};
