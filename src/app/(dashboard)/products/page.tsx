'use client';
import ProductsHeader from '@/components/products/ProductsHeader';
import Container from '@/components/Container';
import ContainerOne from '@/components/ContainerOne';
import ProductsTable from '@/components/products/ProductsTable';
import ProductStats from '@/components/products/ProductStats';

export default function Products() {
  return (
    <Container>
      <ProductsHeader/>
      <ContainerOne>
        <ProductStats/>
      </ContainerOne>
      <ContainerOne>
        <ProductsTable/>
      </ContainerOne>
    </Container>);
}