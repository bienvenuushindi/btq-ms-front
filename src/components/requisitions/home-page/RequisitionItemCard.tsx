import Text from '@/components/Text';
import React from 'react';
import {RequisitionInfo} from "@/components/requisitions/home-page/RequisitionInfo";
import Card from "@/components/Card";
import Dot from "@/components/utils/Dot";

export function RequisitionItemCard({title, requisition, className = ''}) {
    return (
        <Card className="min-h-36 w-full bg-white">
            <div className="flex items-center">
                <Dot variant="primary"/>
                <Text intent="secondary" size="medium" className="font-extrabold">
                    {title}
                </Text>
            </div>
            <RequisitionInfo requisition={requisition} className={className}/>
        </Card>
    )
}




