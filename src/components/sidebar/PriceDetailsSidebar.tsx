import {useContext} from 'react';
import {SidebarContext} from '@/components/sidebar/SidebarContainer';
import {usePriceDetails} from '@/app/hooks/usePriceDetails';
import PriceList from '@/components/sidebar/price-details/PriceList';
import AddSupplier from '@/components/pages/products/details/AddSuppliers';
import ErrorBoundary from '@/components/ErrorBoundary';
import ShowImages from '@/components/ShowImages';

export default function PriceDetailsSidebar() {
  const {sidebarData} = useContext(SidebarContext);
  const {result, isLoading, error} = usePriceDetails(sidebarData.id);
  return (
    <>
      {
        isLoading ? (<div>Loading...</div>) :
        <ErrorBoundary error={error}>
            <ShowImages imagesUrls={sidebarData.attributes?.image_urls} carouselWrapperClassName="w-fit"/>
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