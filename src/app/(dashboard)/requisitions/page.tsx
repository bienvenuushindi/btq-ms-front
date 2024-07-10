'use client';
import ContainerOne from '@/components/utils/wrappers/ContainerOne';
import Container from '@/components/utils/wrappers/Container';
import RequisitionsHeader from '@/components/requisitions/RequisitionsHeader';
import ErrorBoundary from '@/components/ErrorBoundary';
import EntityTable from '@/components/table/EntityTable';
import {useRouter} from 'next/navigation';
import Badge from '@/components/utils/Badge';
import {useState} from 'react';
import {useFetcher} from "@/app/hooks/useFetcher";
import {API_ENDPOINTS} from "@/lib/api";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Requisitions() {
  const [url, setUrl] = useState(API_ENDPOINTS.REQUISITIONS);
  const {data, meta, links, error, isLoading} =useFetcher(url);
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
      type: 'text',
      appendTransformation: (val1: any, val2: any) => isNaN(val1)? val1 : val1 +" "+ val2['price_currency']
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
      <ProtectedRoute>
        <Container>
          <RequisitionsHeader/>
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
                  entities={'requisitions'}/>
            </ErrorBoundary>
          </ContainerOne>
        </Container>
      </ProtectedRoute>
  );
}
