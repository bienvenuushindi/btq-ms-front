'use client';
import ContainerOne from '@/components/ContainerOne';
import Container from '@/components/Container';
import {useCategories} from '@/app/hooks/useCategories';
import CategoriesHeader from '@/components/categories/CategoriesHeader';
import {useState} from 'react';
import EntityTable from '@/components/EntityTable';
import ErrorBoundary from '@/components/ErrorBoundary';
import Badge from '@/components/Badge';

export default function Categories() {
  const [url, setUrl] = useState(null);
  const {categories, meta, links, error, isLoading, mutate} = useCategories(url);
  const categoryColumns = [
    {
      key: 'name',
      type: 'text',
      label: 'Category Name',
    }, {
      key: 'description',
      type: 'text',
      label: 'Description',
    }, {
      key: 'active',
      type: 'text',
      label: ' Status',
      dataTransformation: (value: any) => value ? <Badge variant="success">Active</Badge> : <Badge variant="danger">Inactive</Badge>,
    }, {
      key: 'created_at',
      type: 'text',
      label: 'Created',

    }, {
      key: 'count_products',
      type: 'text',
      label: 'Numb of Products',
    },
  ];
  return (
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
            entities={'categories'}
          />
        </ErrorBoundary>
      </ContainerOne>
    </Container>
  );
}