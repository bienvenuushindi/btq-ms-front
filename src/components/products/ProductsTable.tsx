'use client';
import {API_ENDPOINTS} from '@/lib/api';
import {useRouter, useSearchParams} from 'next/navigation';
import React, {useState} from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import ProductsTableLoader from '@/components/banners/ProductsTableLoader';
import EntityTable from '@/components/table/EntityTable';
import ErrorBoundary from '@/components/ErrorBoundary';
import {CheckCircle, Edit, XCircle} from 'react-feather';
import FilterCheckbox from '@/components/table/filter/FilterCheckbox';
import {getImageUrls, updateUrl} from '@/lib/helper';
import {useFetcher} from "@/app/hooks/useFetcher";
import {useRouteTransition} from '@/components/navigation/RouteTransitionProvider';
import {send} from '@/lib/api';
import toastShow from '@/components/toast/toast-selector';
import Badge from '@/components/utils/Badge';
import {revalidateCache} from '@/lib/cache';

const ProductCreateModal = dynamic(() => import('@/components/products/ProductCreateModal'), {
    ssr: false,
});

export default function ProductsTable() {
    const searchParams = useSearchParams();
    const statusParam = searchParams.get('status');
    const initialStatusValue = statusParam === 'active' ? 'true' : statusParam === 'inactive' ? 'false' : null;
    const [url, setUrl] = useState(() => updateUrl(API_ENDPOINTS.PRODUCTS, {status: initialStatusValue}));
    const {data: products = [], meta, links, error, isLoading, mutate} = useFetcher(url)
    const {data: currentUser} = useFetcher(API_ENDPOINTS.CURRENT_USER);
    const isAdmin = currentUser?.role?.toString().toLowerCase() === 'admin';
    const [selectedFilter, setSelectedFilter] = React.useState(
        statusParam === 'active' || statusParam === 'inactive' ? statusParam : 'all'
    );
    const [editingProduct, setEditingProduct] = useState(null);

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
            dataTransformation: (value: any) => (
                <div className="space-y-2">
                    {value.length === 0 && (
                        <span className="text-sm text-slate-400">No variants yet</span>
                    )}
                    {value.map((detail) => (
                        <div
                            key={detail.id}
                            className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                        >
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="font-semibold text-slate-900">{detail.size}</span>
                                <Badge
                                    variant={getExpiryVariant(detail.expired_date)}
                                    size="small"
                                    className="px-2 py-0.5 normal-case tracking-normal"
                                >
                                    {detail.expired_date ? `Expired ${detail.expired_date}` : 'No expiry date'}
                                </Badge>
                            </div>
                            <p className="mt-1 text-xs font-medium text-slate-600">
                                Supplier prices: <span className="text-slate-900">{detail.suppliers?.length || 0}</span>
                            </p>
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
    ];

    const actions = [
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


    const Filters = () => {

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
            <div className="flex space-x-2">
                <h2 className="font-bold text-gray-500">Status</h2>
                <FilterCheckbox field={field}/>
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
            />
            <ProductCreateModal
                isOpen={Boolean(editingProduct)}
                onClose={closeEditModal}
                product={editingProduct}
            />
        </ErrorBoundary>
    );
}
