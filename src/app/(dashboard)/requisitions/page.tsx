'use client';
import {useRequisitions} from '@/app/hooks/useRequisitions';
import ContainerOne from '@/components/ContainerOne';
import Container from '@/components/Container';
import RequisitionsHeader from '@/components/requisitions/RequisitionsHeader';
import ErrorBoundary from '@/components/ErrorBoundary';
import EntityTable from '@/components/EntityTable';
import {useRouter} from 'next/navigation';
import Badge from '@/components/Badge';
import {useState} from 'react';

export default function Requisitions() {
  const [url, setUrl] = useState(null);
  const {requisitions, meta, links, error, isLoading} = useRequisitions(url);
  const router = useRouter()
  const columns = [
    {
      key: 'date',
      label: 'Date',
      type: 'text'
    },
    {
      key: 'total_price',
      label: 'Total Amount',
      type: 'text'
    },
    {
      key: 'price_currency',
      label: 'Currency',
      type: 'text'
    },
    {
      key: 'count_products',
      label: 'No of Products ',
      type: 'text'
    },
    {
      key: 'count_products_bought',
      label: 'Products Bought',
      type: 'text'
    },
    {
      key: 'archived',
      label: 'Archived',
      type: 'text',
      dataTransformation: (value) => {
        return value ? <Badge variant="success">Archived</Badge> : <Badge variant="danger">No</Badge>
      }
    },
    {
      key: 'Show',
      type: 'button',
      label: 'Show',
      action: async (data) => {
        await router.push('/requisitions/' + data.id)
      }
    }
  ];
  return (
    <Container>
      <RequisitionsHeader/>
      <ContainerOne>
        <ErrorBoundary error={error}>
          <EntityTable
            isLoading={isLoading}
            searchable={false}
            meta={meta}
            links={links}
            data={requisitions}
            updateList={setUrl}
            columns={columns}
            entities={'requisitions'}/>
        </ErrorBoundary>
      </ContainerOne>
    </Container>
  );
}