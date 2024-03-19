import {format} from 'date-fns';
import {useRequisition} from '@/app/hooks/useRequisition';
import Text from '@/components/Text';
import React from 'react';
import Loading from '@/components/state/Loading';
import NotFound from '@/components/state/NotFound';
import DataWrapper from "@/components/utils/DataWrapper";
import {RequisitionInfo} from "@/components/requisitions/home-page/RequisitionInfo";

export function RequisitionItemByDate({title, date}) {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const {requisition, error, isLoading} = useRequisition(formattedDate);

    return (
        <>
            <div className="w-full h-36">
                <Text intent="primary" size="medium" className="font-extrabold">{title}</Text>
                <DataWrapper isLoading={isLoading} error={error} loadingComponent={<Loading/>}>
                    {requisition && <RequisitionInfo requisition={requisition}/>}
                    {!requisition && <NotFound/>}
                </DataWrapper>
            </div>
        </>
    );
}





