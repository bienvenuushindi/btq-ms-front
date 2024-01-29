import React from 'react';
import Card from '@/components/Card';
import {tagColors} from "@/lib/utils";

const RequisitionDetailsCard = ({ label, icon, value }) => {
    return (
        <Card className="p-4">
            <div className="flex items-center gap-4">
                {icon && React.cloneElement(icon, { size: 50, color: tagColors.primary })}

                <div className="flex flex-col">
                    <span className="text-gray-700 text-sm">{label}</span>
                    <span className="font-bold text-lg">{value}</span>
                </div>
            </div>
        </Card>
    );
};

export default RequisitionDetailsCard;
