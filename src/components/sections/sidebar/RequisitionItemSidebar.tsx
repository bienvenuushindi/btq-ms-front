import {useContext} from 'react';
import {SidebarContext} from '@/components/sections/sidebar/SidebarContainer';
import ReqProductItemInfo from '@/components/requisitions/ReqProductItemInfo';

export default function RequisitionItemSidebar() {
  const {sidebarData} = useContext(SidebarContext);

  if (!sidebarData?.product_detail_id) {
    return (
      <div className="p-4 text-sm text-slate-500">
        No requisition item selected.
      </div>
    );
  }

  return (
    <div className="p-3">
      <ReqProductItemInfo productDetails={sidebarData}/>
    </div>
  );
}
