'use client'

import React, {useState} from "react";
import {API_ENDPOINTS} from "@/lib/api";
import {useFetcher} from "@/app/hooks/useFetcher";
import {Edit, Trash2} from "react-feather";
import ProtectedRoute from "@/components/ProtectedRoute";
import Container from "@/components/utils/wrappers/Container";
import CategoriesHeader from "@/components/categories/CategoriesHeader";
import ContainerOne from "@/components/utils/wrappers/ContainerOne";
import ErrorBoundary from "@/components/ErrorBoundary";
import EntityTable from "@/components/table/EntityTable";
import StatusIndicator from '@/components/utils/StatusIndicator';
import CreateCategory from '@/components/categories/CreateCategory';
import TransitionLink from '@/components/navigation/TransitionLink';

const categoryProductsHref = (categoryId: any) => `/categories/${categoryId}/products`;
const metricValue = (value: any) => value ?? 0;

export default function CategoriesTable(){
    const [url, setUrl] = useState(API_ENDPOINTS.CATEGORIES);
    const {data: categories = [], meta, links, error, isLoading, mutate} = useFetcher(url);
    const categoryColumns = [
        {
            key: 'name',
            type: 'text',
            label: 'Name',
            sortable: true,
            dataTransformation: (value: any, row: any) => (
                <TransitionLink
                    href={categoryProductsHref(row.id)}
                    loadingMessage={`Opening ${value} variants...`}
                    className="font-semibold text-sky-700 underline-offset-4 transition hover:text-sky-900 hover:underline"
                >
                    {value}
                </TransitionLink>
            ),
        }, {
            key: 'description',
            type: 'text',
            label: 'Description',
        }, {
            key: 'count_products',
            type: 'text',
            label: 'Selected / Market',
            sortable: true,
            dataTransformation: (value: any, row: any) => (
                <TransitionLink
                    href={categoryProductsHref(row.id)}
                    loadingMessage={`Opening ${row.name} variants...`}
                    className="inline-flex min-w-[4.25rem] justify-center rounded-full border border-sky-200 bg-sky-100 px-2.5 py-1 text-xs font-bold text-sky-700 transition hover:bg-sky-200"
                >
                    {metricValue(row.selected_variants_count)} / {metricValue(row.market_variants_count)}
                </TransitionLink>
            ),
        }, {
            key: 'active',
            type: 'text',
            label: ' Status',
            sortable: true,
            dataTransformation: (value: any) => <StatusIndicator active={value}/>,
        },
    ];
    const actions = [
        {
            label: 'Edit',
            className: 'text-lightBlue-100',
            icon: (
                <Edit size={15} color="#2962FF"/>
            ),
            render: (row: any, content: React.ReactNode) => (
                <CreateCategory category={row} revalidate={mutate} trigger={content}/>
            ),
        },
        {
            label: 'Delete',
            className: 'text-red-600',
            icon: (
                <Trash2 size={15} color="#EF4444FF"/>
            ),
            onClick: (row: any) => {
                console.log(`Delete clicked for row ${row.id}`);
            },
        },
    ];
    return (
        <ProtectedRoute>
            <Container>
                <CategoriesHeader revalidate={mutate}/>
                <ContainerOne>
                    <ErrorBoundary error={error}>
                        <EntityTable
                            isLoading={isLoading}
                            meta={meta}
                            links={links}
                            data={categories}
                            updateList={setUrl}
                            columns={categoryColumns}
                            actions={actions}
                        />
                    </ErrorBoundary>
                </ContainerOne>
            </Container>
        </ProtectedRoute>
    );
}
