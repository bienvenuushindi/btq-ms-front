import {useContext} from 'react';
import {SidebarContext} from '@/components/sidebar/SidebarContainer';
import {usePriceDetails} from '@/app/hooks/usePriceDetails';
import PriceList from '@/components/sidebar/price-details/PriceList';
import Button from '@/components/Button';
import AddSupplier from '@/components/pages/products/details/AddSuppliers';

export default function PriceDetailsSidebar() {
  const {sidebarData, setOpenBar} = useContext(SidebarContext);
  const {priceDetails, isLoading, error} = usePriceDetails(sidebarData.id);
  return (
    <>
      {
        isLoading && !error ? (<div>Loading...</div>) :
          error ? <div>Failed to load</div> :
            <>
              {/*<Button onClick={()=>setOpenBar((prev)=>({...prev, target: 'add_price', product_detail_id: sidebarData.id}))}>Add Price</Button>*/}
              <AddSupplier productDetailID={sidebarData.id}/>
              <PriceList prices={priceDetails}/>
            </>
      }
    </>
  );
}