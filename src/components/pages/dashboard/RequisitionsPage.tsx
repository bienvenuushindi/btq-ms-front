'use client';

import ContainerOne from '@/components/utils/wrappers/ContainerOne';
import Container from '@/components/utils/wrappers/Container';
import RequisitionsHeader from '@/components/requisitions/RequisitionsHeader';
import ErrorBoundary from '@/components/ErrorBoundary';
import EntityTable from '@/components/table/EntityTable';
import { useRouter } from 'next/navigation';
import Badge from '@/components/utils/Badge';
import { useState } from 'react';
import { useFetcher } from '@/app/hooks/useFetcher';
import { API_ENDPOINTS } from '@/lib/api';
import ProtectedRoute from '@/components/ProtectedRoute';
import {useRouteTransition} from '@/components/navigation/RouteTransitionProvider';
import FilterCheckbox from '@/components/table/filter/FilterCheckbox';
import {updateUrl} from '@/lib/helper';

export default function RequisitionsPage() {
  const [url, setUrl] = useState(() => updateUrl(API_ENDPOINTS.REQUISITIONS, {status: null}));
  const { data, meta, links, error, isLoading } = useFetcher(url);
  const router = useRouter();
  const {startNavigation} = useRouteTransition();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const columns = [
    {
      key: 'date',
      label: 'Date',
      type: 'text'
    },
    {
      key: 'total_price',
      label: 'Total Purchased So Far',
      type: 'text',
      appendTransformation: (val1: any, val2: any) => (isNaN(val1) ? val1 : `${val1} ${val2.price_currency}`)
    },
    {
      key: 'count_products',
      label: 'Items',
      type: 'text'
    },
    {
      key: 'count_products_bought',
      label: 'Items Purchased',
      type: 'text'
    },
    {
      key: 'archived',
      label: 'Archived',
      type: 'text',
      dataTransformation: (value: boolean) =>
        value ? <Badge variant="secondary">Archived</Badge> : <Badge variant="success">No</Badge>
    },
    {
      key: 'Show',
      type: 'button',
      label: 'Show',
      action: async (row: any) => {
        startNavigation('Opening requisition details...');
        await router.push(`/requisitions/${row.id}`);
      }
    }
  ];

  const Filters = () => {
    const archiveFilter = {
      all: null,
      archived: 'archived',
      not_archived: 'not_archived',
    };

    const handleFilterChange = (selectedFilters) => {
      setUrl((prevUrl) => updateUrl(prevUrl, {status: selectedFilters}));
    };

    const field = {
      name: 'status',
      input_type: 'radio',
      className: '',
      value: selectedFilter,
      options: ['all', 'archived', 'not_archived'],
      action: (e) => {
        setSelectedFilter(e.target.value);
        handleFilterChange(archiveFilter[e.target.value]);
      }
    };

    return (
      <div className="flex space-x-2">
        <h2 className="font-bold text-gray-500">Archive</h2>
        <FilterCheckbox field={field}/>
      </div>
    );
  };

  return (
    <ProtectedRoute>
      <Container>
        <RequisitionsHeader />
        <ContainerOne>
          <ErrorBoundary error={error}>
            <EntityTable
              isLoading={isLoading}
              searchable={false}
              meta={meta}
              links={links}
              data={data}
              updateList={setUrl}
              columns={columns}
              entities="requisitions"
              filters={<Filters/>}
            />
          </ErrorBoundary>
        </ContainerOne>
      </Container>
    </ProtectedRoute>
  );
}
