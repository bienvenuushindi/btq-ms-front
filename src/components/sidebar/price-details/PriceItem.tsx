import clsx from 'clsx';
import Card from '@/components/Card';
import React from 'react';
import {SupplierInformation} from '@/components/suppliers/SupplierInformation';
import {getImageUrls} from '@/lib/utils';
import Badge from '@/components/Badge';

const QuantityTypeClass={
  unit: "bg-[#FF6F61] text-white",
  dozen: "bg-[#7ED957] text-white",
  box: "bg-[#4FC1E9] text-white"
}

const QuantityTypeVariant={
  unit: "primary",
  dozen: "success",
  box: "danger"
}
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
    <Card className="border-2 my-4 ">
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
                <Badge variant={QuantityTypeVariant[item.quantity_type]} className={clsx("small px-1 rounded font-extrabold")}>
                  {item.quantity_type}
                </Badge>
                <div>
                  <span className="font-bold text-lg">{clsx(item.price, ' ')}</span>
                  <span className="font-light text-md">{clsx(item.currency)}</span>
                </div>
              </Card>
            </li>)
          }
        </ul>

      </div>
    </Card>
  );
}