import React from 'react';
import Card from '@/components/utils/wrappers/Card';
import {tagColors} from "@/lib/helper";

const RequisitionDetailsCard = ({ label, icon, value }) => {
    return (
        <Card className="h-full w-full min-w-0 rounded-[20px] border border-slate-200/90 bg-slate-50 p-3 shadow-none">
            <div className="flex items-start gap-3">
                {icon && React.cloneElement(icon, { size: 24, color: tagColors.primary, className: 'shrink-0' })}

                <div className="flex min-w-0 flex-col">
                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">{label}</span>
                    <span className="break-words text-base font-bold text-slate-900 md:text-lg">{value}</span>
                </div>
            </div>
        </Card>
    );
};

export default RequisitionDetailsCard;
