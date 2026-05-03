'use client';

import ContainerOne from '@/components/utils/wrappers/ContainerOne';
import Container from '@/components/utils/wrappers/Container';
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import ExpiredProductContainer from '@/components/requisitions/ExpiredProductContainer';
import { RequisitionInfoWrapper } from '@/components/requisitions/home-page/sections/RequisitionInfoWrapper';
import { RequisitionItemByDate } from '@/components/requisitions/home-page/RequisitionItemByDate';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ProductStats from '@/components/products/ProductStats';
import TransitionLink from '@/components/navigation/TransitionLink';

export default function HomePage() {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <ProtectedRoute>
      <Container>
        <ContainerOne>
          <Card className="w-full rounded-[30px] border-slate-200/90 bg-white">
            <CardHeader className="pb-3">
              <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Overview</p>
              <CardTitle className="font-display text-4xl font-bold text-slate-900">OasisMarket Snapshot</CardTitle>
              <CardDescription>
                A clean view of stock health, recent requisition activity, and the items that need attention first.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProductStats />
            </CardContent>
          </Card>
        </ContainerOne>
        <ContainerOne>
          <div className="grid w-full gap-4 xl:grid-cols-[1.4fr_0.8fr]">
            <Card className="rounded-[30px] border-slate-200/90 bg-white">
              <CardHeader>
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Quick links</p>
                    <CardTitle className="font-display text-3xl font-bold text-slate-900">Operations Hub</CardTitle>
                    <CardDescription>Jump into the busiest areas of the admin workspace.</CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <TransitionLink href="/products" loadingMessage="Opening products..." className="oasis-button rounded-2xl px-5 py-3 text-sm font-semibold text-white">View Products</TransitionLink>
                    <TransitionLink href="/requisitions" loadingMessage="Opening requisitions..." className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">Open Requisitions</TransitionLink>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-[26px] border border-slate-200 bg-slate-50 p-6">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Requisition pulse</p>
                    <h3 className="mt-3 font-display text-3xl font-bold text-slate-900">Latest activity</h3>
                    <p className="mt-2 text-sm text-slate-500">Track the newest active and archived requisitions without leaving the dashboard.</p>
                    <div className="mt-5">
                      <RequisitionInfoWrapper />
                    </div>
                  </div>
                  <div className="rounded-[26px] border border-slate-200 bg-slate-50 p-6">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Stock watch</p>
                    <h3 className="mt-3 font-display text-3xl font-bold text-slate-900">Attention needed</h3>
                    <p className="mt-2 text-sm text-slate-500">Expiring inventory stays visible so your next actions are obvious.</p>
                    <div className="mt-5 grid gap-4">
                      <ExpiredProductContainer title="Expired Soon" type="expiring_soon" limit={4} />
                      <ExpiredProductContainer title="Expired" type="expired" limit={4} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-[30px] border-slate-200/90 bg-white">
              <CardHeader>
                <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Calendar view</p>
                <CardTitle className="font-display text-3xl font-bold text-slate-900">Choose Day</CardTitle>
                <CardDescription>Select a date to inspect requisitions for that day.</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-[24px] border border-slate-200 bg-slate-50 p-3"
                />
              </CardContent>
            </Card>
          </div>
        </ContainerOne>
        {date && (
          <ContainerOne>
            <div className="w-full rounded-[30px] border border-slate-200/90 bg-white p-6 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
              <div className="mb-5">
                <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Selected day</p>
                <h3 className="font-display text-3xl font-bold text-slate-900">Requisitions by date</h3>
              </div>
              <RequisitionItemByDate date={date} />
            </div>
          </ContainerOne>
        )}
      </Container>
    </ProtectedRoute>
  );
}
