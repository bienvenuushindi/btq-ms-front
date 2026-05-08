'use client';
import {API_ENDPOINTS} from '@/lib/api';
import {useRouter, useSearchParams} from 'next/navigation';
import React, {useState} from 'react';
import Image from 'next/image';
import ProductsTableLoader from '@/components/banners/ProductsTableLoader';
import EntityTable from '@/components/table/EntityTable';
import ErrorBoundary from '@/components/ErrorBoundary';
import {Archive, Edit, RotateCcw} from 'react-feather';
import FilterCheckbox from '@/components/table/filter/FilterCheckbox';
import {getImageUrls, updateUrl} from '@/lib/helper';
import {useFetcher} from "@/app/hooks/useFetcher";
import {useRouteTransition} from '@/components/navigation/RouteTransitionProvider';
import {send} from '@/lib/api';
import toastShow from '@/components/toast/toast-selector';
import StatusIndicator from '@/components/utils/StatusIndicator';
import Badge from '@/components/utils/Badge';
import {revalidateCache} from '@/lib/cache';

export default function ProductsTable() {
    const searchParams = useSearchParams();
    const statusParam = searchParams.get('status');
    const initialStatusValue = statusParam === 'active' ? 'true' : statusParam === 'inactive' ? 'false' : null;
    const [url, setUrl] = useState(() => updateUrl(API_ENDPOINTS.PRODUCTS, {status: initialStatusValue}));
    const {data: products = [], meta, links, error, isLoading, mutate} = useFetcher(url)
    const [selectedFilter, setSelectedFilter] = React.useState(
        statusParam === 'active' || statusParam === 'inactive' ? statusParam : 'all'
    );

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

    const formatUnitPrice = (detail: any) => {
        if (detail.unit_price === null || detail.unit_price === undefined || detail.unit_price === '') {
            return 'No unit price';
        }

        return `${detail.unit_price} ${detail.currency || ''}`.trim();
    };

    const toggleArchiveStatus = async (row) => {
        const formData = new FormData();
        formData.append('product[active]', String(!row.active));

        try {
            await send(`/products/${row.id}`, formData, 'PUT');
            await revalidateCache({
                keys: [API_ENDPOINTS.PRODUCT_BY_ID(row.id)],
                prefixes: [API_ENDPOINTS.PRODUCTS, API_ENDPOINTS.PRODUCT_STATS],
            });
            await mutate();
            toastShow('success', row.active ? 'Product archived successfully' : 'Product restored successfully');
        } catch (error) {
            toastShow('error', 'Could not update product status');
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
                                Unit price: <span className="text-slate-900">{formatUnitPrice(detail)}</span>
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
            key: 'active',
            sortable: true,
            label: 'Status',
            dataTransformation: (value: any) => (
                <StatusIndicator active={value}/>
            )
        },
    ];

    const actions = [
        {
            label: 'Edit',
            className: 'text-sky-700',
            icon: (
                <Edit size={20} color="#0369a1"/>
            ),
            onClick: (row) => {
                startNavigation('Opening product editor...');
                router.push(`/products/update/${row.id}`);
            },
        },
        {
            label: (row) => row.active ? 'Archive' : 'Restore',
            className: (row) => row.active ? 'text-amber-700' : 'text-emerald-700',
            icon: (row) => (
                row.active ? <Archive size={20} color="#b45309"/> : <RotateCcw size={20} color="#15803d"/>
            ),
            onClick: toggleArchiveStatus,
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
        </ErrorBoundary>
    );
}
