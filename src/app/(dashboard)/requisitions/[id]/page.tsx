'use client';
import {useParams} from 'next/navigation';
import {useFetcher} from '@/app/hooks/useFetcher';
import SidebarContentSelector from '@/components/sections/sidebar/SidebarContentSelector';
import {SidebarContext} from '@/components/sections/sidebar/SidebarContainer';
import React, {useContext} from 'react';
import Container from '@/components/utils/wrappers/Container';
import RequisitionDetailsHeader from '@/components/requisitions/RequisitionDetailsHeader';
import ContainerOne from '@/components/utils/wrappers/ContainerOne';
import ReqItemProductList from '@/components/requisitions/ReqItemProductList';
import Card from '@/components/utils/wrappers/Card';
import RequisitionProvider from '@/components/requisitions/RequisitionContext';
import {API_ENDPOINTS} from "@/lib/api";
import DataWrapper from "@/components/utils/wrappers/DataWrapper";
import {RequisitionInfoWithContext} from "@/components/requisitions/item-page/RequisitionInfoWithContext";
import RequisitionLoader from "@/components/banners/RequisitionLoader";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Requisition() {
    const {openBar} = useContext(SidebarContext);
    const params = useParams();
    const requisitionId = params.id;
    const {
        data: requisition,
        mutate,
        error,
        isLoading
    } = useFetcher(API_ENDPOINTS.REQUISITION_BY_ID(requisitionId));
    return (
        <ProtectedRoute>
            <RequisitionProvider>
                <Container>
                    <RequisitionDetailsHeader revalidate={mutate}/>
                    <ContainerOne>
                        <DataWrapper error={error} loadingComponent={<RequisitionLoader/>} isLoading={isLoading}>
                            {requisition && (
                                <>
                                    <Card className="w-full">
                                        <RequisitionInfoWithContext requisition={requisition}/>
                                    </Card>
                                    <ReqItemProductList details={requisition.product_items}/>
                                    <SidebarContentSelector target={openBar.target}/>
                                </>
                            )}
                        </DataWrapper>
                    </ContainerOne>
                </Container>
            </RequisitionProvider>
        </ProtectedRoute>
    );
}
