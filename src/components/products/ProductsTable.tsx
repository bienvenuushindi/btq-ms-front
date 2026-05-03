'use client';
import {API_ENDPOINTS} from '@/lib/api';
import {useRouter} from 'next/navigation';
import React, {useState} from 'react';
import ProductsTableLoader from '@/components/banners/ProductsTableLoader';
import EntityTable from '@/components/table/EntityTable';
import ErrorBoundary from '@/components/ErrorBoundary';
import {Edit, Trash2} from 'react-feather';
import FilterCheckbox from '@/components/table/filter/FilterCheckbox';
import {updateUrl} from '@/lib/helper';
import {useFetcher} from "@/app/hooks/useFetcher";
import Dot from "@/components/utils/Dot";
import {useRouteTransition} from '@/components/navigation/RouteTransitionProvider';

export default function ProductsTable() {
    const [url, setUrl] = useState(API_ENDPOINTS.PRODUCTS);
    const {data: products = [], meta, links, error, isLoading} = useFetcher(url)
    const [selectedFilter, setSelectedFilter] = React.useState('all');

    const router = useRouter();
    const {startNavigation} = useRouteTransition();
    const columns = [
        {
            key: 'active',
            sortable: true,
            label: 'Status',
            dataTransformation: (value: any) => (
                <div className="flex items-center gap-2">
                    <Dot variant={value ? 'success' : 'danger'}/>
                    <span className="text-sm font-semibold text-slate-700">{value ? 'Active' : 'Inactive'}</span>
                </div>
            )
        },
        {
            key: 'image_urls',
            type: 'picture',
            label: 'Image',
            dataTransformation: (value: any) => value?.[0]
        },
        {
            key: 'name',
            label: 'Product',
            sortable: true,
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
                                <span className="text-slate-400">/</span>
                                <span className="text-slate-600">Shelf life:</span>
                                <span className="font-medium text-slate-700">{detail.expired_date || 'N/A'}</span>
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
            label: 'Delete',
            className: 'text-rose-700',
            icon: (
                <Trash2 size={20} color="#be123c"/>
            ),
            onClick: (row) => {
                console.log(`Delete clicked for row ${row.id}`);
            },
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
