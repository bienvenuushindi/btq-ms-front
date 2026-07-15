'use client';
import {API_ENDPOINTS} from '@/lib/api';
import {useRouter, useSearchParams} from 'next/navigation';
import React, {useState} from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import ProductsTableLoader from '@/components/banners/ProductsTableLoader';
import EntityTable from '@/components/table/EntityTable';
import ErrorBoundary from '@/components/ErrorBoundary';
import {CheckCircle, Edit, Trash2, XCircle} from 'react-feather';
import FilterCheckbox from '@/components/table/filter/FilterCheckbox';
import {getImageUrls, updateUrl} from '@/lib/helper';
import {useFetcher} from "@/app/hooks/useFetcher";
import {useRouteTransition} from '@/components/navigation/RouteTransitionProvider';
import {deleteItem, send} from '@/lib/api';
import toastShow from '@/components/toast/toast-selector';
import Badge from '@/components/utils/Badge';
import {revalidateCache} from '@/lib/cache';
import DeleteAlert from '@/components/DeleteAlert';

const ProductCreateModal = dynamic(() => import('@/components/products/ProductCreateModal'), {
    ssr: false,
});

const SupplierShopVariantPicker = dynamic(() => import('@/components/products/SupplierShopVariantPicker'), {
    ssr: false,
});

const flattenCategories = (categories = [], depth = 0) => (
    categories.flatMap((category) => [
        {
            id: category.id,
            name: `${'-- '.repeat(depth)}${category.name}`,
        },
        ...flattenCategories(category.children || [], depth + 1),
    ])
);

const formatQuantityType = (quantityType) => (
    quantityType === 'dozen' ? 'Group' : String(quantityType || '').replace('_', ' ')
);

const formatShopPrice = (priceDetail) => (
    `${formatQuantityType(priceDetail.quantity_type)} / ${priceDetail.price} ${String(priceDetail.currency || '').toUpperCase()}`
);

type ProductsTableProps = {
    initialCategoryId?: string | number | null;
    categoryFilterLocked?: boolean;
};

