import React, {useContext} from 'react';
import {SidebarContext} from '@/components/sections/sidebar/SidebarContainer';
import PriceList from '@/components/sections/sidebar/price-details/PriceList';
import AddSupplier from '@/components/pages/products/details/AddSuppliers';
import ErrorBoundary from '@/components/ErrorBoundary';
import ShowImages from '@/components/ShowImages';
import {useFetcher} from "@/app/hooks/useFetcher";
import {API_ENDPOINTS} from "@/lib/api";
import DataLoading from "@/components/state/Loading";
import DataWrapper from "@/components/utils/wrappers/DataWrapper";
import {useRouter} from "next/navigation";

export default function PriceDetailsSidebar() {
  const {sidebarData} = useContext(SidebarContext);
  const router = useRouter();
  const {data: prices=[], isLoading, error, mutate} =  useFetcher(API_ENDPOINTS.PRICE_DETAILS(sidebarData.id));
  const refreshPricingState = async () => {
    await Promise.resolve(mutate?.());
    router.refresh();
  };
  return (
    <>
      <DataWrapper isLoading={isLoading} error={error} loadingComponent={<DataLoading/>}>
            <ShowImages imagesUrls={sidebarData.attributes?.image_urls}/>
            <div className="my-2">
              <div className="flex justify-end pr-2">
                <AddSupplier productDetailID={sidebarData.id} onSuccess={refreshPricingState}/>
              </div>
              <PriceList prices={prices} productDetailId={sidebarData.id} onRefresh={refreshPricingState}/>
            </div>
      </DataWrapper>
    </>
  );
}
