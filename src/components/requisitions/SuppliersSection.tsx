import SelectSupplier from '@/components/requisitions/SelectSupplier';
import PreviousSuppliers from '@/components/requisitions/PreviousSuppliers';
import React from 'react';
import Card from '@/components/Card';
import Divider from '@/components/Divider';

export default function SuppliersSection({action, productId,suppliers, supplierId}){
  return (
    <div className="w-64 px-2 rounded">
      <SelectSupplier action={action} productId={productId} supplierId={supplierId}/>
      <Divider/>
      <PreviousSuppliers action={action}  suppliers={suppliers} productId={productId} supplierId={supplierId}/>
    </div>
  )
}