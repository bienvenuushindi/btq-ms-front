'use client';
import {useParams} from 'next/navigation';
import ProductItem from '@/components/products/ProductItem';
import Card from '@/components/Card';
import {ProductDetailsTable} from '@/components/products/ProductDetailsTable';
import {SidebarContext} from '@/components/sidebar/SidebarContainer';
import SidebarContentSelector from '@/components/SidebarContentSelector';
import {useContext} from 'react';
import Container from '@/components/Container';
import ContainerOne from '@/components/ContainerOne';
import ProductDetailsHeader from '@/components/products/ProductDetailsHeader';
import ProductItemLoader from '@/components/banners/ProductItemLoader';
import ErrorBoundary from '@/components/ErrorBoundary';
import {useFetcher} from "@/app/hooks/useFetcher";
import {API_ENDPOINTS} from "@/lib/api";


export default function Product() {
  const {openBar} = useContext(SidebarContext);
  const params = useParams();
  const productId = params.id;
  const {data: product={}, error, isLoading} = useFetcher(API_ENDPOINTS.PRODUCT_BY_ID(productId));
  return <Container>
    <ProductDetailsHeader product={product}/>
    <ContainerOne>
      {isLoading ? <Card className="w-full"><ProductItemLoader/></Card> :(
        <ErrorBoundary error={error}>
          {product && (
            <ProductItem key={product.id} product={product}/>
          )}
        </ErrorBoundary>
      )}
    </ContainerOne>
    <ContainerOne>
      <Card className="w-full">
        {product && (
        <ProductDetailsTable product={product} isLoading={isLoading}/>
        )}
      </Card>
      <SidebarContentSelector target={openBar.target}/>
    </ContainerOne>
  </Container>;
}