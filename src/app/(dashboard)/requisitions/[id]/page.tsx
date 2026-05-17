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
import {Archive, Calendar, Package, RotateCcw, ShoppingCart} from 'react-feather';
import StatusIndicator from '@/components/utils/StatusIndicator';
import {getRequisitionItemsCount, getRequisitionPurchasedItemsCount} from '@/lib/helper';
import Button from '@/components/utils/Button';
import {send} from '@/lib/api';
import {revalidateCache} from '@/lib/cache';
import toastShow from '@/components/toast/toast-selector';

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
    const purchasedItemsCount = getRequisitionPurchasedItemsCount(requisition);
    const updateRequisitionStatus = async () => {
        if (!requisition?.id) return;

        const nextArchived = !requisition.archived;
        const formData = new FormData();
        formData.append('requisition[archived]', String(nextArchived));

        try {
            await send(`/requisitions/${requisition.id}`, formData, 'PUT');
            await revalidateCache({
                keys: [API_ENDPOINTS.REQUISITION_BY_ID(requisition.id)],
                prefixes: [API_ENDPOINTS.REQUISITIONS, API_ENDPOINTS.RECENT_REQUISITIONS],
            });
            await mutate();
            toastShow('success', nextArchived ? 'Requisition archived successfully' : 'Requisition restored successfully');
        } catch (error) {
            toastShow('error', error instanceof Error ? error.message : 'Could not update requisition status');
        }
    };

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
                                                    <div className="flex items-center gap-2">
                                                        <StatusIndicator
                                                            active={!requisition.archived}
                                                            activeLabel="Active"
                                                            inactiveLabel="Archived"
                                                            className="rounded-full border border-slate-200 bg-white !px-2 !py-0.5 text-[11px]"
                                                        />
                                                        <Button
                                                            type="button"
                                                            intent={requisition.archived ? 'primary' : 'danger'}
                                                            size="small"
                                                            onClick={updateRequisitionStatus}
                                                            className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold"
                                                        >
                                                            {requisition.archived ? <RotateCcw size={13}/> : <Archive size={13}/>}
                                                            {requisition.archived ? 'Restore' : 'Archive'}
                                                        </Button>
                                                    </div>
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
                                                                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Items purchased</p>
                                                                <p className="text-base font-bold text-slate-900">{purchasedItemsCount}</p>
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
