import React, {useContext, useEffect} from "react";
import {RequisitionContext} from "@/components/requisitions/RequisitionContext";
import {RequisitionInfo} from "@/components/requisitions/home-page/RequisitionInfo";

export function RequisitionInfoWithContext({requisition, withLink = true}) {
    const {setCurrency} = useContext(RequisitionContext)
    useEffect(() => {
        setCurrency(requisition.price_currency)
    }, [requisition, setCurrency])

    return (
        <RequisitionInfo requisition={requisition} withLink={false}/>
    )
}