export default function ProductsTable({initialCategoryId = null, categoryFilterLocked = false}: ProductsTableProps = {}) {
    const searchParams = useSearchParams();
    const statusParam = searchParams.get('status');
    const initialStatusValue = statusParam === 'active' ? 'true' : statusParam === 'inactive' ? 'false' : null;
    const [url, setUrl] = useState(() => updateUrl(API_ENDPOINTS.PRODUCTS, {
        status: initialStatusValue,
        category_id: initialCategoryId?.toString() || null,
    }));
    const {data: products = [], meta, links, error, isLoading, mutate} = useFetcher(url)
    const {data: currentUser} = useFetcher(API_ENDPOINTS.CURRENT_USER);
    const {data: categories = []} = useFetcher(API_ENDPOINTS.CATEGORY_TREE_STRUCTURE);
    const currentRole = currentUser?.role?.toString().toLowerCase();
    const isAdmin = currentRole === 'admin';
    const isSupplier = currentRole === 'supplier';
    const [selectedFilter, setSelectedFilter] = React.useState(
        statusParam === 'active' || statusParam === 'inactive' ? statusParam : 'all'
    );
    const [editingProduct, setEditingProduct] = useState(null);
    const [editingShopProduct, setEditingShopProduct] = useState(null);
    const [variantToRemove, setVariantToRemove] = useState(null);

    const router = useRouter();
    const {startNavigation} = useRouteTransition();

    const getExpiryVariant = (expiredDate?: string) => {
        if (!expiredDate) return 'secondary';

        const expiry = new Date(expiredDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const diffInMs = expiry.getTime() - today.getTime();
        const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInDays < 0) return 'danger';
        if (diffInDays <= 30) return 'warning';
        return 'success';
    };

    const approvalBadgeVariant = (status) => {
        if (status === 'approved') return 'success';
        if (status === 'rejected') return 'danger';
        return 'warning';
    };

    const supplierStatusBadgeVariant = (status) => (
        status === false || status === 'inactive' ? 'danger' : 'success'
    );

    const scopeBadgeVariant = (scope) => (
        scope === 'private_catalog' ? 'secondary' : 'success'
    );

    const updateApprovalStatus = async (row) => {
        if (!isAdmin) {
            toastShow('error', 'Only admins can validate catalog products');
            return;
        }
        const nextStatus = row.approval_status === 'approved' ? 'rejected' : 'approved';
        const formData = new FormData();
        formData.append('product[approval_status]', nextStatus);

        try {
            await send(`/products/${row.id}`, formData, 'PUT');
            await revalidateCache({
                keys: [API_ENDPOINTS.PRODUCT_BY_ID(row.id)],
                prefixes: [API_ENDPOINTS.PRODUCTS, API_ENDPOINTS.PRODUCT_STATS],
            });
            await mutate();
            toastShow('success', nextStatus === 'approved' ? 'Product approved successfully' : 'Product rejected successfully');
        } catch (error) {
            toastShow('error', 'Could not update product approval status');
        }
    };

    const closeEditModal = () => setEditingProduct(null);
    const closeShopEditModal = () => setEditingShopProduct(null);

    const removeShopVariant = async () => {
        if (!variantToRemove) return;

        try {
            await deleteItem(`/supplier_product_details/product_detail/${variantToRemove.detail.id}`);
            await revalidateCache({
                prefixes: [API_ENDPOINTS.PRODUCTS, API_ENDPOINTS.PRODUCT_STATS, API_ENDPOINTS.PRODUCT_MARKET],
            });
            await mutate();
            toastShow('success', 'Variant removed from your shop');
        } catch (error) {
            toastShow('error', error instanceof Error ? error.message : 'Could not remove variant from your shop');
        } finally {
            setVariantToRemove(null);
        }
    };

    const columns = [
        {
            key: 'name',
            label: 'Product Name',
            sortable: true,
            dataTransformation: (value: any, row: any) => {
                const imageSrc = getImageUrls(row.image_urls || [])[0];

                return (
                    <div className="flex min-w-0 items-center gap-3">
                        <Image
                            src={imageSrc}
                            alt={value}
                            width={36}
                            height={36}
                            className="h-9 w-9 rounded-full border border-slate-200 bg-white object-cover"
                            priority
                        />
                        <span className="truncate font-semibold text-slate-900">{value}</span>
                    </div>
                );
            }
        },
        {
            key: 'product_details',
            label: 'Variants',
            dataTransformation: (value: any, row: any) => (
                <div className="space-y-2">
                    {value.length === 0 && (
                        <span className="text-sm text-slate-400">No variants yet</span>
                    )}
                    {value.map((detail) => (
                        <div
                            key={detail.id}
                            className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-semibold text-slate-900">{detail.size}</span>
                                        <Badge
                                            variant={getExpiryVariant(detail.expired_date)}
                                            size="small"
                                            className="px-2 py-0.5 normal-case tracking-normal"
                                        >
                                            {detail.expired_date ? `Expired ${detail.expired_date}` : 'No expiry date'}
                                        </Badge>
                                        {isSupplier && detail.supplier_status !== undefined && detail.supplier_status !== null ? (
                                            <Badge
                                                variant={supplierStatusBadgeVariant(detail.supplier_status)}
                                                size="small"
                                                className="px-2 py-0.5 normal-case tracking-normal"
                                            >
                                                Shop {detail.supplier_status ? 'active' : 'inactive'}
                                            </Badge>
                                        ) : null}
                                    </div>
                                    {isSupplier ? (
                                        <div className="mt-2 flex flex-wrap gap-1.5">
                                            {(detail.shop_prices || []).length === 0 ? (
                                                <span className="text-xs font-medium text-slate-500">No shop prices yet</span>
                                            ) : (
                                                detail.shop_prices.map((priceDetail) => (
                                                    <span
                                                        key={priceDetail.id || priceDetail.quantity_type}
                                                        className="rounded-full border border-slate-200 bg-white px-2 py-0.5 text-xs font-semibold capitalize text-slate-700"
                                                    >
                                                        {formatShopPrice(priceDetail)}
                                                    </span>
                                                ))
                                            )}
                                        </div>
                                    ) : (
                                        <p className="mt-1 text-xs font-medium text-slate-600">
                                            Suppliers <span className="text-slate-900">{detail.suppliers?.length || 0}</span>
                                        </p>
                                    )}
                                </div>
                                {isSupplier ? (
                                    <div className="flex shrink-0 items-center gap-1">
                                        <button
                                            type="button"
                                            onClick={() => setEditingShopProduct({...row, product_details: [detail]})}
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-sky-100 bg-white text-sky-700 transition hover:border-sky-200 hover:bg-sky-50"
                                            aria-label={`Edit ${detail.size}`}
                                            title="Edit shop variant"
                                        >
                                            <Edit size={14}/>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setVariantToRemove({product: row, detail})}
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-rose-100 bg-white text-rose-700 transition hover:border-rose-200 hover:bg-rose-50"
                                            aria-label={`Remove ${detail.size}`}
                                            title="Remove variant"
                                        >
                                            <Trash2 size={14}/>
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    ))}
                </div>
            )
        },
        {
            key: 'View',
            type: 'button',
            label: 'Details',
            action: async (data) => {
                startNavigation('Opening product details...');
                await router.push('/products/' + data.id);
            }
        },
        {
            key: 'approval_status',
            sortable: true,
            label: 'Approval',
            dataTransformation: (value: any, row: any) => {
                const status = value || (row.active ? 'approved' : 'pending_review');
                return (
                    <Badge variant={approvalBadgeVariant(status)} size="small" className="capitalize">
                        {status.replace('_', ' ')}
                    </Badge>
                );
            }
        },
        ...(isAdmin ? [{
            key: 'active',
            sortable: true,
            label: 'Status',
            dataTransformation: (value: any) => (
                <Badge variant={value ? 'success' : 'danger'} size="small" className="capitalize">
                    {value ? 'Active' : 'Inactive'}
                </Badge>
            )
        }] : []),
        ...(isSupplier ? [{
            key: 'catalog_scope',
            label: 'Scope',
            dataTransformation: (value: any) => (
                <Badge variant={scopeBadgeVariant(value)} size="small" className="capitalize">
                    {(value || 'public_catalog').replace('_catalog', '').replace('_', ' ')}
                </Badge>
            )
        }] : []),
    ];

    const adminActions = [
        {
            label: 'Edit',
            className: 'text-sky-700',
            icon: (
                <Edit size={15} color="#0369a1"/>
            ),
            onClick: (row) => {
                setEditingProduct(row);
            },
        },
        {
            label: (row) => row.approval_status === 'approved' ? 'Reject' : 'Approve',
            className: (row) => row.approval_status === 'approved' ? 'text-rose-700' : 'text-emerald-700',
            icon: (row) => (
                row.approval_status === 'approved' ? <XCircle size={15} color="#be123c"/> : <CheckCircle size={15} color="#15803d"/>
            ),
            onClick: updateApprovalStatus,
        },
    ];

    const actions = isSupplier ? null : adminActions;


    const Filters = () => {
        const categoryOptions = flattenCategories(categories);

        const statusFilter = {
            all: null,
            active: true,
            inactive: false
        }

        const field = {
            name: 'status',
            input_type: 'radio',
            className: '',
            value: selectedFilter,
            options: ['all', 'active', 'inactive'],
            action: (e) => {
                setSelectedFilter(e.target.value);
                handleFilterChange(statusFilter[e.target.value]);
            }
        }

        const handleFilterChange = (selectedFilters) => {
            setUrl((prevUrl) => {
                return updateUrl(prevUrl, {status: selectedFilters});
            });
        };

        return (
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
                <div className="flex space-x-2">
                    <h2 className="font-bold text-gray-500">Status</h2>
                    <FilterCheckbox field={field}/>
                </div>
                {!categoryFilterLocked ? (
                    <select
                        className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                        onChange={(event) => {
                            setUrl((prevUrl) => updateUrl(prevUrl, {category_id: event.target.value || null}));
                        }}
                        defaultValue={initialCategoryId?.toString() || ''}
                    >
                        <option value="">All categories</option>
                        {categoryOptions.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                ) : null}
            </div>
        );
    }

    return (
        <ErrorBoundary error={error}>
            <EntityTable
                isLoading={isLoading}
                loader={<ProductsTableLoader/>}
                columns={columns}
                data={products}
                meta={meta}
                links={links}
                updateList={setUrl}
                actions={actions}
                filters={<Filters/>}
                metaLabels={{total: 'Groups'}}
            />
            <ProductCreateModal
                isOpen={Boolean(editingProduct)}
                onClose={closeEditModal}
                product={editingProduct}
            />
            {editingShopProduct ? (
                <SupplierShopVariantPicker
                    product={editingShopProduct}
                    currentUser={currentUser}
                    isOpen={Boolean(editingShopProduct)}
                    onClose={closeShopEditModal}
                    showTrigger={false}
                    onSaved={async () => {
                        await mutate();
                    }}
                />
            ) : null}
            {variantToRemove ? (
                <DeleteAlert
                    onCancel={() => setVariantToRemove(null)}
                    onDelete={removeShopVariant}
                    show={Boolean(variantToRemove)}
                    message={`Remove ${variantToRemove.product.name} - ${variantToRemove.detail.size} from your shop? This will remove your local prices and status for this variant.`}
                />
            ) : null}
        </ErrorBoundary>
    );
}
