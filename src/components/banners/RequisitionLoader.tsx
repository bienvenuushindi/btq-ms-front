import Card from "@/components/utils/wrappers/Card";
import GridLoader from "@/components/banners/GridLoader";
import React from "react";

const RequisitionLoader = () => {
    return (
        <div className="w-full flex flex-col gap-6">
            <Card className="w-full ">
                <GridLoader cols={2}/>
            </Card>
            <Card className="w-full ">
                <GridLoader rows={1} height={10} className='w-1/3'/>
                <GridLoader rows={8} height={10}/>
            </Card>
        </div>
    )
}


export default RequisitionLoader