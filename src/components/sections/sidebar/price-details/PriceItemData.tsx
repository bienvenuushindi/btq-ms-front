import React from "react";
import Card from '@/components/utils/wrappers/Card';
import Badge from '@/components/utils/Badge';
import clsx from "clsx";

const QuantityTypeClass={
    unit: "bg-[#FF6F61] text-white",
    dozen: "bg-[#7ED957] text-white",
    box: "bg-[#4FC1E9] text-white"
}

const QuantityTypeVariant={
    unit: "primary",
    dozen: "success",
    box: "danger"
}

const PriceItemData = ({ details }) => {
    if (!details || !details.length) return null;

    return (
        <ul className="flex gap-1">
            {details.map((item, index) => (
                <li key={`price-detail-${index}`}>
                    <div className="flex flex-col rounded border border-gray-200 p-1">
                        <Badge
                            variant={QuantityTypeVariant[item.quantity_type]}
                            className={clsx("small rounded font-extrabold ")}
                        >
                            {item.quantity_type === 'dozen' ? 'Group' : item.quantity_type }
                        </Badge>
                        <div className="flex items-baseline">
                            <span className="font-bold text-md pr-1">{item.price}</span>
                            <span className="font-light text-sm">{item.currency}</span>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default PriceItemData;
