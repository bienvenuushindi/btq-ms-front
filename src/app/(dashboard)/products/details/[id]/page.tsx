'use client';
import {useParams} from 'next/navigation';
import {usePriceDetails} from '@/app/hooks/usePriceDetails';


export default function PriceDetails() {
  const params = useParams();
  const productDetailId = params.id
  console.log(productDetailId)
  const {priceDetails, error, isLoading} = usePriceDetails(productDetailId)
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  console.log(priceDetails);
  return <div>
    <ul>
      {priceDetails && priceDetails.map(priceDetail => <li
          key={priceDetail.id}>{priceDetail.attributes.box},{priceDetail.attributes.currency}, {priceDetail['attributes']['dozen']} {priceDetail.attributes.currency},</li>)}
    </ul>
  </div>;
}