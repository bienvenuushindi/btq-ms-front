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
            <CardHeader className="pb-2">
              <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Overview</p>
              <CardTitle className="font-display text-[1.8rem] font-bold text-slate-900 md:text-[1.95rem]">OasisMarket Snapshot</CardTitle>
              <CardDescription>
                A clean view of stock health, recent requisition activity, and the items that need attention first.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DashboardStats />
            </CardContent>
          </Card>
        </ContainerOne>
        <ContainerOne>
          <Card className="w-full rounded-[26px] border-slate-200/90 bg-white">
            <CardHeader>
              <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Shelf life</p>
              <CardTitle className="font-display text-xl font-bold text-slate-900 md:text-[1.55rem]">Shelf-Life Watch</CardTitle>
              <CardDescription>Up to 10 visible items per list, with in-card scrolling whenever the list overflows.</CardDescription>
            </CardHeader>
            <CardContent>
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
              <CardHeader>
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Quick links</p>
                    <CardTitle className="font-display text-xl font-bold text-slate-900 md:text-[1.55rem]">Operations Hub</CardTitle>
                    <CardDescription>Jump into the busiest areas of the admin workspace.</CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <TransitionLink href="/products" loadingMessage="Opening products..." className="oasis-button rounded-2xl px-5 py-3 text-sm font-semibold text-white">View Products</TransitionLink>
                    <TransitionLink href="/requisitions" loadingMessage="Opening requisitions..." className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">Open Requisitions</TransitionLink>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="min-w-0 rounded-[18px] border border-slate-200 bg-slate-50 p-3.5 md:p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Requisition summary</p>
                  <h3 className="mt-2.5 font-display text-xl font-bold text-slate-900 md:text-[1.55rem]">Calendar-driven details</h3>
                  <p className="mt-2 text-sm text-slate-500">Use the calendar to inspect the requisition summary for a selected day, including date, items, total, and currency.</p>
                  <div className="mt-5">
                    <RequisitionItemByDate date={date} />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="min-w-0 rounded-[22px] border-slate-200/90 bg-white">
              <CardHeader>
                <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Calendar view</p>
                <CardTitle className="font-display text-xl font-bold text-slate-900 md:text-[1.55rem]">Choose Day</CardTitle>
                <CardDescription>Select a date to inspect requisitions for that day.</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="max-w-full rounded-[18px] border border-slate-200 bg-slate-50 p-2"
                />
              </CardContent>
            </Card>
          </div>
        </ContainerOne>
      </Container>
    </ProtectedRoute>
  );
}
