'use client'
import ProductsHeader from '@/components/products/ProductsHeader';
import Container from '@/components/Container';
import ContainerOne from '@/components/ContainerOne';
import ProductsTable from '@/components/products/ProductsTable';

export default function Products() {

  return <Container>
    <ProductsHeader/>
    <ContainerOne>
     <ProductsTable />
    </ContainerOne>
  </Container>;
}