import PriceDetailsSidebar from '@/components/sidebar/PriceDetailsSidebar';
import {PriceDetailForm} from '@/components/PriceDetailForm';
import {useContext} from 'react';
import {SidebarContainer, SidebarContext} from '@/components/sidebar/SidebarContainer';
import RequisitionDetails from '@/components/sidebar/RequisitionDetails';
import SupplierDetails from '@/components/suppliers/SupplierDetails';

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