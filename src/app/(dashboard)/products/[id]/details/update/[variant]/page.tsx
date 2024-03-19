'use client';
import Container from '@/components/Container';
import {useParams} from 'next/navigation';
import {ProductDetailForm} from '@/components/ProductDetailForm';
import {useFetcher} from "@/app/hooks/useFetcher";
import {API_ENDPOINTS} from "@/lib/api";
export default function UpdateProductDetails() {
  const params = useParams();
  const {id: productID, variant: variantID} = params;

  const {data: variant = {}, isLoading} =  useFetcher(API_ENDPOINTS.PRODUCT_DETAIL_BY_ID(productID, variantID))
  return (
    <Container>
      {isLoading ? <div>Loading ....</div> : <ProductDetailForm variant={variant}/>}
    </Container>
  );
}
