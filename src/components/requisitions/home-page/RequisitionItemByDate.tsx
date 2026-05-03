import {format} from 'date-fns';
import React from 'react';
import DataLoading from '@/components/state/Loading';
import DataWrapper from "@/components/utils/wrappers/DataWrapper";
import {RequisitionItemCard} from "@/components/requisitions/home-page/RequisitionItemCard";
import {useFetcher} from "@/app/hooks/useFetcher";
import {API_ENDPOINTS, getTokenFromCookie} from "@/lib/api";
import useSWRImmutable from "swr/immutable";

const fetchRequisitionByDate = async (url) => {
    const response = await fetch(url, {
        headers: {
            Accept: 'application/json',
            Authorization: getTokenFromCookie(),
            'Content-Type': 'application/json',
        },
    });

    if (response.status === 404) {
        return {};
    }

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(result?.error || result?.message || 'Request failed');
    }

    return result.data || {};
};

export function RequisitionItemByDate({date}) {
    const formattedDate = date ? format(date, 'dd-MM-yyyy') : null;
    const {data: requisition = {}, error, isLoading} = useSWRImmutable(
        formattedDate ? API_ENDPOINTS.FIND_REQUISITION_BY_DATE(formattedDate) : null,
        fetchRequisitionByDate
    );
    const {data: requisitions = [], isLoading: recentLoading} = useFetcher(
        formattedDate ? null : API_ENDPOINTS.REQUISITIONS
    );

    const activeRequisition = formattedDate ? requisition : requisitions[0];
    const title = formattedDate ? 'Selected Date Requisition' : 'Last Recent Requisition';
    const description = formattedDate
        ? `Summary for ${formattedDate}`
        : 'Pick a day from the calendar to replace this summary with that date’s requisition.';

    return (
        <DataWrapper isLoading={isLoading || recentLoading} error={error} loadingComponent={<DataLoading/>}>
            <RequisitionItemCard title={title} description={description} requisition={activeRequisition} className="grid grid-cols-1 gap-2 lg:grid-cols-2"/>
        </DataWrapper>
    );
}
