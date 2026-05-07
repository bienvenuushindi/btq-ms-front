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

export default function HomePage() {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <ProtectedRoute>
      <Container>
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
            <Card className="min-w-0 rounded-[22px] border-slate-200/90 bg-white">
              <CardHeader className="px-4 pt-5 sm:px-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Quick links</p>
                    <CardTitle className="font-display text-lg font-bold text-slate-900 md:text-[1.35rem]">Operations Hub</CardTitle>
                    <CardDescription>Jump into the busiest areas of the admin workspace.</CardDescription>
                  </div>
                  <div className="grid w-full gap-2 sm:flex sm:w-auto sm:flex-wrap sm:gap-3">
                    <TransitionLink href="/products" loadingMessage="Opening products..." className="oasis-button inline-flex w-full justify-center rounded-2xl px-4 py-2 text-xs font-semibold text-white sm:w-auto">View Products</TransitionLink>
                    <TransitionLink href="/requisitions" loadingMessage="Opening requisitions..." className="inline-flex w-full justify-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 sm:w-auto">Open Requisitions</TransitionLink>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-5 sm:px-6">
                <div className="min-w-0 rounded-[18px] border border-slate-200 bg-slate-50 p-3.5 md:p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Requisition summary</p>
                  <h3 className="mt-2.5 font-display text-lg font-bold text-slate-900 md:text-[1.35rem]">Calendar-driven details</h3>
                  <p className="mt-2 text-xs text-slate-500 md:text-sm">Use the calendar to inspect the requisition summary for a selected day, including date, items, total, and currency.</p>
                  <div className="mt-5">
                    <RequisitionItemByDate date={date} />
                  </div>
                </div>
              </CardContent>
            </Card>
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
