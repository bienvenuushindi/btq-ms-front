'use client';
import {useState} from 'react';
import dynamic from 'next/dynamic';
import ProductsHeader from '@/components/products/ProductsHeader';
import Container from '@/components/utils/wrappers/Container';
import ContainerOne from '@/components/utils/wrappers/ContainerOne';
import ProductsTable from '@/components/products/ProductsTable';
import ProductStats from '@/components/products/ProductStats';
import ProtectedRoute from "@/components/ProtectedRoute";
import {useFetcher} from '@/app/hooks/useFetcher';
import {API_ENDPOINTS} from '@/lib/api';

const SupplierMarketProductPicker = dynamic(() => import('@/components/products/SupplierMarketProductPicker'), {
  ssr: false,
});

const ProductCreateModal = dynamic(() => import('@/components/products/ProductCreateModal'), {
  ssr: false,
});

export default function Products() {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isMarketModalOpen, setMarketModalOpen] = useState(false);
  const {data: currentUser} = useFetcher(API_ENDPOINTS.CURRENT_USER);
  const isSupplier = currentUser?.role?.toString().toLowerCase() === 'supplier';

  const closeCreateModal = () => setCreateModalOpen(false);
  const closeMarketModal = () => setMarketModalOpen(false);
  const openAddModal = () => {
    if (isSupplier) {
      setMarketModalOpen(true);
    } else {
      setCreateModalOpen(true);
    }
  };

  return (
      <ProtectedRoute>
          <Container>
              <ProductsHeader onAddProduct={openAddModal} addLabel={isSupplier ? 'Add from market' : 'Add'}/>
              <ContainerOne>
                  <ProductStats/>
              </ContainerOne>
              <ContainerOne>
                  <ProductsTable/>
              </ContainerOne>
          </Container>
          <ProductCreateModal isOpen={isCreateModalOpen} onClose={closeCreateModal}/>
          <SupplierMarketProductPicker isOpen={isMarketModalOpen} onClose={closeMarketModal}/>
      </ProtectedRoute>
   );
}
