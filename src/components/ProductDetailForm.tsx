'use client';
import React, {useState} from 'react';
import {useParams, useRouter} from 'next/navigation';
import {API_ENDPOINTS, send} from '@/lib/api';
import Form from '@/components/forms/Form';
import ContainerOne from '@/components/utils/wrappers/ContainerOne';
import toastShow from '@/components/toast/toast-selector';
import {useRouteTransition} from '@/components/navigation/RouteTransitionProvider';
import {useFetcher} from '@/app/hooks/useFetcher';
import {revalidateCache} from '@/lib/cache';
import {getEditableImageUrls, isPlaceholderImage} from '@/lib/helper';
import Badge from '@/components/utils/Badge';
import clsx from 'clsx';

const numericFields = new Set(['dozen_units', 'box_units']);
const supplierPriceTypes = [
    {code: 'unit', label: 'Unit price'},
    {code: 'dozen', label: 'Group price'},
    {code: 'box', label: 'Box price'},
];

const SectionHeader = ({title, description}: { title: string; description: string }) => (
    <div className="pt-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-600">{title}</p>
        <p className="mt-1 max-w-2xl text-sm text-slate-500">{description}</p>
    </div>
);

export const ProductDetailForm = ({variant = null, productId, variantId, onSuccess, embedded = false}: {
    variant?: any,
    productId?: any,
    variantId?: any,
    onSuccess?: (variant?: any) => void | Promise<void>,
    embedded?: boolean
}) => {
    const router = useRouter();
    const {startNavigation} = useRouteTransition();
    const path = useParams();
    const targetProductId = productId || path.id;
    const targetVariantId = variantId || path.variant || variant?.id;
    const {data: currentUser} = useFetcher(API_ENDPOINTS.CURRENT_USER);
    const isAdmin = currentUser?.role?.toString().toLowerCase() === 'admin';
    const isAddMode = !variant
    const currentSupplier = currentUser?.supplier || null;
    const canAttachSupplierPrice = isAddMode && currentSupplier;
    let initial = {
        size: '',
        expired_date: '',
        dozen_units: 12,
        box_units: '',
        tags: '',
        approval_status: 'pending_review',
        rejection_reason: '',
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
            dozen_units: variant.dozen_units,
            box_units: variant.box_units,
            tags: variant.tags.join(','),
            approval_status: variant.approval_status || (variant.status ? 'approved' : 'pending_review'),
            rejection_reason: variant.rejection_reason || '',
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
    const [supplierPricing, setSupplierPricing] = useState({
        currency: currentUser?.default_currency || 'usd',
        prices: {},
    });

    const updateFormField = (key, value) => {
        setFormState((s) => ({...s, [key]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setError('');
        setIsSubmitting(true);
        const formData = new FormData();
        Object.keys(formState).forEach((key) => {
            if (['approval_status', 'rejection_reason'].includes(key) && !isAdmin) return;
            if (key === 'rejection_reason' && formState.approval_status !== 'rejected') return;
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
                const createdDetail = await send('/products/' + targetProductId + '/product_details', formData);
                const prices = Object.entries(supplierPricing.prices)
                    .filter(([, value]) => Number(value) > 0)
                    .reduce((acc, [key, value]) => ({...acc, [key]: value}), {});

                if (canAttachSupplierPrice && Object.keys(prices).length > 0) {
                    const priceFormData = new FormData();
                    priceFormData.append('price_detail[supplier_id]', currentSupplier.id);
                    priceFormData.append('price_detail[product_detail_id]', createdDetail.id);
                    priceFormData.append('price_detail[currency]', supplierPricing.currency);
                    Object.keys(prices).forEach((priceType) => {
                        priceFormData.append(`price_detail[prices][${priceType}]`, prices[priceType]);
                    });
                    await send(`/product_details/${createdDetail.id}/price_details`, priceFormData);
                }

                await revalidateCache({
                    keys: [
                        API_ENDPOINTS.PRODUCT_BY_ID(targetProductId),
                        API_ENDPOINTS.PRODUCT_DETAILS(targetProductId),
                    ],
                });
                toastShow('success', 'Product created successfully')
                if (onSuccess) {
                    await onSuccess(createdDetail);
                } else {
                    startNavigation('Opening product details...');
                    router.push('/products/' + targetProductId);
                }
            } else {
                const updatedDetail = await send('/products/' + targetProductId + '/product_details/' + targetVariantId, formData, "PUT");
                await revalidateCache({
                    keys: [
                        API_ENDPOINTS.PRODUCT_BY_ID(targetProductId),
                        API_ENDPOINTS.PRODUCT_DETAILS(targetProductId),
                        API_ENDPOINTS.PRODUCT_DETAIL_BY_ID(targetProductId, targetVariantId),
                    ],
                });
                toastShow('success', 'Product updated successfully')
                if (onSuccess) {
                    await onSuccess(updatedDetail);
                } else {
                    startNavigation('Opening product details...');
                    router.push('/products/' + targetProductId);
                }
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
        {
            input_type: 'custom',
            component: (
                <SectionHeader
                    title="Pack Units"
                    description="Define reusable pack quantities. Supplier-specific prices are added separately from this catalog detail."
                />
            ),
        },
        [
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
                    updateFormField('dozen_units', e.target.value);
                },
            },
            {
                label: 'Unit Qty in Box',
                required: false,
                placeholder: 'Box units',
                value: formState.box_units,
                name: 'box-units',
                input_type: 'number',
                type: 'number',
                className: '',
                action: (e) => {
                    updateFormField('box_units', e.target.value);
                },
            },
        ],
        ...(canAttachSupplierPrice ? [
            {
                input_type: 'custom',
                component: (
                    <SectionHeader
                        title="My Supplier Prices"
                        description="Optionally attach prices for your supplier account while submitting this catalog detail for review."
                    />
                ),
            },
            {
                label: 'Choose currency',
                placeholder: 'Select Currency',
                name: 'supplier_price_currency',
                input_type: 'radio',
                value: supplierPricing.currency,
                options: ['fc', 'rw', 'ugx', 'usd'],
                action: (e) => {
                    setSupplierPricing((state) => ({...state, currency: e.target.value}));
                },
            },
            supplierPriceTypes.map((priceType) => ({
                label: priceType.label,
                placeholder: priceType.label,
                value: supplierPricing.prices[priceType.code] || '',
                name: `${priceType.code}_supplier_price`,
                input_type: 'number',
                type: 'number',
                action: (e) => {
                    setSupplierPricing((state) => ({
                        ...state,
                        prices: {
                            ...state.prices,
                            [priceType.code]: e.target.value,
                        },
                    }));
                },
            })),
        ] : []),
        ...(isAdmin ? [
            {
                input_type: 'custom',
                component: (
                    <SectionHeader
                        title="Review"
                        description="Approve this catalog detail when it is ready for suppliers and requisitions."
                    />
                ),
            },
            {
                label: 'Approval status',
                name: 'approval_status',
                input_type: 'radio',
                value: formState.approval_status,
                options: isAddMode ? ['pending_review', 'approved'] : ['pending_review', 'approved', 'rejected'],
                action: (e) => updateFormField('approval_status', e.target.value),
            },
            ...(formState.approval_status === 'rejected' ? [{
                label: 'Rejection reason',
                placeholder: 'Explain why this variant is rejected',
                value: formState.rejection_reason,
                name: 'rejection_reason',
                input_type: 'text-area',
                action: (e) => updateFormField('rejection_reason', e.target.value),
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


    const innerContent = (
        <div className="mx-auto w-full max-w-5xl">
                <div className={clsx("mb-4", embedded && "sr-only")}>
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-400">Product Variants</p>
                    <h2 className="mt-2 font-display text-4xl font-bold text-slate-900">{content.header}</h2>
                    <p className="mt-3 max-w-2xl text-base text-slate-500">
                        Set shelf-life, pack quantities, tags, and media for this catalog variant. Supplier prices are managed separately.
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
