import React from 'react';
import {RequisitionInfo} from "@/components/requisitions/home-page/RequisitionInfo";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import Dot from "@/components/utils/Dot";

export function RequisitionItemCard({title, description = '', requisition, className = ''}) {
    return (
        <Card className="min-h-36 w-full min-w-0 rounded-[24px] border-slate-200/90 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg font-bold text-slate-900 md:text-xl"><Dot variant="primary"/>  {title} </CardTitle>
                {description ? <CardDescription>{description}</CardDescription> : null}
            </CardHeader>
            <CardContent>
                <RequisitionInfo requisition={requisition} className={className}/>
            </CardContent>
        </Card>
    )
}
