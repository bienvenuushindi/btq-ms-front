'use client'

import {useState} from "react";
import {API_ENDPOINTS} from "@/lib/api";
import {useFetcher} from "@/app/hooks/useFetcher";
import Badge from "@/components/utils/Badge";
import {Edit, Trash2} from "react-feather";
import ProtectedRoute from "@/components/ProtectedRoute";
import Container from "@/components/utils/wrappers/Container";
import CategoriesHeader from "@/components/categories/CategoriesHeader";
import ContainerOne from "@/components/utils/wrappers/ContainerOne";
import ErrorBoundary from "@/components/ErrorBoundary";
import EntityTable from "@/components/table/EntityTable";

export default function CategoriesTable(){
    const [url, setUrl] = useState(API_ENDPOINTS.CATEGORIES);
    const {data: categories = [], meta, links, error, isLoading, mutate} = useFetcher(url);
    const categoryColumns = [
        {
            key: 'name',
            type: 'text',
            label: 'Name',
            sortable: true,
        }, {
            key: 'description',
            type: 'text',
            label: 'Description',
        }, {
            key: 'active',
            type: 'text',
            label: ' Status',
            sortable: true,
            dataTransformation: (value: any) => value ? <Badge variant="success">Active</Badge> :
                <Badge variant="danger">Inactive</Badge>,
        }, {
            key: 'created_at',
            type: 'text',
            label: 'Created',
            sortable: true,

        }, {
            key: 'count_products',
            type: 'text',
            label: 'Numb of Products',
            sortable: true,
        },
    ];
    const actions = [
        {
            label: 'Edit',
            className: 'text-lightBlue-100',
            icon: (
                <Edit size={20} color="#2962FF"/>
            ),
            onClick: (row: any) => {
                console.log(`Edit clicked for row ${row.id}`);
            },
        },
        {
            label: 'Delete',
            className: 'text-red-600',
            icon: (
                <Trash2 size={20} color="#EF4444FF"/>
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