import InfoItem from '@/components/InfoItem';
import Card from '@/components/Card';
import React from 'react';
import {getImageUrls} from '@/lib/utils';
import Divider from '@/components/Divider';
import Carousel from '@/components/carousel/Carousel';
import DateDisplay from "@/components/DateDisplay";
import Text from "@/components/Text";

export default function RequisitionProduct({product}) {
    return (
        <Card className="flex gap-4 border-b py-4">
            <div id="carousel" className="p-2 shadow w-1/3">
                <Carousel images={getImageUrls(product.image_urls || [])}
                          style={{height: 400, width: 400}}/>
            </div>
            <div className="w-2/3">
                <div>
                    <Text intent="primary" size="medium" className="font-extrabold">Details</Text>
                    <Divider/>
                    <div className="flex justify-between">
                        <InfoItem label="Name" value={product.name}/>
                        <InfoItem label="Size" value={product.size}/>
                        <InfoItem label="Expiration Date" value={<DateDisplay date={product.expired_date}/>}/>
                    </div>

                </div>
                <div>
                    <Text intent="primary" size="medium" className="font-extrabold">Prices</Text>
                    <div className="flex gap-3">
                        {renderCard('Box Price', product.box_price, 'Quantity', product.box_units)}
                        {renderCard('Dozen Price', product.dozen_price, 'Quantity', product.dozen_units)}
                        {renderCard('Unit Price', product.unit_price, 'Quantity', 1)}
                    </div>
                </div>
            </div>
        </Card>
    )
}

const renderCard = (label1, value1, label2, value2) => {
    return (
        <Card className="flex gap-1 justify-between border">
            <InfoItem label={label1} value={value1}/>
            <span className="font-bold text-sm"> / </span>
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