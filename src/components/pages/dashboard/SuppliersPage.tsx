'use client';

import { useContext, useState } from 'react';
import dynamic from 'next/dynamic';
import { API_ENDPOINTS } from '@/lib/api';
import { SidebarContext } from '@/components/sections/sidebar/SidebarContainer';
import SidebarContentSelector from '@/components/sections/sidebar/SidebarContentSelector';
import SuppliersHeader from '@/components/suppliers/SuppliersHeader';
import ContainerOne from '@/components/utils/wrappers/ContainerOne';
import Container from '@/components/utils/wrappers/Container';
import ErrorBoundary from '@/components/ErrorBoundary';
import EntityTable from '@/components/table/EntityTable';
import { Edit, Trash2 } from 'react-feather';
import { useFetcher } from '@/app/hooks/useFetcher';
import ProtectedRoute from '@/components/ProtectedRoute';

const SupplierModal = dynamic(() => import('@/components/suppliers/SupplierModal'), {
  ssr: false,
});

export default function SuppliersPage() {
  const [url, setUrl] = useState(API_ENDPOINTS.SUPPLIERS);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const { openBar, setOpenBar, setSidebarData } = useContext(SidebarContext);
  const { data: suppliers = [], meta, links, error, isLoading } = useFetcher(url);
  const closeCreateModal = () => setCreateModalOpen(false);
  const closeEditModal = () => setEditingSupplier(null);
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
      icon: <Edit size={15} color="#2962FF" />,
      onClick: (row: any) => {
        setEditingSupplier(row);
      }
    },
    {
      label: 'Delete',
      className: 'text-red-600',
      icon: <Trash2 size={15} color="#EF4444FF" />,
      onClick: (row: any) => {
        console.log(`Delete clicked for row ${row.id}`);
      }
    }
  ];

  return (
    <ProtectedRoute>
      <Container>
        <SuppliersHeader onAddSupplier={() => setCreateModalOpen(true)} />
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
            <SupplierModal isOpen={isCreateModalOpen} onClose={closeCreateModal} />
            <SupplierModal isOpen={Boolean(editingSupplier)} onClose={closeEditModal} supplier={editingSupplier} />
          </ErrorBoundary>
        </ContainerOne>
      </Container>
    </ProtectedRoute>
  );
}
