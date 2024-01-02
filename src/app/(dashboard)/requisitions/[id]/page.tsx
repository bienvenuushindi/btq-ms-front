'use client';
import {useParams} from 'next/navigation';
import {useFetcher} from '@/app/hooks/useFetcher';
import SidebarContentSelector from '@/components/SidebarContentSelector';
import {SidebarContext} from '@/components/sidebar/SidebarContainer';
import React, {useContext} from 'react';
import Container from '@/components/Container';
import RequisitionDetailsHeader from '@/components/requisitions/RequisitionDetailsHeader';
import ContainerOne from '@/components/ContainerOne';
import ReqItemProductList from '@/components/requisitions/ReqItemProductList';
import ErrorBoundary from '@/components/ErrorBoundary';
import Card from '@/components/Card';
import GridLoader from '@/components/banners/GridLoader';
import {RequisitionInfoWithContext} from '@/components/requisitions/home-page/RequisitionItem';
import RequisitionProvider from '@/components/requisitions/RequisitionContext';

export default function Requisition() {
  const {openBar} = useContext(SidebarContext);
  const params = useParams();
  const requisitionId = params.id;
  const {data: requisition_items, mutate, error, isLoading} = useFetcher('/requisitions/' + requisitionId);
  return (
    <Container>
      <RequisitionDetailsHeader revalidate={mutate}/>
      <ContainerOne>
        <ErrorBoundary error={error}>
          {isLoading && (
            <div className="w-full flex flex-col gap-6">
              <Card className="w-full ">
                <GridLoader cols={2}/>
              </Card>
              <Card className="w-full ">
                <GridLoader rows={1} height={10} className='w-1/3'/>
                <GridLoader rows={8} height={10}/>
              </Card>
            </div>
          )
          }
          {requisition_items && (
            <>
              <RequisitionProvider>
                <Card className="w-full">
                  <RequisitionInfoWithContext requisition={requisition_items.attributes} withLink={false}/>
                </Card>
                <ReqItemProductList details={requisition_items.attributes.product_items} requisitionId={requisitionId}/>
                <SidebarContentSelector target={openBar.target}/>
              </RequisitionProvider>
            </>
          )}
        </ErrorBoundary>
      </ContainerOne>
    </Container>
  );
}
