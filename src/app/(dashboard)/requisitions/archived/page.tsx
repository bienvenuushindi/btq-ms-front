import ContainerOne from '@/components/ContainerOne';
import ErrorBoundary from '@/components/ErrorBoundary';
import EntityTable from '@/components/EntityTable';
import {useState} from 'react';
import RequisitionsHeader from '@/components/requisitions/RequisitionsHeader';
import Container from '@/components/Container';
import {useRequisitions} from '@/app/hooks/useRequisitions';
import Badge from '@/components/Badge';
import {useRouter} from 'next/navigation';

export default function ArchivedRequisitions() {
  const [url, setUrl] = useState(null);
  const {requisitions, meta, links, error, isLoading} = useRequisitions(url);
  const router = useRouter();
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
        return value ? <Badge variant="success">Archived</Badge> : <Badge variant="danger">No</Badge>;
      }
    },
    {
      key: 'Show',
      type: 'button',
      label: 'Show',
      action: async (data) => {
        await router.push('/requisitions/' + data.id);
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