'use client';
import Container from '@/components/Container';
import {useParams} from 'next/navigation';
import {ProductForm} from '@/components/ProductForm';
import {useProduct} from '@/app/hooks/useProduct';


export default function UpdateProduct() {
  const params = useParams();
  const productID = params.id;
  const {data: result = {}, isLoading} = useProduct(productID);
  const {attributes: product = {}} = result;
  return (
    <Container>
      {isLoading ? <div>Loading ....</div> : <ProductForm product={product}/>}
    </Container>
  );
}
