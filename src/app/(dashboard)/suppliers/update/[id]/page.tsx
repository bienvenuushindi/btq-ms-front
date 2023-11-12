'use client';
import {SupplierForm} from '@/components/suppliers/SupplierForm';
import Container from '@/components/Container';
import useSupplier from '@/app/hooks/useSupplier';
import {useParams} from 'next/navigation';


export default function CreateProduct() {
  const params = useParams();
  const supplierID = params.id;
  const {data: result = {}, isLoading} = useSupplier(supplierID);
  const {attributes: supplier = {}} = result;
  return (
    <Container>
      {isLoading ? <div>Loading ....</div> : <SupplierForm supplier={supplier}/>}
    </Container>
  );
}
