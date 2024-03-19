'use client';
import {SupplierForm} from '@/components/suppliers/SupplierForm';
import Container from '@/components/Container';
import {useParams} from 'next/navigation';
import {useFetcher} from "@/app/hooks/useFetcher";
import {API_ENDPOINTS} from "@/lib/api";


export default function UpdateSupplier() {
  const params = useParams();
  const supplierID = params.id;
  const {data: supplier = {}, isLoading} = useFetcher(API_ENDPOINTS.SUPPLIER_BY_ID(supplierID))
  return (
    <Container>
      {isLoading ? <div>Loading ....</div> : <SupplierForm supplier={supplier}/>}
    </Container>
  );
}
