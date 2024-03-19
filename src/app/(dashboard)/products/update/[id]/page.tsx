'use client';
import Container from '@/components/Container';
import {useParams} from 'next/navigation';
import {ProductForm} from '@/components/ProductForm';
import {useFetcher} from "@/app/hooks/useFetcher";
import {API_ENDPOINTS} from "@/lib/api";


export default function UpdateProduct() {
  const params = useParams();
  const productID = params.id;
  const {data: product={}, isLoading} =useFetcher(API_ENDPOINTS.PRODUCT_BY_ID(productID));
  return (
    <Container>
      {isLoading ? <div>Loading ....</div> : <ProductForm product={product}/>}
    </Container>
  );
}
