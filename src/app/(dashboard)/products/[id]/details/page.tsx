"use client"
import {useParams} from 'next/navigation';
import {useProductDetails} from '@/app/hooks/useProductDetails';

export default function Products(){
  const path = useParams()
  const {data: productDetails, error, isLoading} = useProductDetails(path.id)
  console.log(productDetails);
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  return <div>
    <ul>
      {productDetails && productDetails.map(productDetail =>
        <li key={productDetail.id}>
          {productDetail.attributes.expired_date}, {productDetail['attributes']['size']}
          {productDetail.attributes.unit_price},
      </li>)}
    </ul>
  </div>;
}