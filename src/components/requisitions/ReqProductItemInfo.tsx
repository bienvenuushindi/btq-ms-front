import RequisitionProduct from '@/components/requisitions/RequisitionProduct';
import RequisitionItemPricing from '@/components/requisitions/RequisitionItemPricing';
import React from 'react';

export default function ReqProductItemInfo({productDetails,requisitionId}){
  return (
    <div>
      <RequisitionProduct product={productDetails}/>
      <div className="flex py-2">
        <div className="w-full">
          <RequisitionItemPricing requisitionId={requisitionId} productDetails={productDetails} />
        </div>
      </div>
    </div>
  );
}