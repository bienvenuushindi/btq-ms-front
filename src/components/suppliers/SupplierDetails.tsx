import {useContext} from 'react';
import {SidebarContext} from '@/components/sidebar/SidebarContainer';
import ShowImages from '@/components/ShowImages';
import useSupplier from '@/app/hooks/useSupplier';

export default function SupplierDetails(){
  const { sidebarData} = useContext(SidebarContext);
  const {data,included, isLoading,error} = useSupplier(sidebarData.id)
  return(
    <>
      <div>
        <ShowImages/>
        {/*<h2>Product Details</h2>*/}
        {/*<h4>{sidebarData.name} - {sidebarData.size}</h4>*/}
        {/*<ul>*/}
        {/*  <li>Expiration Date: {sidebarData.expired_date || 'not applied'}</li>*/}
        {/*  <li>Prices</li>*/}
        {/*  <li>*/}
        {/*    <h4>Box</h4>*/}
        {/*    <ul>*/}
        {/*      <li>Box Price:{sidebarData.box_price} </li>*/}
        {/*      <li>Quantity In Box: {sidebarData.box_units}</li>*/}
        {/*    </ul>*/}
        {/*  </li>*/}
        {/*  <li>*/}
        {/*    <h4>Dozen</h4>*/}
        {/*    <ul>*/}
        {/*      <li>Dozen Price:{sidebarData.dozen_price} </li>*/}
        {/*      <li>Quantity In Dozen: {sidebarData.dozen_units}</li>*/}
        {/*    </ul>*/}
        {/*  </li>*/}
        {/*  <li>*/}
        {/*    <h4>Unit</h4>*/}
        {/*    <ul>*/}
        {/*      <li>Unit Price: {sidebarData.unit_price}</li>*/}
        {/*      <li>Unit Qty: 1</li>*/}
        {/*    </ul>*/}
        {/*  </li>*/}
          {/*<li>Currency: {sidebarData.currency || '-'}</li>*/}
          {/*<li>Found: {sidebarData['found'] || 'No'}</li>*/}
          {/*<li>Qty: {sidebarData.quantity}</li>*/}
          {/*<li>Qty Type: {sidebarData.quantity_type || '-'}</li>*/}
          {/*<li>Price: {sidebarData.price}</li>*/}
          {/*<li>Note: {sidebarData.note}</li>*/}
          {/*<li>Supplier : {sidebarData.supplier_id || 'Select Supplier'}</li>*/}
        {/*</ul>*/}
        {/*created_at: "2023-08-14T17:04:37.278Z"*/}
        {/*image_urls: ["/images/no-img.png"]*/}
        {/*updated_at: "2023-08-14T17:04:37.278Z"*/}
      </div>
    </>
  )
}
