import React from "react";
import {useFetcher} from "@/app/hooks/useFetcher";
import DataWrapper from "@/components/utils/DataWrapper";
import Loading from "@/components/state/Loading";
import {RequisitionItemCard} from "@/components/requisitions/home-page/RequisitionItemCard";

export function RequisitionInfoWrapper() {
    const {data, isLoading, error} = useFetcher("/requisitions/recent");
    return (
        <DataWrapper isLoading={isLoading} error={error} loadingComponent={<Loading/>}>
            {data && (
                <div className="grid grid-cols-2 gap-2">
                    <RequisitionItemCard title="Archived Recently" requisition={data.archived}/>
                    <RequisitionItemCard title="Active" requisition={data.active}/>
                </div>
            )}
        </DataWrapper>
    );
}
