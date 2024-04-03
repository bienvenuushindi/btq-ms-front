import RequisitionProduct from '@/components/requisitions/RequisitionProduct';
import RequisitionItemPricing from '@/components/requisitions/RequisitionItemPricing';
import React from 'react';

export default function ReqProductItemInfo({productDetails}){
  return (
    <div className="w-full bg-gray-100 p-2">
      <RequisitionProduct product={productDetails}/>
      <div className="flex py-2">
        <div className="w-full">
          <RequisitionItemPricing  productDetails={productDetails} />
        </div>
      </div>
    </div>
  );
}