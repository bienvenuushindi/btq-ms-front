import {Calendar, CreditCard, Globe, Layers} from "react-feather";
import RequisitionDetailsCard from "@/components/requisitions/home-page/RequisitionDetailsCard";
import React from "react";
import {ViewMore} from "@/components/requisitions/home-page/ViewMore";
import NotFound from "@/components/state/NotFound";
import clsx from "clsx";

export function RequisitionInfo({requisition, className = '', withLink = true}) {
    if (!requisition || Object.keys(requisition).length === 0) {
        return <NotFound/>
    }

    const {date, count_products_bought, total_price, price_currency, count_products} = requisition;
    const details = [
        {icon: <Calendar/>, label: 'Scheduled Date', value: date},
        {
            icon: <CreditCard/>,
            label: 'Items Added',
            value: `${count_products_bought} / ${count_products}`
        },
        {icon: <Layers/>, label: 'Requisition Total', value: total_price},
        {icon: <Globe/>, label: 'Currency', value: price_currency},
    ];

    return (
        <ul className={clsx(className || "grid grid-cols-2", "items-stretch gap-2 my-2")}>
            {details.map((detail, index) => (
                <li key={`requisition-detail-${index}`} className="justify-self-stretch flex">
                    <RequisitionDetailsCard {...detail} />
                </li>
            ))}
            {withLink && (
                <li className="justify-self-stretch col-start-2 flex">
                    <div className="h-full w-full flex items-center justify-end py-2">
                        <ViewMore requisitionID={requisition.id}/>
                    </div>
                </li>
            )}
        </ul>

    )
}
