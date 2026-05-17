'use client';
import React, {useEffect, useState} from 'react';
import {useParams, useRouter} from 'next/navigation';
import {API_ENDPOINTS, send} from '@/lib/api';
import Form from '@/components/forms/Form';
import ContainerOne from '@/components/utils/wrappers/ContainerOne';
import toastShow from '@/components/toast/toast-selector';
import {useRouteTransition} from '@/components/navigation/RouteTransitionProvider';
import {useFetcher} from '@/app/hooks/useFetcher';
import {revalidateCache} from '@/lib/cache';
import {getEditableImageUrls, isPlaceholderImage} from '@/lib/helper';

const numericValue = (value) => Number(value || 0);
const numericFields = new Set(['unit_price', 'dozen_price', 'box_price', 'dozen_units', 'box_units']);

const SectionHeader = ({title, description}: { title: string; description: string }) => (
    <div className="pt-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-600">{title}</p>
        <p className="mt-1 max-w-2xl text-sm text-slate-500">{description}</p>
    </div>
);

const priceHierarchyMessage = (state) => {
    const unitPrice = numericValue(state.unit_price);
    const groupPrice = numericValue(state.dozen_price);
    const groupUnits = numericValue(state.dozen_units);
    const boxPrice = numericValue(state.box_price);
    const boxUnits = numericValue(state.box_units);

    if (groupPrice > 0 && groupUnits <= 0) {
        return 'Group quantity must be greater than 0 when group price is set.';
    }

    if (boxPrice > 0 && boxUnits <= 0) {
        return 'Box quantity must be greater than 0 when box price is set.';
    }

    const groupUnitPrice = groupUnits > 0 ? groupPrice / groupUnits : 0;
    const boxUnitPrice = boxUnits > 0 ? boxPrice / boxUnits : 0;

    if (groupPrice > 0 && unitPrice < groupUnitPrice) {
        return `Unit price must be at least the group unit price (${groupUnitPrice.toFixed(2)} ${state.currency}).`;
    }

    if (boxPrice > 0 && groupPrice > 0 && groupUnitPrice < boxUnitPrice) {
        return `Group unit price must be at least the box unit price (${boxUnitPrice.toFixed(2)} ${state.currency}).`;
    }

    return '';
};

