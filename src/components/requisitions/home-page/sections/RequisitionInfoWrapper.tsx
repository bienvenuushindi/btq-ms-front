import React from "react";
import {useFetcher} from "@/app/hooks/useFetcher";
import DataWrapper from "@/components/utils/wrappers/DataWrapper";
import DataLoading from "@/components/state/Loading";
import {RequisitionItemCard} from "@/components/requisitions/home-page/RequisitionItemCard";
import {API_ENDPOINTS} from "@/lib/api";

export function RequisitionInfoWrapper() {
    const {data, isLoading, error} = useFetcher(API_ENDPOINTS.RECENT_REQUISITIONS);
    return (
        <DataWrapper isLoading={isLoading} error={error} loadingComponent={<DataLoading/>}>
            {data && (
                <div className="grid grid-cols-2 gap-2">
                    <RequisitionItemCard title="Archived Recently" requisition={data.archived}/>
                    <RequisitionItemCard title="Active" requisition={data.active}/>
                </div>
            )}
        </DataWrapper>
    );
}
