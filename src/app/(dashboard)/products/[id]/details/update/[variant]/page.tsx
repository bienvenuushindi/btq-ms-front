'use client';
import Container from '@/components/Container';
import {useParams} from 'next/navigation';
import {useProductVariant} from '@/app/hooks/useProductVariant';
import {ProductDetailForm} from '@/components/ProductDetailForm';
export default function UpdateProductDetails() {
  const params = useParams();
  const {id: productID, variant: variantID} = params;

  const {data: result = {}, isLoading} = useProductVariant(productID,variantID);
  console.log(result)
  const {attributes: variant = {}} = result;
  return (
    <Container>
      {isLoading ? <div>Loading ....</div> : <ProductDetailForm variant={variant}/>}
    </Container>
  );
}
