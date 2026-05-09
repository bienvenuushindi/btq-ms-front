import {Calendar, CreditCard, Globe, Layers} from "react-feather";
import RequisitionDetailsCard from "@/components/requisitions/home-page/RequisitionDetailsCard";
import React from "react";
import {ViewMore} from "@/components/requisitions/home-page/ViewMore";
import NotFound from "@/components/state/NotFound";
import clsx from "clsx";
import {getRequisitionItemsCount, getRequisitionPurchasedItemsCount} from "@/lib/helper";

export function RequisitionInfo({requisition, className = '', withLink = true}) {
    if (!requisition || Object.keys(requisition).length === 0) {
        return <NotFound/>
    }

    const {date, total_price, price_currency} = requisition;
    const purchasedItemsCount = getRequisitionPurchasedItemsCount(requisition);
    const itemsCount = getRequisitionItemsCount(requisition);
    const details = [
        {icon: <Calendar/>, label: 'Scheduled Date', value: date},
        {
            icon: <CreditCard/>,
            label: 'Items Purchased',
            value: `${purchasedItemsCount} / ${itemsCount}`
        },
        {icon: <Layers/>, label: 'Requisition Total', value: total_price},
        {icon: <Globe/>, label: 'Currency', value: price_currency},
    ];

    return (
        <ul className={clsx(className || "grid grid-cols-1 gap-2 md:grid-cols-2", "min-w-0 items-stretch gap-2 my-1.5")}>
            {details.map((detail, index) => (
                <li key={`requisition-detail-${index}`} className="min-w-0 justify-self-stretch flex">
                    <RequisitionDetailsCard {...detail} />
                </li>
            ))}
            {withLink && (
                <li className="justify-self-stretch md:col-start-2 flex">
                    <div className="h-full w-full flex items-center justify-end py-2">
                        <ViewMore requisitionID={requisition.id}/>
                    </div>
                </li>
            )}
        </ul>

    )
}
