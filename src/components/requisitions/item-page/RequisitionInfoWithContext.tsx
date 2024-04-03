import React, {useContext, useEffect} from "react";
import {RequisitionContext} from "@/components/requisitions/RequisitionContext";
import {RequisitionInfo} from "@/components/requisitions/home-page/RequisitionInfo";

export function RequisitionInfoWithContext({requisition}) {
    const {setCurrency, setRequisitionID, setRequisition} = useContext(RequisitionContext)
    useEffect(() => {
        if (requisition) {
            const {id, price_currency} = requisition;
            setCurrency(price_currency)
            setRequisitionID(id)
            setRequisition(requisition)
        }
    }, [requisition, setCurrency, setRequisition, setRequisitionID])
    return (
        <RequisitionInfo requisition={requisition} withLink={false}/>
    )
}