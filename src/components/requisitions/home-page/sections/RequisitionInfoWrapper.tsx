import React from "react";
import {useFetcher} from "@/app/hooks/useFetcher";
import DataWrapper from "@/components/utils/wrappers/DataWrapper";
import DataLoading from "@/components/state/Loading";
import {RequisitionItemCard} from "@/components/requisitions/home-page/RequisitionItemCard";
import {API_ENDPOINTS} from "@/lib/api";

export function RequisitionInfoWrapper() {
  const {data: recentRequisitions = {}, isLoading: isRecentLoading, error: recentError} = useFetcher(API_ENDPOINTS.RECENT_REQUISITIONS);
  const {data: requisitions = [], isLoading: isListLoading, error: listError} = useFetcher(API_ENDPOINTS.REQUISITIONS);

  return (
    <DataWrapper isLoading={isRecentLoading || isListLoading} error={recentError || listError} loadingComponent={<DataLoading/>}>
      <div className="grid gap-3 xl:grid-cols-2">
        <RequisitionItemCard title="Active Requisition" requisition={recentRequisitions?.active}/>
        <RequisitionItemCard title="Last Recent Requisition" requisition={requisitions[0]}/>
      </div>
    </DataWrapper>
  );
}
