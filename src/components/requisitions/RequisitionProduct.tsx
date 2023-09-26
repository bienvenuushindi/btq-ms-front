import InfoItem from '@/components/InfoItem';
import Card from '@/components/Card';
import React from 'react';
import Carousel from 'react-gallery-carousel';
import {BASE_URL} from '@/lib/api';
import {getImageUrls} from '@/lib/utils';
import Divider from '@/components/Divider';

export default function RequisitionProduct({product}){
  return (
    <Card className="flex gap-4 border-b py-4">
      <div id="carousel" className="p-2 shadow w-1/3">
        <Carousel images={getImageUrls(product.image_urls || [])}
                  hasMediaButton={false}
                  style={{height: 250, width: '100%'}}/>
      </div>
      <div className="w-2/3">
        <div>
          <h2 className='font-medium'>Product Details</h2>
          <Divider/>
          <div className="flex justify-between">
            <InfoItem label="Name" value={product.name}/>
            <InfoItem label="Size" value={product.size}/>
            <InfoItem label="Expiration Date" value={product.expired_date || 'not applied'}/>
          </div>

        </div>
        <div>
          <h2>Prices</h2>
          <div className="flex gap-3">
            <Card className="flex flex-col justify-between border">
              <InfoItem  label="Box Price" value={product.box_price} />
              <InfoItem label="Box Quantity" value={product.box_units}/>
            </Card>
            <Card className="flex flex-col justify-between border">
              <InfoItem label="Dozen Price" value={product.dozen_price} />
              <InfoItem label="Dozen Quantity" value={product.dozen_units}/>
            </Card>
            <Card className="flex flex-col justify-between border">
              <InfoItem label="Unit Price" value={product.unit_price} />
              <InfoItem label="Unit Quantity" value={1}/>
            </Card>
          </div>

        </div>
      </div>
    </Card>
  )
}