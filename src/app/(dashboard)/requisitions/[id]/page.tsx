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
import {Calendar, Package, ShoppingCart} from 'react-feather';
import StatusIndicator from '@/components/utils/StatusIndicator';
import {getRequisitionFoundItemsCount, getRequisitionItemsCount} from '@/lib/helper';

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
    const itemsCount = getRequisitionItemsCount(requisition);
    const foundItemsCount = getRequisitionFoundItemsCount(requisition);
    return (
        <ProtectedRoute>
            <RequisitionProvider>
                <Container>
                    <RequisitionDetailsHeader revalidate={mutate}/>
                    <ContainerOne>
                        <DataWrapper error={error} loadingComponent={<RequisitionLoader/>} isLoading={isLoading}>
                            {requisition && (
                                <>
                                    <div className="grid w-full gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(260px,0.45fr)]">
                                        <Card className="w-full rounded-[26px] border-slate-200/90 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
                                            <div className="flex flex-col gap-4">
                                                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                                                    <div>
                                                        <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">Requisition overview</p>
                                                        <h2 className="mt-2 font-display text-xl font-bold text-slate-900 md:text-[1.45rem]">
                                                            Requisition #{requisition.id}
                                                        </h2>
                                                        <p className="mt-2 max-w-2xl text-xs text-slate-500 md:text-sm">
                                                            Review schedule, item progress, and pricing status before updating the products below.
                                                        </p>
                                                    </div>
                                                    <StatusIndicator
                                                        active={!requisition.archived}
                                                        activeLabel="Active requisition"
                                                        inactiveLabel="Archived requisition"
                                                        className="rounded-full border border-slate-200 bg-white p-1.5"
                                                    />
                                                </div>
                                                <RequisitionInfoWithContext requisition={requisition}/>
                                            </div>
                                        </Card>
                                        <Card className="w-full rounded-[26px] border-slate-200/90 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
                                            <div className="space-y-4">
                                                <div>
                                                    <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">Quick summary</p>
                                                    <h3 className="mt-2 font-display text-lg font-bold text-slate-900 md:text-[1.25rem]">At a glance</h3>
                                                </div>
                                                <div className="grid gap-3">
                                                    <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
                                                        <div className="flex items-center gap-3">
                                                            <span className="rounded-full bg-white p-2 text-slate-600 ring-1 ring-inset ring-slate-200">
                                                                <Package size={18}/>
                                                            </span>
                                                            <div>
                                                                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Items in requisition</p>
                                                                <p className="text-base font-bold text-slate-900">{itemsCount}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
                                                        <div className="flex items-center gap-3">
                                                            <span className="rounded-full bg-white p-2 text-slate-600 ring-1 ring-inset ring-slate-200">
                                                                <ShoppingCart size={18}/>
                                                            </span>
                                                            <div>
                                                                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Items marked found</p>
                                                                <p className="text-base font-bold text-slate-900">{foundItemsCount}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
                                                        <div className="flex items-center gap-3">
                                                            <span className="rounded-full bg-white p-2 text-slate-600 ring-1 ring-inset ring-slate-200">
                                                                <Calendar size={18}/>
                                                            </span>
                                                            <div>
                                                                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Scheduled date</p>
                                                                <p className="text-base font-bold text-slate-900">{requisition.date || 'No date'}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                    <ReqItemProductList details={requisition.product_items} revalidate={mutate}/>
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
