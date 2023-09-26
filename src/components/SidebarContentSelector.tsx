import ProductDetailsSidebar from '@/components/sidebar/ProductDetailsSidebar';
import PriceDetailsSidebar from '@/components/sidebar/PriceDetailsSidebar';
import {PriceDetailForm} from '@/components/PriceDetailForm';
import {useContext} from 'react';
import {SidebarContainer, SidebarContext} from '@/components/sidebar/SidebarContainer';
import RequisitionDetails from '@/components/sidebar/RequisitionDetails';
import SupplierDetails from '@/components/suppliers/SupplierDetails';

export default function SidebarContentSelector({target}) {
  const {sidebarData} = useContext(SidebarContext);
  const renderSwitch = (target) => {
    switch (target) {
      case 'price_details':
        return <PriceDetailsSidebar/>;
      case 'product_details':
        return <ProductDetailsSidebar/>;
      case 'add_price':
        return <PriceDetailForm productDetailID={sidebarData.id}/>;
      case 'requisition_details':
        return <RequisitionDetails/>;
      case 'supplier_details':
        return <SupplierDetails/>;
      default:
        return 'no content';
    }
  };
  return (
    <SidebarContainer>
      <div className="relative overflow-y-auto">
        {renderSwitch(target)}
      </div>
    </SidebarContainer>
  );
}