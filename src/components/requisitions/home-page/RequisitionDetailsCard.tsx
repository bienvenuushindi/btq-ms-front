import React from 'react';
import Card from '@/components/utils/wrappers/Card';
import {tagColors} from "@/lib/helper";

const RequisitionDetailsCard = ({ label, icon, value }) => {
    return (
        <Card className="h-full w-full min-w-0 rounded-[18px] border border-slate-200/90 bg-slate-50 p-2.5 shadow-none">
            <div className="flex items-start gap-2.5">
                {icon && React.cloneElement(icon, { size: 20, color: tagColors.primary, className: 'shrink-0' })}

                <div className="flex min-w-0 flex-col">
                    <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">{label}</span>
                    <span className="break-words text-xs font-bold text-slate-900 md:text-sm">{value}</span>
                </div>
            </div>
        </Card>
    );
};

export default RequisitionDetailsCard;
