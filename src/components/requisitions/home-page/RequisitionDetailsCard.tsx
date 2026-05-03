import React from 'react';
import Card from '@/components/utils/wrappers/Card';
import {tagColors} from "@/lib/helper";

const RequisitionDetailsCard = ({ label, icon, value }) => {
    return (
        <Card className="h-full w-full rounded-[24px] border border-slate-200/90 bg-slate-50 p-4 shadow-none">
            <div className="flex items-center gap-3">
                {icon && React.cloneElement(icon, { size: 34, color: tagColors.primary })}

                <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-500">{label}</span>
                    <span className="text-lg font-bold text-slate-900">{value}</span>
                </div>
            </div>
        </Card>
    );
};

export default RequisitionDetailsCard;
