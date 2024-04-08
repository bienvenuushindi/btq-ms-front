'use client';
import ProductsHeader from '@/components/products/ProductsHeader';
import Container from '@/components/utils/wrappers/Container';
import ContainerOne from '@/components/utils/wrappers/ContainerOne';
import ProductsTable from '@/components/products/ProductsTable';
import ProductStats from '@/components/products/ProductStats';
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Products() {
  return (
      <ProtectedRoute>
          <Container>
              <ProductsHeader/>
              <ContainerOne>
                  <ProductStats/>
              </ContainerOne>
              <ContainerOne>
                  <ProductsTable/>
              </ContainerOne>
          </Container>
      </ProtectedRoute>
   );
}