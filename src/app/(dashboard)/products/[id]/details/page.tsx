"use client"
import {useParams} from 'next/navigation';
import {useFetcher} from "@/app/hooks/useFetcher";
import {API_ENDPOINTS} from "@/lib/api";

export default function Products(){
  const path = useParams()
  const {data: productDetails=[], error, isLoading} = useFetcher(API_ENDPOINTS.PRODUCT_DETAILS(path.id));
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  return <div>
    <ul>
      {productDetails && productDetails.map(productDetail =>
        <li key={productDetail.id}>
          {productDetail.expired_date}, {productDetail['size']}
          {productDetail.unit_price},
      </li>)}
    </ul>
  </div>;
}