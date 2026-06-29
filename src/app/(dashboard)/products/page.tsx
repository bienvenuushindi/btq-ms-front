'use client';
import {useState} from 'react';
import dynamic from 'next/dynamic';
import ProductsHeader from '@/components/products/ProductsHeader';
import Container from '@/components/utils/wrappers/Container';
import ContainerOne from '@/components/utils/wrappers/ContainerOne';
import ProductsTable from '@/components/products/ProductsTable';
import ProductStats from '@/components/products/ProductStats';
import ProtectedRoute from "@/components/ProtectedRoute";

const ProductCreateModal = dynamic(() => import('@/components/products/ProductCreateModal'), {
  ssr: false,
});

export default function Products() {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const closeCreateModal = () => setCreateModalOpen(false);

  return (
      <ProtectedRoute>
          <Container>
              <ProductsHeader onAddProduct={() => setCreateModalOpen(true)}/>
              <ContainerOne>
                  <ProductStats/>
              </ContainerOne>
              <ContainerOne>
                  <ProductsTable/>
              </ContainerOne>
          </Container>
          <ProductCreateModal isOpen={isCreateModalOpen} onClose={closeCreateModal}/>
      </ProtectedRoute>
   );
}
