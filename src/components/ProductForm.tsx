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
import {revalidateCache} from '@/lib/cache';
import {getEditableImageUrls, isPlaceholderImage} from '@/lib/helper';
import {useFetcher} from '@/app/hooks/useFetcher';
import Badge from '@/components/utils/Badge';
import clsx from 'clsx';

export const ProductForm = ({product, productId, onSuccess, embedded = false}: {
    product?: any,
    productId?: any,
    onSuccess?: (product?: any) => void | Promise<void>,
    embedded?: boolean
}) => {
    const isAddMode = !product;
    const params = useParams();
    const router = useRouter();
    const {startNavigation} = useRouteTransition();
    const {data: currentUser} = useFetcher(API_ENDPOINTS.CURRENT_USER);
    const isAdmin = currentUser?.role?.toString().toLowerCase() === 'admin';
    let initial = {name: '', short_description: '', description: '', country_origin: '', tags: '', categories: [], approval_status: 'pending_review', rejection_reason: ''};
    if (!isAddMode) {
        initial = {
            name: product.name, short_description: product.short_description,
            description: product.description,
            country_origin: product.country_origin,
            tags: product.tags.join(','),
            categories: product?.categories ? product.categories.map(item => item.id) : [],
            approval_status: product.approval_status || (product.active ? 'approved' : 'pending_review'),
            rejection_reason: product.rejection_reason || ''
        };
    }
    const getImageUrls = () => {
        if (isAddMode) return [];
        return getEditableImageUrls(product.image_urls || []);
    };
    const [formState, setFormState] = useState({...initial});
    const [error, setError] = useState('');
    const [photos, setPhotos] = useState(getImageUrls());
    const [isSubmitting, setIsSubmitting] = useState(false);

    function updateCategory(ids: any[]) {
        setFormState((s) => ({...s, categories: [...ids]}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setError('');
        setIsSubmitting(true);
        const formData = new FormData();
        Object.keys(formState).forEach((key) => {
            if (['approval_status', 'rejection_reason'].includes(key) && !isAdmin) return;
            if (key === 'rejection_reason' && formState.approval_status !== 'rejected') return;
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
                const createdProduct = await send('/products', formData);
                await revalidateCache({
                    prefixes: [API_ENDPOINTS.PRODUCTS, API_ENDPOINTS.PRODUCT_STATS],
                });
                toastShow('success', 'Product created successfully')
                if (onSuccess) {
                    await onSuccess(createdProduct);
                } else {
                    startNavigation('Returning to products...');
                    router.push('/products');
                }
            } else {
                const productID = productId || params.id || product?.id;
                const updatedProduct = await send(`/products/${productID}`, formData, 'PUT');
                await revalidateCache({
                    keys: [API_ENDPOINTS.PRODUCT_BY_ID(productID)],
                    prefixes: [API_ENDPOINTS.PRODUCTS, API_ENDPOINTS.PRODUCT_STATS],
                });
                toastShow('success', 'Product updated successfully')
                if (onSuccess) {
                    await onSuccess(updatedProduct);
                } else {
                    startNavigation('Opening product details...');
                    router.push(`/products/${productID}`);
                }
            }

        } catch (e) {
            const message = e instanceof Error ? e.message : `Could not ${isAddMode ? 'create' : 'update'} product`;
            setError(message);
            toastShow('error', message);
        } finally {
            setIsSubmitting(false);
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
            label: 'Description (Optional)',
            required: false,
            placeholder: 'Description (optional)',
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
        ...(isAdmin ? [
            {
                label: 'Approval status',
                name: 'approval_status',
                input_type: 'radio',
                value: formState.approval_status,
                options: isAddMode ? ['pending_review', 'approved'] : ['pending_review', 'approved', 'rejected'],
                action: (e) => {
                    setFormState((s) => ({...s, approval_status: e.target.value}));
                }
            },
            ...(formState.approval_status === 'rejected' ? [{
                label: 'Rejection reason',
                placeholder: 'Explain why this product is rejected',
                value: formState.rejection_reason,
                name: 'rejection_reason',
                input_type: 'text-area',
                action: (e) => {
                    setFormState((s) => ({...s, rejection_reason: e.target.value}));
                },
            }] : []),
        ] : [{
            input_type: 'custom',
            component: (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    <span className="mr-2 font-semibold text-slate-700">Approval:</span>
                    <Badge variant={formState.approval_status === 'approved' ? 'success' : formState.approval_status === 'rejected' ? 'danger' : 'warning'} size="small">
                        {formState.approval_status?.replace('_', ' ') || 'pending review'}
                    </Badge>
                </div>
            ),
        }]),
        {
            input_type: 'button',
            className: 'w-full justify-center',
            type: 'submit',
            disabled: isSubmitting,
            placeholder: isSubmitting
              ? (isAddMode ? 'Creating product...' : 'Updating product...')
              : (isAddMode ? 'Create product' : 'Update product')
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

    const innerContent = (
        <div className="w-full mx-auto">
                <div className="mx-auto max-w-7xl">
                    <div className={clsx("mb-4", embedded && "sr-only")}>
                        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-400">Products</p>
                        <h2 className="mt-2 font-display text-4xl font-bold text-slate-900">{content.header}</h2>
                        <p className="mt-3 max-w-2xl text-base text-slate-500">
                            Build a complete product profile with clear copy, category mapping, reusable tags, and imagery.
                        </p>
                    </div>
                    {error && (
                        <div className="mb-4 rounded-[22px] border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium leading-6 text-rose-700">
                            {error}
                        </div>
                    )}
                    <div className="mx-auto">
                        <Form handleSubmit={handleSubmit} fields={fields}/>
                    </div>
                </div>
            </div>
    );

    if (embedded) {
        return innerContent;
    }

    return (
        <ContainerOne>
            {innerContent}
        </ContainerOne>
    );
};
