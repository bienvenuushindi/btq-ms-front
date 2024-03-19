'use client';
import {useParams} from 'next/navigation';
import {useFetcher} from "@/app/hooks/useFetcher";
import {API_ENDPOINTS} from "@/lib/api";
import Loading from "@/components/state/Loading";
import React from "react";
import DataWrapper from "@/components/utils/DataWrapper";


export default function PriceDetails() {
    const params = useParams();
    const productDetailId = params.id
    const {data: prices = [], error, isLoading} = useFetcher(API_ENDPOINTS.PRICE_DETAILS(productDetailId))
    return (<DataWrapper isLoading={isLoading} error={error} loadingComponent={<Loading/>}>
        <div>
            <ul>
                {prices && prices.map(priceDetail => <li
                    key={priceDetail.id}>{priceDetail.box},{priceDetail.currency}, {priceDetail['dozen']} {priceDetail.currency},</li>)}
            </ul>
        </div>
    </DataWrapper>);
}