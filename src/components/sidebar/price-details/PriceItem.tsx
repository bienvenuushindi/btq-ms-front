import clsx from 'clsx';
import Card from '@/components/Card';
import {BASE_URL} from '@/lib/api';
import Image from 'next/image';
import React from 'react';
import {SupplierInformation} from '@/components/suppliers/SupplierInformation';
import {getImageUrls} from '@/lib/utils';
import Badge from '@/components/Badge';


export default function PriceItem({details, supplier}) {
  const {data: {attributes: supplier_info}} = supplier;
  const image_urls = [...supplier_info.image_urls];
  const {
    id,
    shop_name,
    city,
    country,
    address1,
    address2,
    tel1,
    tel2
  } = supplier_info;
  return (
    <Card className="border border-2 my-4 ">
      <div className="m-2 flex flex-col gap-2" key={'supplier-price-details' + id}>
        <SupplierInformation
          shopName={shop_name}
          address1={address1}
          city={city}
          country={country}
          address2={address2}
          tel1={tel1}
          tel2={tel2}
          imageUrl={getImageUrls(image_urls)[0]}
        />
        <ul className="flex gap-2 mt-4">
          {
            details.map((item, index) => <li key={'price-detail' + index}>
              <Card className="flex flex-col">
                <Badge variant="primary" className="p-1 rounded-b-md">
                  {item.quantity_type}
                </Badge>
                <span className="font-bold text-lg">{clsx(item.price, item.currency)}</span>
              </Card>
            </li>)
          }
        </ul>

      </div>
    </Card>
  );
}