export const ProductDetailForm = ({variant = null}: { variant?: any }) => {
    const router = useRouter();
    const {startNavigation} = useRouteTransition();
    const path = useParams();
    const {data: currentUser} = useFetcher(API_ENDPOINTS.CURRENT_USER);
    const isAddMode = !variant
    let initial = {
        size: '',
        expired_date: '',
        unit_price: 0.0,
        dozen_price: 0.0,
        box_price: 0.0,
        dozen_units: 12,
        box_units: '',
        tags: '',
        supplier_id: null,
        currency: currentUser?.default_currency || 'usd',
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
        return getEditableImageUrls(variant.image_urls || []);
    };
    const [formState, setFormState] = useState({...initial});
    const [error, setError] = useState('');
    const [photos, setPhotos] = useState(getImageUrls());
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!isAddMode) return;
        if (!currentUser?.default_currency) return;

        setFormState((prevState) => (
            prevState.currency && prevState.currency !== 'usd'
                ? prevState
                : {...prevState, currency: currentUser.default_currency}
        ));
    }, [currentUser?.default_currency, isAddMode]);

    const updateFormField = (key, value, shouldValidatePrice = false) => {
        const nextState = {...formState, [key]: value};

        if (shouldValidatePrice) {
            setError(priceHierarchyMessage(nextState));
        }

        setFormState((s) => ({...s, [key]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        const priceError = priceHierarchyMessage(formState);
        setError(priceError);
        if (priceError) {
            toastShow('error', priceError);
            return;
        }

        setIsSubmitting(true);
        const formData = new FormData();
        Object.keys(formState).forEach((key) => {
            const value = numericFields.has(key) && formState[key] === '' ? 0 : formState[key];
            formData.append(`product_detail[${key}]`, value);
        });
        for (let i = 0; i < photos.length; i++) {
            if (isPlaceholderImage(photos[i])) {
                continue;
            }
            formData.append('product_detail[images][]', photos[i]);
        }
        try {

            if (isAddMode) {
                //submit promise
                await send('/products/' + path.id + '/product_details', formData);
                await revalidateCache({
                    keys: [
                        API_ENDPOINTS.PRODUCT_BY_ID(path.id),
                        API_ENDPOINTS.PRODUCT_DETAILS(path.id),
                    ],
                });
                toastShow('success', 'Product created successfully')
                startNavigation('Opening product details...');
                router.push('/products/' + path.id);
            } else {
                await send('/products/' + path.id + '/product_details/' + path.variant, formData, "PUT");
                await revalidateCache({
                    keys: [
                        API_ENDPOINTS.PRODUCT_BY_ID(path.id),
                        API_ENDPOINTS.PRODUCT_DETAILS(path.id),
                        API_ENDPOINTS.PRODUCT_DETAIL_BY_ID(path.id, path.variant),
                    ],
                });
                toastShow('success', 'Product updated successfully')
                startNavigation('Opening product details...');
                router.push('/products/' + path.id);
            }
        } catch (e) {
            const message = e instanceof Error ? e.message : `Could not ${isAddMode ? 'create' : 'update'} product variant`;
            setError(message);
            toastShow('error', message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const productDetailForm = [
        {
            input_type: 'custom',
            component: (
                <SectionHeader
                    title="Basic"
                    description="Identify this variant and decide whether it can be used in sales and requisitions."
                />
            ),
        },
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
                    updateFormField('size', e.target.value);
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
                    updateFormField('expired_date', e.target.value);
                },
            }
        ],
        [{
            input_type: 'checkbox',
            className: '',
            checked: Boolean(formState.status),
            labelClassName: 'sr-only',
            action: () => {
                updateFormField('status', !formState.status);
            },
            label: 'Available for sales'
        }],
        {
            input_type: 'custom',
            component: (
                <SectionHeader
                    title="Selling Prices"
                    description="Set the prices your customers pay for single units, groups, and boxes."
                />
            ),
        },
        {
            label: 'Choose currency',
            placeholder: 'Select Currency',
            name: 'currency',
            input_type: 'radio',
            className: '',
            value: formState.currency,
            options: ['fc', 'rw', 'ugx', 'usd'],
            action: (e) => {
                updateFormField('currency', e.target.value, true);
            }
        },
        [{
            label: 'Selling Unit Price',
            required: true,
            placeholder: 'Selling unit price',
            value: formState.unit_price,
            name: 'unit-price',
            input_type: 'number',
            type: 'number',
            className: '',
            action: (e) => {
                updateFormField('unit_price', e.target.value, true);
            },
        }],
        [
            {
                label: 'Selling Group Price',
                required: false,
                placeholder: 'Selling group price',
                value: formState.dozen_price,
                name: 'dozen-price',
                input_type: 'number',
                type: 'number',
                className: '',
                action: (e) => {
                    updateFormField('dozen_price', e.target.value, true);
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
                    updateFormField('dozen_units', e.target.value, true);
                },
            },
        ],
        [
            {
                label: 'Selling Box Price',
                required: false,
                placeholder: 'Selling box price',
                value: formState.box_price,
                name: 'box-price',
                input_type: 'number',
                type: 'number',
                className: '',
                action: (e) => {
                    updateFormField('box_price', e.target.value, true);
                },
            }, {
            label: 'Unit Qty in Box',
            required: false,
            placeholder: 'Box units',
            value: formState.box_units,
            name: 'box-units',
            input_type: 'number',
            type: 'number',
            className: '',
            action: (e) => {
                updateFormField('box_units', e.target.value, true);
            },
        },
        ],
        {
            input_type: 'custom',
            component: (
                <SectionHeader
                    title="Optional"
                    description="Add tags and photos only when they help you identify the variant faster."
                />
            ),
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
                updateFormField('tags', tags.join(','));
            },
        },
        {
            label: 'Photos',
            input_type: 'image-file',
            name: 'photos',
            image_props: {photos, setPhotos}
        },
        {
            input_type: 'button',
            className: 'w-full justify-center',
            type: 'submit',
            disabled: isSubmitting,
            placeholder: isSubmitting
                ? (isAddMode ? 'Creating variant...' : 'Updating variant...')
                : (isAddMode ? 'Create variant' : 'Update variant')
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
                {error && (
                    <div className="mb-4 rounded-[22px] border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium leading-6 text-rose-700">
                        {error}
                    </div>
                )}
                <div className="oasis-panel p-6 lg:p-8">
                    <Form fields={productDetailForm} handleSubmit={handleSubmit}/>
                </div>
            </div>
        </ContainerOne>
    );
};
