'use client';
import {useParams} from 'next/navigation';
import {useFetcher} from "@/app/hooks/useFetcher";
import {API_ENDPOINTS} from "@/lib/api";


export default function PriceDetails() {
  const params = useParams();
  const productDetailId = params.id
  const {data: prices=[], error, isLoading} =  useFetcher(API_ENDPOINTS.PRICE_DETAILS(productDetailId))
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  return <div>
    <ul>
      {prices && prices.map(priceDetail => <li
          key={priceDetail.id}>{priceDetail.box},{priceDetail.currency}, {priceDetail['dozen']} {priceDetail.currency},</li>)}
    </ul>
  </div>;
}