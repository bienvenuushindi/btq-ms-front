import {useContext} from 'react';
import {SidebarContext} from '@/components/sections/sidebar/SidebarContainer';
import ShowImages from '@/components/ShowImages';
import {isPurchasedStatus} from '@/lib/helper';

export default function RequisitionDetails(){
  const { sidebarData} = useContext(SidebarContext);
  return(
    <>
      <div>
        <ShowImages imagesUrls={sidebarData.attributes.image_urls}/>
        <h2>Product Details</h2>
        <h4>{sidebarData.name} - {sidebarData.size}</h4>
        <ul>
          <li>Expiration Date: {sidebarData.expired_date || 'not applied'}</li>
          <li>
            <h4>Box</h4>
            <ul>
              <li>Quantity In Box: {sidebarData.box_units}</li>
            </ul>
          </li>
          <li>
            <h4>Group</h4>
            <ul>
              <li>Quantity In Group: {sidebarData.dozen_units}</li>
            </ul>
          </li>
          <li>Purchase Status: {isPurchasedStatus(sidebarData['status']) ? 'Purchased' : 'Not yet purchased'}</li>
          <li>Quantity to Buy: {sidebarData.quantity}</li>
          <li>Buying Unit: {sidebarData.quantity_type || '-'}</li>
          <li>Today&apos;s Purchase Price: {sidebarData.price} {sidebarData.currency || ''}</li>
          <li>Note: {sidebarData.note}</li>
          <li>Buyer Supplier: {sidebarData.buyer_supplier_name || sidebarData.buyer_supplier_id || 'Account owner'}</li>
          <li>Vendor Supplier: {sidebarData.supplier_name || sidebarData.supplier_id || 'Select Supplier'}</li>
        </ul>
        {/*created_at: "2023-08-14T17:04:37.278Z"*/}
        {/*image_urls: ["/images/no-img.png"]*/}
        {/*updated_at: "2023-08-14T17:04:37.278Z"*/}
      </div>
    </>
  )
}
