import {format} from 'date-fns';
import React from 'react';
import Loading from '@/components/state/Loading';
import DataWrapper from "@/components/utils/DataWrapper";
import clsx from "clsx";
import {RequisitionItemCard} from "@/components/requisitions/home-page/RequisitionItemCard";
import {useFetcher} from "@/app/hooks/useFetcher";
import {API_ENDPOINTS} from "@/lib/api";

export function RequisitionItemByDate({date}) {
    const formattedDate = format(date, 'dd-MM-yyyy');
    const {data: requisition={}, error, isLoading} = useFetcher(API_ENDPOINTS.FIND_REQUISITION_BY_DATE(formattedDate));;

    return (
        <DataWrapper isLoading={isLoading} error={error} loadingComponent={<Loading/>}>
            <RequisitionItemCard title={clsx(formattedDate, "Requisition")} requisition={requisition} className="flex"/>
        </DataWrapper>
    );
}





