'use client';
import {useParams} from 'next/navigation';
import {usePriceDetails} from '@/app/hooks/usePriceDetails';


export default function PriceDetails() {
  const params = useParams();
  const productDetailId = params.id
  const {result, error, isLoading} = usePriceDetails(productDetailId)
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  return <div>
    <ul>
      {result && result.map(priceDetail => <li
          key={priceDetail.id}>{priceDetail.attributes.box},{priceDetail.attributes.currency}, {priceDetail['attributes']['dozen']} {priceDetail.attributes.currency},</li>)}
    </ul>
  </div>;
}