"use client"
import {useParams} from 'next/navigation';
import {useFetcher} from "@/app/hooks/useFetcher";
import {API_ENDPOINTS} from "@/lib/api";
import DataLoading from "@/components/state/Loading";
import React from "react";
import DataWrapper from "@/components/utils/wrappers/DataWrapper";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Products() {
    const path = useParams()
    const {data: productDetails = [], error, isLoading} = useFetcher(API_ENDPOINTS.PRODUCT_DETAILS(path.id));
    return (
        <ProtectedRoute>
            <DataWrapper isLoading={isLoading} error={error} loadingComponent={<DataLoading/>}>
                <div>
                    <ul>
                        {productDetails && productDetails.map(productDetail =>
                            <li key={productDetail.id}>
                                {productDetail.expired_date}, {productDetail['size']}
                                {productDetail.unit_price},
                            </li>)}
                    </ul>
                </div>
            </DataWrapper>
        </ProtectedRoute>
       );
}