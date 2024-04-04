'use client';
import {SupplierForm} from '@/components/suppliers/SupplierForm';
import Container from '@/components/Container';
import {useParams} from 'next/navigation';
import {useFetcher} from "@/app/hooks/useFetcher";
import {API_ENDPOINTS} from "@/lib/api";
import Loading from "@/components/state/Loading";
import React from "react";
import DataWrapper from "@/components/utils/DataWrapper";
import ProtectedRoute from "@/components/ProtectedRoute";


export default function UpdateSupplier() {
  const params = useParams();
  const supplierID = params.id;
  const {data: supplier = {}, isLoading, error} = useFetcher(API_ENDPOINTS.SUPPLIER_BY_ID(supplierID))
  return (
      <ProtectedRoute>
          <Container>
              <DataWrapper isLoading={isLoading} error={error} loadingComponent={<Loading/>}>
                  <SupplierForm supplier={supplier}/>
              </DataWrapper>
          </Container>
      </ProtectedRoute>

  );
}
