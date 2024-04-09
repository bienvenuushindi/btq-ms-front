'use client'
import Card from '@/components/utils/wrappers/Card';
import Text from '@/components/Text';
import {AlignLeft, Clock, FileText, Info, MapPin} from 'react-feather';
import Carousel from '@/components/carousel/Carousel';
import {getImageUrls, tagColors} from '@/lib/utils';
import TagsSection from '@/components/TagsSection';
import React from 'react';
import {createMarkup} from "@/components/forms/RichEditor";
import Badge from "@/components/utils/Badge";
import Image from 'next/image';
import {countries} from "@/styles/data/countries";

const Label = ({label,  icon = null}) => {
    return (
        <div className="flex gap-2 items-center mb-2 w-fit text-gray-700 text-sm">
            {icon}
            {label}
        </div>
    );
};
export default function ProductItem({product}) {
    const {image_urls} = product;
    const iconMap = {
        name: <Info size={16} color={tagColors.primary}/>,
        short_description: <AlignLeft size={16} color={tagColors.primary}/>,
        description: <FileText size={16} color={tagColors.primary}/>,
        created_at: <Clock size={16} color={tagColors.primary}/>,
        country_of_origin: <MapPin size={16} color={tagColors.primary}/>,
    };
    const countryCode = product.country_origin.toUpperCase();
    const flagUrl = `https://flagsapi.com/${countryCode}/flat/32.png`;
    return (
        <Card className="w-full">
            <div className="flex  justify-items-center gap-3">
                <div id="carousel" className="p-1 rounded  border-gray-100 ">
                    <Carousel
                        images={getImageUrls(image_urls || [])}
                        style={{
                            height: 400,
                            width: 400,
                        }}/>
                </div>
                <div className="flex  flex-grow flex-col gap-3 items-start justify-start p-3">
                    <div className="flex justify-between w-full ">
                        <div className='flex gap-1 flex-col'>
                            <Label label="Name" icon={iconMap.name}/>
                            <Text size="large" intent="tertiary" className="font-bold ml-3">{product.name}</Text>
                        </div>
                        <div className='flex gap-1 flex-col '>
                            <Label label="Made in" icon={iconMap.country_of_origin}/>
                            <div className="flex gap-1 ml-3">
                                <Image src={flagUrl} alt={`Flag of ${countryCode}`} width={32} height={32} priority/>
                                <Badge variant="primary" size="small">{countryCode}</Badge>
                            </div>


                        </div>
                    </div>
                    <div>
                        <div className='flex gap-1 flex-col'>
                            <Label label="Summary" icon={iconMap.short_description}/>
                            <Text size="medium" intent="tertiary"
                                  className="text-gray-500 ml-3">{product.short_description}</Text>
                        </div>
                    </div>
                    <div className='flex gap-1 flex-col w-full'>
                        <Label label="Description" icon={iconMap.description}/>
                        <div className="ml-2 p-2 bg-gray-100 border border-gray-100 w-full" dangerouslySetInnerHTML={createMarkup(product.description)}></div>
                    </div>
                    <div className='flex gap-1 flex-col'>
                        <Label label="Made in" icon={iconMap.country_of_origin}/>
                        <Badge variant="secondary" size="small" className="ml-3">{countries[countryCode]}</Badge>
                    </div>
                    <TagsSection tags={product.tags}/>
                </div>
            </div>
        </Card>
    );
}