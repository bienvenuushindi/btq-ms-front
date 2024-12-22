import React from 'react';
import {RequisitionInfo} from "@/components/requisitions/home-page/RequisitionInfo";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Dot from "@/components/utils/Dot";

export function RequisitionItemCard({title, requisition, className = ''}) {
    return (
        <Card className="min-h-36 w-full bg-white">
            <CardHeader>
                <CardTitle><Dot variant="primary"/>  {title} </CardTitle>
            </CardHeader>
            <CardContent>
                <RequisitionInfo requisition={requisition} className={className}/>
            </CardContent>
        </Card>
    )
}




