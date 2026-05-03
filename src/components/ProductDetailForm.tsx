'use client';
import React, {useState} from 'react';
import {useParams, useRouter} from 'next/navigation';
import {API_ENDPOINTS, send} from '@/lib/api';
import Form from '@/components/forms/Form';
import ContainerOne from '@/components/utils/wrappers/ContainerOne';
import toastShow from '@/components/toast/toast-selector';
import {useRouteTransition} from '@/components/navigation/RouteTransitionProvider';

export const ProductDetailForm = ({variant = null}: { variant?: any }) => {
    const router = useRouter();
    const {startNavigation} = useRouteTransition();
    const path = useParams();
    const isAddMode = !variant
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
    let content = {
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
            image_path
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

            if (isAddMode) {
                //submit promise
                await send('/products/' + path.id + '/product_details', formData);
                toastShow('success', 'Product created successfully')
                startNavigation('Opening product details...');
                router.push('/products/' + path.id);
            } else {
                await send('/products/' + path.id + '/product_details/' + path.variant, formData, "PUT");
                toastShow('success', 'Product updated successfully')
                startNavigation('Opening product details...');
                router.push('/products/' + path.id);
            }
        } catch (e) {
            setError(`Could not create product`);
        } finally {
            // setFormState({...initial});
        }
    };

    const productDetailForm = [
        [
            {
                label: 'Size',
                required: true,
                placeholder: 'Variant size',
                value: formState.size,
                name: 'size',
                type: 'text',
                input_type: 'text',
                className: '',
                action: (e) => {
                    setFormState((s) => ({...s, size: e.target.value}));
                },
            },
            {
                label: 'Expiration date',
                required: true,
                placeholder: 'Expired on',
                value: formState.expired_date,
                name: 'expired_date',
                input_type: 'date',
                type: 'date',
                className: '',
                action: (e) => {
                    setFormState((s) => ({...s, expired_date: e.target.value}));
                },
            }
        ],
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
            }, {
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
                label: 'Group Price',
                required: false,
                placeholder: 'Group Price',
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
                label: 'Unit Qty in Group',
                required: false,
                placeholder: 'Group units',
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
            label: 'Tags',
            required: false,
            placeholder: 'Add tags',
            tags: formState.tags,
            suggestion_url: API_ENDPOINTS.SEARCH_TAGS,
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
            input_type: 'checkbox',
            className: '',
            checked: formState.status,
            labelClassName: 'sr-only',
            action: (e) => {
                setFormState((s) => ({...s, status: !formState.status}));
            },
            label: 'Active variant'
        },
        {
            input_type: 'button',
            className: 'w-full justify-center',
            type: 'submit',
            placeholder: isAddMode ? 'Create variant' : 'Update variant'
        }
    ];


    return (
        <ContainerOne>
            <div className="mx-auto w-full max-w-5xl">
                <div className="mb-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-400">Product Variants</p>
                    <h2 className="mt-2 font-display text-4xl font-bold text-slate-900">{content.header}</h2>
                    <p className="mt-3 max-w-2xl text-base text-slate-500">
                        Set pricing packs, shelf-life details, and media for this specific variant.
                    </p>
                </div>
                <div className="oasis-panel p-6 lg:p-8">
                    <Form fields={productDetailForm} handleSubmit={handleSubmit}/>
                </div>
            </div>
        </ContainerOne>
    );
};
