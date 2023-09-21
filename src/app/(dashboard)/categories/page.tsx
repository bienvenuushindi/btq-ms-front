'use client';
import ContainerOne from '@/components/ContainerOne';
import Container from '@/components/Container';
import {useCategories} from '@/app/hooks/useCategories';
import CategoriesHeader from '@/components/categories/CategoriesHeader';
import {useState} from 'react';
import EntityTable from '@/components/EntityTable';
import {categoryColumns} from '@/components/categories/CategoriesTable';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function Categories() {
  const [url, setUrl] = useState(null);
  const {categories, meta, links, error, isLoading, mutate} = useCategories(url);

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