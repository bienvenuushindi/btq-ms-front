'use client'
import {PriceDetailForm} from '@/components/PriceDetailForm';
import {useParams} from 'next/navigation';
import Container from '@/components/Container';

export default function CreatePriceDetail() {
  const path = useParams();
  return (<Container>
    <PriceDetailForm productDetailID={path.id}/>
  </Container>);
}