import {format} from 'date-fns';
import React from 'react';
import DataLoading from '@/components/state/Loading';
import DataWrapper from "@/components/utils/wrappers/DataWrapper";
import clsx from "clsx";
import {RequisitionItemCard} from "@/components/requisitions/home-page/RequisitionItemCard";
import {useFetcher} from "@/app/hooks/useFetcher";
import {API_ENDPOINTS} from "@/lib/api";

export function RequisitionItemByDate({date}) {
    const formattedDate = date ? format(date, 'dd-MM-yyyy') : null;
    const {data: requisition={}, error, isLoading} = useFetcher(
        formattedDate ? API_ENDPOINTS.FIND_REQUISITION_BY_DATE(formattedDate) : null
    );

    return (
        <DataWrapper isLoading={isLoading} error={error} loadingComponent={<DataLoading/>}>
            {formattedDate ? (
                <RequisitionItemCard title={clsx(formattedDate, "Requisition")} requisition={requisition} className="flex"/>
            ) : null}
        </DataWrapper>
    );
}


