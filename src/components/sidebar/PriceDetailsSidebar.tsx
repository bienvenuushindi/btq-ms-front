import {useContext} from 'react';
import {SidebarContext} from '@/components/sidebar/SidebarContainer';
import PriceList from '@/components/sidebar/price-details/PriceList';
import AddSupplier from '@/components/pages/products/details/AddSuppliers';
import ErrorBoundary from '@/components/ErrorBoundary';
import ShowImages from '@/components/ShowImages';
import {useFetcher} from "@/app/hooks/useFetcher";
import {API_ENDPOINTS} from "@/lib/api";

export default function PriceDetailsSidebar() {
  const {sidebarData} = useContext(SidebarContext);
  const {result, isLoading, error} =  useFetcher(API_ENDPOINTS.PRICE_DETAILS(sidebarData.id));
  console.log('sidebarData.attributes?.image_urls')
  console.log(sidebarData.attributes?.image_urls)
  return (
    <>
      {
        isLoading ? (<div>Loading...</div>) :
        <ErrorBoundary error={error}>

            <ShowImages imagesUrls={sidebarData.attributes?.image_urls}/>
            <div className="my-4">
              <div className="flex justify-end pr-2">
                <AddSupplier productDetailID={sidebarData.id}/>
              </div>
              <PriceList prices={result}/>
            </div>
        </ErrorBoundary>
      }
    </>
  );
}