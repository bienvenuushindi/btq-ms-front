'use client';

import ContainerOne from '@/components/utils/wrappers/ContainerOne';
import Container from '@/components/utils/wrappers/Container';
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import ExpiredProductContainer from '@/components/requisitions/ExpiredProductContainer';
import { RequisitionItemByDate } from '@/components/requisitions/home-page/RequisitionItemByDate';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import TransitionLink from '@/components/navigation/TransitionLink';
import DashboardStats from '@/components/pages/dashboard/DashboardStats';
import CreateRequisition from '@/components/CreateRequisition';
import CreateCategory from '@/components/categories/CreateCategory';
import {Plus} from 'react-feather';

export default function HomePage() {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <ProtectedRoute>
      <Container>
        <ContainerOne>
          <Card className="w-full rounded-[22px] border-slate-200/90 bg-white">
            <CardHeader className="px-4 pb-4 pt-5 sm:px-6">
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Quick links</p>
                  <CardDescription>Create the records your team uses most often.</CardDescription>
                </div>
                <div className="flex w-full flex-wrap items-center justify-start gap-2">
                  <TransitionLink
                    href="/products/create"
                    loadingMessage="Opening product creation..."
                    className="inline-flex w-fit items-center justify-center gap-1.5 rounded-full border border-sky-200 bg-gradient-to-b from-sky-50 to-white px-4 py-2 text-center text-[11px] font-semibold text-slate-700 shadow-[0_10px_24px_rgba(14,165,233,0.08)] transition hover:border-sky-300 hover:from-sky-100 hover:to-white"
                  >
                    <Plus size={13}/>
                    <span>Create Product</span>
                  </TransitionLink>
                  <CreateRequisition
                    buttonLabel={<><Plus size={13}/><span>Create Requisition</span></>}
                    buttonIntent="none"
                    buttonClassName="w-fit justify-center gap-1.5 rounded-full border border-sky-200 bg-gradient-to-b from-sky-50 to-white px-4 py-2 text-[11px] font-semibold text-slate-700 shadow-[0_10px_24px_rgba(14,165,233,0.08)] hover:border-sky-300 hover:from-sky-100 hover:to-white"
                  />
                  <TransitionLink
                    href="/suppliers/create"
                    loadingMessage="Opening supplier creation..."
                    className="inline-flex w-fit items-center justify-center gap-1.5 rounded-full border border-sky-200 bg-gradient-to-b from-sky-50 to-white px-4 py-2 text-center text-[11px] font-semibold text-slate-700 shadow-[0_10px_24px_rgba(14,165,233,0.08)] transition hover:border-sky-300 hover:from-sky-100 hover:to-white"
                  >
                    <Plus size={13}/>
                    <span>Create Supplier</span>
                  </TransitionLink>
                  <CreateCategory
                    buttonLabel={<><Plus size={13}/><span>Create Category</span></>}
                    buttonIntent="none"
                    buttonClassName="w-fit justify-center gap-1.5 rounded-full border border-sky-200 bg-gradient-to-b from-sky-50 to-white px-4 py-2 text-[11px] font-semibold text-slate-700 shadow-[0_10px_24px_rgba(14,165,233,0.08)] hover:border-sky-300 hover:from-sky-100 hover:to-white"
                  />
                </div>
              </div>
            </CardHeader>
          </Card>
        </ContainerOne>
        <ContainerOne>
          <Card className="w-full rounded-[22px] border-slate-200/90 bg-white">
            <CardHeader className="px-4 pb-2 pt-5 sm:px-6">
              <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Overview</p>
              <CardTitle className="font-display text-[1.35rem] font-bold text-slate-900 sm:text-[1.5rem] md:text-[1.75rem]">OasisMarket Snapshot</CardTitle>
              <CardDescription>
                A clean view of stock health, recent requisition activity, and the items that need attention first.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-5 sm:px-6">
              <DashboardStats />
            </CardContent>
          </Card>
        </ContainerOne>
        <ContainerOne>
          <Card className="w-full rounded-[26px] border-slate-200/90 bg-white">
            <CardHeader className="px-4 pt-5 sm:px-6">
              <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Shelf life</p>
              <CardTitle className="font-display text-lg font-bold text-slate-900 md:text-[1.35rem]">Shelf-Life Watch</CardTitle>
              <CardDescription>Up to 10 visible items per list, with in-card scrolling whenever the list overflows.</CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-5 sm:px-6">
              <div className="grid gap-4 xl:grid-cols-2">
                <ExpiredProductContainer title="Expired Soon" type="expiring_soon" limit={10} />
                <ExpiredProductContainer title="Expired" type="expired" limit={10} />
              </div>
            </CardContent>
          </Card>
        </ContainerOne>
        <ContainerOne>
          <div className="grid w-full gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
            <div className="min-w-0 rounded-[18px] border border-slate-200 bg-slate-50 p-3.5 md:p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Requisition summary</p>
              <h3 className="mt-2.5 font-display text-lg font-bold text-slate-900 md:text-[1.35rem]">Calendar-driven details</h3>
              <p className="mt-2 text-xs text-slate-500 md:text-sm">Use the calendar to inspect the requisition summary for a selected day, including date, items, total, and currency.</p>
              <div className="mt-5">
                <RequisitionItemByDate date={date} />
              </div>
            </div>
            <Card className="min-w-0 rounded-[22px] border-slate-200/90 bg-white">
              <CardHeader className="px-4 pt-5 sm:px-6">
                <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Calendar view</p>
                <CardTitle className="font-display text-lg font-bold text-slate-900 md:text-[1.35rem]">Choose Day</CardTitle>
                <CardDescription>Select a date to inspect requisitions for that day.</CardDescription>
              </CardHeader>
              <CardContent className="px-4 pb-5 sm:px-6">
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
    </ProtectedRoute>
  );
}
