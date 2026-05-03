'use client';
import React, {useState} from 'react';
import {countries} from '@/styles/data/countries';
import {API_ENDPOINTS, send} from '@/lib/api';
import {useParams, useRouter} from 'next/navigation';
import Form from '@/components/forms/Form';
import ContainerOne from '@/components/utils/wrappers/ContainerOne';
import toastShow from '@/components/toast/toast-selector';
import CategoryTreeMultipleSelection from "@/components/categories/CategoryTreeMultipleSelection";
import {useRouteTransition} from '@/components/navigation/RouteTransitionProvider';

export const ProductForm = ({product}: { product?: any }) => {
    const isAddMode = !product;
    const params = useParams();
    const router = useRouter();
    const {startNavigation} = useRouteTransition();
    let initial = {name: '', short_description: '', description: '', active: false, country_origin: '', tags: '', categories: []};
    if (!isAddMode) {
        initial = {
            name: product.name, short_description: product.short_description,
            description: product.description, active: product.active,
            country_origin: product.country_origin,
            tags: product.tags.join(','),
            categories: product?.categories ? product.categories.map(item => item.id) : []
        };
    }
    const getImageUrls = () => {
        if (isAddMode) return [];
        return (product.image_urls).map((image_path) => (
            image_path
        ));
    };
    const [formState, setFormState] = useState({...initial});
    const [error, setError] = useState('');
    const [photos, setPhotos] = useState(getImageUrls());

    const isPlaceholderImage = (photo: any) => (
        typeof photo === 'string' && (
            photo.includes('product-placeholder.png') ||
            photo.includes('supplier-placeholder.png') ||
            photo.includes('no-img.png')
        )
    );

    function updateCategory(ids: any[]) {
        setFormState((s) => ({...s, categories: [...ids]}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(formState).forEach((key) => {
            formData.append(`product[${key}]`, formState[key]);
        });
        for (let i = 0; i < photos.length; i++) {
            if (isPlaceholderImage(photos[i])) {
                continue;
            }
            formData.append('product[images][]', photos[i]);
        }
        try {
            if (isAddMode) {
                await send('/products', formData);
                toastShow('success', 'Product created successfully')
                startNavigation('Returning to products...');
                router.push('/products');
            } else {
                const productID = params.id;
                await send(`/products/${productID}`, formData, 'PUT');
                toastShow('success', 'Product updated successfully')
                startNavigation('Opening product details...');
                router.push(`/products/${productID}`);
            }

        } catch (e) {
            setError(`Could not create product`);
        } finally {
            // setFormState({...initial});
        }
    };

    const content = {
        header: isAddMode ? 'Create a product' : 'Update product',
        subheader: '',
        buttonText: 'Create'
    };
    const productForm = [
        [
            {
                label: 'Name',
                required: true,
                placeholder: 'Product name',
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
                label: 'Made in',
                required: true,
                placeholder: 'Select country of origin',
                name: 'country',
                input_type: 'select',
                value: formState.country_origin,
                className: '',
                options: Object.keys(countries).map(code => ({code, name: countries[code]})),
                action: (e) => {
                    setFormState((s) => ({...s, country_origin: e.target.value}));
                }
            }
        ],
        {
            label: 'Short Description',
            required: true,
            placeholder: 'Short product summary',
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
            input_type: 'rich-text-area',
            className: '',
            action: (content) => {
                setFormState((s) => ({...s, description: content}));
            },
        },
        {
            label: 'Tags',
            required: false,
            name: 'tag_list',
            placeholder: 'Add tags',
            tags: formState.tags,
            suggestion_url: API_ENDPOINTS.SEARCH_TAGS,
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
            labelClassName: 'sr-only',
            name: 'active',
            checked: formState.active,
            label: 'Active product',
            action: () => {
                setFormState((s) => ({...s, active: !formState.active}));
            }
        },
        {
            input_type: 'button',
            className: 'w-full justify-center',
            type: 'submit',
            placeholder: isAddMode ? 'Create product' : 'Update product'
        }
    ]

    const productFormCategory = [
        {
            input_type: 'custom',
            component: <CategoryTreeMultipleSelection action={updateCategory} initialSelectionIds={formState.categories}/>,
        }
    ];

    const fields= {
        left: productForm,
        right:productFormCategory
    }

    return (
        <ContainerOne>
            <div className="w-full mx-auto">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-400">Products</p>
                        <h2 className="mt-2 font-display text-4xl font-bold text-slate-900">{content.header}</h2>
                        <p className="mt-3 max-w-2xl text-base text-slate-500">
                            Build a complete product profile with clear copy, category mapping, reusable tags, and imagery.
                        </p>
                    </div>
                    <div className="mx-auto">
                        <Form handleSubmit={handleSubmit} fields={fields}/>
                    </div>
                </div>
            </div>
        </ContainerOne>
    );
};
