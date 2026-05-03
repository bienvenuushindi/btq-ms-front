'use client';

import { useContext, useState } from 'react';
import { API_ENDPOINTS } from '@/lib/api';
import { SidebarContext } from '@/components/sections/sidebar/SidebarContainer';
import SidebarContentSelector from '@/components/sections/sidebar/SidebarContentSelector';
import SuppliersHeader from '@/components/suppliers/SuppliersHeader';
import ContainerOne from '@/components/utils/wrappers/ContainerOne';
import Container from '@/components/utils/wrappers/Container';
import ErrorBoundary from '@/components/ErrorBoundary';
import EntityTable from '@/components/table/EntityTable';
import { Edit, Trash2 } from 'react-feather';
import { useRouter } from 'next/navigation';
import { useFetcher } from '@/app/hooks/useFetcher';
import ProtectedRoute from '@/components/ProtectedRoute';
import {useRouteTransition} from '@/components/navigation/RouteTransitionProvider';

export default function SuppliersPage() {
  const [url, setUrl] = useState(API_ENDPOINTS.SUPPLIERS);
  const { openBar, setOpenBar, setSidebarData } = useContext(SidebarContext);
  const { data: suppliers = [], meta, links, error, isLoading } = useFetcher(url);
  const router = useRouter();
  const {startNavigation} = useRouteTransition();
  const columns = [
    {
      key: 'image_urls',
      type: 'picture',
      label: 'Supplier',
      dataTransformation: (value: any) => value[0]
    },
    {
      key: 'shop_name',
      type: 'text',
      sortable: true,
      label: 'Supplier Name'
    },
    {
      key: 'button',
      type: 'details',
      label: 'Address',
      action: (row: any) => {
        setOpenBar({ state: true, target: 'supplier_details' });
        setSidebarData(row);
      }
    }
  ];
  const actions = [
    {
      label: 'Edit',
      className: 'text-lightBlue-100',
      icon: <Edit size={20} color="#2962FF" />,
      onClick: (row: any) => {
        startNavigation('Opening supplier editor...');
        router.push(`/suppliers/update/${row.id}`);
      }
    },
    {
      label: 'Delete',
      className: 'text-red-600',
      icon: <Trash2 size={20} color="#EF4444FF" />,
      onClick: (row: any) => {
        console.log(`Delete clicked for row ${row.id}`);
      }
    }
  ];

  return (
    <ProtectedRoute>
      <Container>
        <SuppliersHeader />
        <ContainerOne>
          <ErrorBoundary error={error}>
            <EntityTable
              isLoading={isLoading}
              meta={meta}
              links={links}
              data={suppliers}
              updateList={setUrl}
              columns={columns}
              entities="suppliers"
              actions={actions}
            />
            <SidebarContentSelector target={openBar.target} />
          </ErrorBoundary>
        </ContainerOne>
      </Container>
    </ProtectedRoute>
  );
}
