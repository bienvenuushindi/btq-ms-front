'use client';
import {useParams} from 'next/navigation';
import {useFetcher} from '@/app/hooks/useFetcher';
import SidebarContentSelector from '@/components/SidebarContentSelector';
import {SidebarContext} from '@/components/sidebar/SidebarContainer';
import React, {useContext} from 'react';
import RequisitionItem from '@/components/requisitions/RequisitionItem';
import Container from '@/components/Container';
import RequisitionDetailsHeader from '@/components/requisitions/RequisitionDetailsHeader';
import ContainerOne from '@/components/ContainerOne';
import ReqItemProductList from '@/components/requisitions/ReqItemProductList';
import ErrorBoundary from '@/components/ErrorBoundary';
import Card from '@/components/Card';

export default function Requisition() {
  const {openBar} = useContext(SidebarContext);
  const params = useParams();
  const requisitionId = params.id;
  const {data: requisition_items, mutate, error, isLoading} = useFetcher('/requisitions/' + requisitionId);
  console.log(requisition_items)
  return (
    <Container>
      <RequisitionDetailsHeader revalidate={mutate}/>
      <ErrorBoundary error={error}>
        <ContainerOne>
          <Card className="w-full">
            {requisition_items && (<RequisitionItem requisition={requisition_items.attributes}/>)}
          </Card>
        </ContainerOne>
        <ContainerOne>
          {isLoading && <div>Loading...</div>}
          {requisition_items && (
            <>
              <ReqItemProductList details={requisition_items.attributes.product_items} requisitionId={requisitionId}/>
              <SidebarContentSelector target={openBar.target}/>
            </>
          )}
        </ContainerOne>
      </ErrorBoundary>

    </Container>
  );
}
