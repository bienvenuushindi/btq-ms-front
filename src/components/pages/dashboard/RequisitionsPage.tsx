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

export default function RequisitionsPage() {
  const [url, setUrl] = useState(API_ENDPOINTS.REQUISITIONS);
  const { data, meta, links, error, isLoading } = useFetcher(url);
  const router = useRouter();
  const {startNavigation} = useRouteTransition();
  const columns = [
    {
      key: 'date',
      label: 'Date',
      type: 'text'
    },
    {
      key: 'total_price',
      label: 'Total Amount',
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
      label: 'Items Bought',
      type: 'text'
    },
    {
      key: 'archived',
      label: 'Archived',
      type: 'text',
      dataTransformation: (value: boolean) =>
        value ? <Badge variant="success">Archived</Badge> : <Badge variant="danger">No</Badge>
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
            />
          </ErrorBoundary>
        </ContainerOne>
      </Container>
    </ProtectedRoute>
  );
}
