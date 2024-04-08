'use client'
import {PriceDetailForm} from '@/components/PriceDetailForm';
import {useParams} from 'next/navigation';
import Container from '@/components/utils/wrappers/Container';
import ProtectedRoute from "@/components/ProtectedRoute";

export default function CreatePriceDetail() {
  const path = useParams();
  return (
      <ProtectedRoute>
        <Container>
          <PriceDetailForm productDetailID={path.id}/>
        </Container>
      </ProtectedRoute>
  );
}