import RequisitionProduct from '@/components/requisitions/RequisitionProduct';
import RequisitionItemPricing from '@/components/requisitions/RequisitionItemPricing';
import React from 'react';

export default function ReqProductItemInfo({productDetails}){
  return (
    <div className="w-full rounded-[18px] bg-slate-100/80 p-3">
      <RequisitionProduct product={productDetails}/>
      <div className="py-3">
        <div className="w-full">
          <RequisitionItemPricing  productDetails={productDetails} />
        </div>
      </div>
    </div>
  );
}
