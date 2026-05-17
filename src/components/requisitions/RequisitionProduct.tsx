import InfoItem from '@/components/InfoItem';
import Card from '@/components/utils/wrappers/Card';
import React from 'react';
import {getImageUrls} from '@/lib/helper';
import Divider from '@/components/utils/Divider';
import Carousel from '@/components/carousel/Carousel';
import DateDisplay from "@/components/DateDisplay";
import Text from "@/components/Text";

export default function RequisitionProduct({product}) {
    return (
        <Card className="flex flex-col gap-4 rounded-[22px] border border-slate-200/90 bg-white p-4 md:flex-row">
            <div id="carousel" className="w-full rounded-[18px] border border-slate-200 bg-slate-50 p-2 shadow-sm md:w-[280px] md:shrink-0">
                <Carousel images={getImageUrls(product.image_urls || [])}
                          style={{height: 260, width: 260}}
                          wrapperClassName="mb-0 w-full max-w-full"/>
            </div>
            <div className="w-full rounded-[18px] bg-slate-50 p-4">
                <div>
                    <Text intent="primary" size="medium" className="font-extrabold">Details</Text>
                    <Divider/>
                    <div className="grid gap-3 md:grid-cols-3">
                        <InfoItem label="Name" value={product.name}/>
                        <InfoItem label="Size" value={product.size}/>
                        <InfoItem label="Expiration Date" value={<DateDisplay date={product.expired_date}/>}/>
                    </div>

                </div>
                <div className="mt-4">
                    <Text intent="primary" size="medium" className="font-extrabold">Your Selling Prices</Text>
                    <div className="grid gap-3 md:grid-cols-3">
                        {renderCard('Your Box Price', product.box_price, product.currency, 'Quantity', product.box_units)}
                        {renderCard('Your Group Price', product.dozen_price, product.currency, 'Quantity', product.dozen_units)}
                        {renderCard('Your Unit Price', product.unit_price, product.currency, 'Quantity', 1)}
                    </div>
                </div>
            </div>
        </Card>
    )
}

const renderCard = (label1, value1, currency, label2, value2) => {
    return (
        <Card className="flex min-w-0 items-start justify-between gap-2 rounded-[16px] border border-slate-200 bg-white p-3 shadow-none">
            <InfoItem label={label1} value={`${value1} ${currency || ''}`.trim()}/>
            <InfoItem label={label2}>
                <div className="flex gap-1">
                    <Text size="large" intent="tertiary" className="font-bold">{value2}</Text>
                    <span className="flex gap-2 items-center w-fit text-gray-700 text-sm">
                    pcs
                </span>
                </div>
            </InfoItem>
        </Card>
    );
}
