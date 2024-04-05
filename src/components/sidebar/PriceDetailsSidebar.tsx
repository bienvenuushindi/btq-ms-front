import React, {useContext} from 'react';
import {SidebarContext} from '@/components/sidebar/SidebarContainer';
import PriceList from '@/components/sidebar/price-details/PriceList';
import AddSupplier from '@/components/pages/products/details/AddSuppliers';
import ErrorBoundary from '@/components/ErrorBoundary';
import ShowImages from '@/components/ShowImages';
import {useFetcher} from "@/app/hooks/useFetcher";
import {API_ENDPOINTS} from "@/lib/api";
import DataLoading from "@/components/state/Loading";
import DataWrapper from "@/components/utils/DataWrapper";

export default function PriceDetailsSidebar() {
  const {sidebarData} = useContext(SidebarContext);
  const {data: prices=[], isLoading, error} =  useFetcher(API_ENDPOINTS.PRICE_DETAILS(sidebarData.id));
  return (
    <>
      <DataWrapper isLoading={isLoading} error={error} loadingComponent={<DataLoading/>}>
            <ShowImages imagesUrls={sidebarData.attributes?.image_urls}/>
            <div className="my-2">
              <div className="flex justify-end pr-2">
                <AddSupplier productDetailID={sidebarData.id}/>
              </div>
              <PriceList prices={prices}/>
            </div>
      </DataWrapper>
    </>
  );
}