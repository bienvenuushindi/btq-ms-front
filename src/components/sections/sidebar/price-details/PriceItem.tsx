import clsx from 'clsx';
import Card from '@/components/utils/wrappers/Card';
import React from 'react';
import {SupplierInformation} from '@/components/suppliers/SupplierInformation';
import {getImageUrls} from '@/lib/helper';
import Badge from '@/components/utils/Badge';
import PriceItemData from "@/components/sections/sidebar/price-details/PriceItemData";


export default function PriceItem({details, supplier}) {
  const {
    id,
    shop_name,
    image_urls,
    address: supplierAddress,
  } = supplier;

  const {
    city,
    country,
    address1,
    address2,
    tel1,
    tel2
  } = supplierAddress
  return (
    <Card className="border-2 my-4 border-gray-300">
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
        <PriceItemData details={details} />
      </div>
    </Card>
  );
}