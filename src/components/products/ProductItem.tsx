import Card from '@/components/Card';
import {BASE_URL} from '@/lib/api';
import InfoItem from '@/components/InfoItem';
import {countries} from '@/data/countries';
import {Info, AlignLeft, FileText, Clock, MapPin} from 'react-feather';
import Carousel from '@/components/carousel/Carousel';
import {getImageUrls, tagColors} from '@/lib/utils';
import TagsSection from '@/components/TagsSection';
import React from 'react';

export default function ProductItem({product}) {
  const {image_urls} = product;
  const iconMap = {
    name: <Info size={16} color={tagColors.primary}/>,
    short_description: <AlignLeft size={16} color={tagColors.primary}/>,
    description: <FileText size={16} color={tagColors.primary}/>,
    created_at: <Clock size={16} color={tagColors.primary}/>,
    country_of_origin: <MapPin size={16} color={tagColors.primary}/>,
  };
  return (
    <Card className="w-full">
      <div className="flex  justify-items-center gap-3">
        <div id="carousel" className="p-1 rounded shadow border-gray-100 border">
          <Carousel hasMediaButton={false}
                    images={getImageUrls(image_urls || [])}
                    style={{
                      height: 400,
                      width: 400,
                    }}/>
        </div>
        <div className="flex flex-col items-start justify-start">
          <InfoItem icon={iconMap.name} label="Name" value={product.name}/>
          <InfoItem icon={iconMap.short_description} label="Short Description" value={product.short_description}/>
          <InfoItem icon={iconMap.description} label="Description" value={product.description}/>
          <InfoItem icon={iconMap.created_at} label="Created At" value={product.created_at}/>
          <InfoItem icon={iconMap.country_of_origin} label="Country of Origin"
                    value={countries[product.country_origin]}/>
          <TagsSection tags={product.tags}/>
        </div>
      </div>

    </Card>
  );
}