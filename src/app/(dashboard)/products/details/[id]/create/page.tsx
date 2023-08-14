'use client'
import {PriceDetailForm} from '@/components/PriceDetailForm';
import {useParams} from 'next/navigation';

export default function CreatePriceDetail() {
  const path = useParams();
  return (<>
    <PriceDetailForm productDetailID={path.id}/>
  </>);
}