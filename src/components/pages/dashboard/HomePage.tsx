'use client';

import ContainerOne from '@/components/utils/wrappers/ContainerOne';
import Container from '@/components/utils/wrappers/Container';
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import ExpiredProductContainer from '@/components/requisitions/ExpiredProductContainer';
import { RequisitionItemByDate } from '@/components/requisitions/home-page/RequisitionItemByDate';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardStats from '@/components/pages/dashboard/DashboardStats';
import CreateRequisition from '@/components/CreateRequisition';
import CreateCategory from '@/components/categories/CreateCategory';
import ProductCreateModal from '@/components/products/ProductCreateModal';
import SupplierModal from '@/components/suppliers/SupplierModal';
import {Plus} from 'react-feather';
import {BRAND_NAME} from '@/lib/brand';

export default function HomePage() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [isSupplierModalOpen, setSupplierModalOpen] = useState(false);
  const quickLinkBase = 'inline-flex min-h-9 flex-1 items-center justify-center gap-1.5 rounded-full border px-2.5 py-1.5 text-center text-[10px] font-semibold shadow-[0_10px_24px_rgba(15,23,42,0.05)] transition min-[420px]:flex-none sm:px-4 sm:py-2 sm:text-[11px]';
  const quickLinkStyles = {
    product: `${quickLinkBase} border-sky-200 bg-sky-50 text-sky-800 hover:border-sky-300 hover:bg-sky-100`,
    // requisition: `${quickLinkBase} border-orange-200 bg-transparent text-orange-800 hover:border-orange-300 hover:bg-orange-50`,
    supplier: `${quickLinkBase} border-emerald-200 bg-emerald-50 text-emerald-800 hover:border-emerald-300 hover:bg-emerald-100`,
    category: `${quickLinkBase} border-violet-200 bg-violet-50 text-violet-800 hover:border-violet-300 hover:bg-violet-100`,
  };

  return (
    <ProtectedRoute>
      <Container>
        <ContainerOne>
          <Card className="w-full min-w-0 rounded-2xl border-slate-200/90 bg-gradient-to-r from-white via-slate-50 to-sky-50/70 sm:rounded-[22px]">
            <CardHeader className="px-3 pb-3 pt-4 sm:px-6 sm:pb-4 sm:pt-5">
              <div className="flex min-w-0 flex-col gap-3 sm:gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 sm:text-xs sm:tracking-[0.32em]">Quick links</p>
                  <CardDescription>Create the records your team uses most often.</CardDescription>
                </div>
                <div className="flex w-full flex-wrap items-center justify-start gap-2">
                  <button
                    type="button"
                    onClick={() => setProductModalOpen(true)}
                    className={quickLinkStyles.product}
                  >
                    <Plus size={13}/>
                    <span>Create Product</span>
                  </button>
                  <CreateRequisition
                    buttonLabel={<><Plus size={13}/><span>Create Requisition</span></>}
                    buttonIntent="none"
                     buttonClassName="min-h-9 flex-1 justify-center gap-1.5 rounded-full border border-sky-200 bg-gradient-to-b from-sky-50 to-white px-2.5 py-1.5 text-[10px] font-semibold text-slate-700 shadow-[0_10px_24px_rgba(14,165,233,0.08)] hover:border-sky-300 hover:from-sky-100 hover:to-white min-[420px]:flex-none sm:px-4 sm:py-2 sm:text-[11px]"
                  />
                  <button
                    type="button"
                    onClick={() => setSupplierModalOpen(true)}
                    className={quickLinkStyles.supplier}
                  >
                    <Plus size={13}/>
                    <span>Create Supplier</span>
                  </button>
                  <CreateCategory
                    buttonLabel={<><Plus size={13}/><span>Create Category</span></>}
                    buttonIntent="none"
                    buttonClassName={quickLinkStyles.category}
                  />
                </div>
              </div>
            </CardHeader>
          </Card>
        </ContainerOne>
        <ContainerOne>
          <Card className="w-full min-w-0 rounded-2xl border-slate-200/90 bg-white sm:rounded-[22px]">
            <CardHeader className="px-3 pb-2 pt-4 sm:px-6 sm:pt-5">
              <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 sm:text-xs sm:tracking-[0.32em]">Overview</p>
              <CardTitle className="font-display text-lg font-bold text-slate-900 sm:text-[1.5rem] md:text-[1.75rem]">{BRAND_NAME} Snapshot</CardTitle>
              <CardDescription>
                A clean view of stock health, recent requisition activity, and the items that need attention first.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-3 pb-4 sm:px-6 sm:pb-5">
              <DashboardStats />
            </CardContent>
          </Card>
        </ContainerOne>
        <ContainerOne>
          <Card className="w-full min-w-0 rounded-2xl border-slate-200/90 bg-white sm:rounded-[26px]">
            <CardHeader className="px-3 pt-4 sm:px-6 sm:pt-5">
              <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 sm:text-xs sm:tracking-[0.32em]">Shelf life</p>
              <CardTitle className="font-display text-base font-bold text-slate-900 sm:text-lg md:text-[1.35rem]">Shelf-Life Watch</CardTitle>
              <CardDescription>Up to 10 visible items per list, with in-card scrolling whenever the list overflows.</CardDescription>
            </CardHeader>
            <CardContent className="px-3 pb-4 sm:px-6 sm:pb-5">
              <div className="grid min-w-0 gap-3 sm:gap-4 xl:grid-cols-2">
                <ExpiredProductContainer title="Expired Soon" type="expiring_soon" limit={10} />
                <ExpiredProductContainer title="Expired" type="expired" limit={10} />
              </div>
            </CardContent>
          </Card>
        </ContainerOne>
        <ContainerOne>
          <div className="grid w-full min-w-0 gap-3 sm:gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
            <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 p-3 md:p-4">
              <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 sm:text-xs sm:tracking-[0.28em]">Requisition summary</p>
              <h3 className="mt-2 font-display text-base font-bold text-slate-900 sm:text-lg md:text-[1.35rem]">Calendar-driven details</h3>
              <p className="mt-2 text-xs text-slate-500 md:text-sm">Use the calendar to inspect the requisition summary for a selected day, including date, items, total, and currency.</p>
              <div className="mt-5">
                <RequisitionItemByDate date={date} />
              </div>
            </div>
            <Card className="min-w-0 rounded-2xl border-slate-200/90 bg-white sm:rounded-[22px]">
              <CardHeader className="px-3 pt-4 sm:px-6 sm:pt-5">
                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 sm:text-xs sm:tracking-[0.32em]">Calendar view</p>
                <CardTitle className="font-display text-base font-bold text-slate-900 sm:text-lg md:text-[1.35rem]">Choose Day</CardTitle>
                <CardDescription>Select a date to inspect requisitions for that day.</CardDescription>
              </CardHeader>
              <CardContent className="px-3 pb-4 sm:px-6 sm:pb-5">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="w-full max-w-full rounded-[18px] border border-slate-200 bg-slate-50 p-2"
                />
              </CardContent>
            </Card>
          </div>
        </ContainerOne>
      </Container>
      <ProductCreateModal isOpen={isProductModalOpen} onClose={() => setProductModalOpen(false)} />
      <SupplierModal isOpen={isSupplierModalOpen} onClose={() => setSupplierModalOpen(false)} />
    </ProtectedRoute>
  );
}
