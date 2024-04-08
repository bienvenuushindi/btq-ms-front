import SelectSupplier from '@/components/requisitions/SelectSupplier';
import PreviousSuppliers from '@/components/requisitions/PreviousSuppliers';
import React from 'react';
import Card from '@/components/utils/wrappers/Card';
import Divider from '@/components/utils/Divider';

export default function SuppliersSection({action, productId, supplierId}){
  return (
    <div className="w-72 px-2 rounded">
      <SelectSupplier action={action} productId={productId} supplierId={supplierId}/>
      <Divider/>
      <PreviousSuppliers action={action} productId={productId} supplierId={supplierId}/>
    </div>
  )
}