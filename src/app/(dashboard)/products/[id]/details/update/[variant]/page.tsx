'use client';
import Container from '@/components/utils/wrappers/Container';
import {useParams} from 'next/navigation';
import {ProductDetailForm} from '@/components/ProductDetailForm';
import {useFetcher} from "@/app/hooks/useFetcher";
import {API_ENDPOINTS} from "@/lib/api";
import DataLoading from "@/components/state/Loading";
import React from "react";
import DataWrapper from "@/components/utils/wrappers/DataWrapper";
import ProtectedRoute from "@/components/ProtectedRoute";
export default function UpdateProductDetails() {
  const params = useParams();
  const {id: productID, variant: variantID} = params;

  const {data: variant = {}, isLoading, error} =  useFetcher(API_ENDPOINTS.PRODUCT_DETAIL_BY_ID(productID, variantID))
  return (
      <ProtectedRoute>
          <Container>
              <DataWrapper isLoading={isLoading} error={error} loadingComponent={<DataLoading/>}>
                  <ProductDetailForm variant={variant}/>
              </DataWrapper>
          </Container>
      </ProtectedRoute>
  );
}
