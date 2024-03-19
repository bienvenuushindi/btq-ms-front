'use client';
import Container from '@/components/Container';
import {useParams} from 'next/navigation';
import {ProductForm} from '@/components/ProductForm';
import {useFetcher} from "@/app/hooks/useFetcher";
import {API_ENDPOINTS} from "@/lib/api";
import Loading from "@/components/state/Loading";
import React from "react";
import DataWrapper from "@/components/utils/DataWrapper";


export default function UpdateProduct() {
  const params = useParams();
  const productID = params.id;
  const {data: product={}, isLoading, error} =useFetcher(API_ENDPOINTS.PRODUCT_BY_ID(productID));
  return (
    <Container>
      <DataWrapper isLoading={isLoading} error={error} loadingComponent={<Loading/>}>
       <ProductForm product={product}/>
      </DataWrapper>
    </Container>
  );
}
