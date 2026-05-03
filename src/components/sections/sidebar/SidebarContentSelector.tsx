import PriceDetailsSidebar from '@/components/sections/sidebar/PriceDetailsSidebar';
import {PriceDetailForm} from '@/components/PriceDetailForm';
import {useContext} from 'react';
import {SidebarContainer, SidebarContext} from '@/components/sections/sidebar/SidebarContainer';
import RequisitionDetails from '@/components/sections/sidebar/RequisitionDetails';
import SupplierDetails from '@/components/suppliers/SupplierDetails';
import RequisitionItemSidebar from '@/components/sections/sidebar/RequisitionItemSidebar';

export default function SidebarContentSelector({target}) {
  const {sidebarData, openBar} = useContext(SidebarContext);
  const renderSwitch = (target) => {
    switch (target) {
      case 'price_details':
        return <PriceDetailsSidebar/>;
      case 'add_price':
        return <PriceDetailForm productDetailID={sidebarData.id}/>;
      case 'requisition_details':
        return <RequisitionDetails/>;
      case 'supplier_details':
        return <SupplierDetails supplierId={sidebarData.id}/>;
      case 'requisition_item':
        return <RequisitionItemSidebar/>;
      default:
        return 'no content';
    }
  };
  return (
    <SidebarContainer title={openBar.title}>
        {renderSwitch(target)}
    </SidebarContainer>
  );
}
