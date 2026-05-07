import React from 'react';
import { AlertTriangle, Box, Calendar, Clock, Truck } from 'react-feather';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { useFetcher } from '@/app/hooks/useFetcher';
import { API_ENDPOINTS } from '@/lib/api';
import TransitionLink from '@/components/navigation/TransitionLink';

const formatDashboardDate = (value) => {
  if (!value) return 'No date';

  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? value : format(date, 'dd MMM yyyy');
};

const toneClasses = {
  slate: 'bg-white text-slate-900',
  emerald: 'bg-emerald-50 text-emerald-700',
  orange: 'bg-orange-50 text-orange-700',
  sky: 'bg-sky-50 text-sky-700',
  amber: 'bg-amber-50 text-amber-700',
  rose: 'bg-rose-50 text-rose-700',
};

function DashboardMetricCard({ icon, label, value, detail, tone = 'slate', href, loadingMessage, actionLabel = 'View' }) {
  const hasAction = Boolean(href);

  return (
    <Card className={`rounded-[18px] border border-slate-200/90 shadow-[0_8px_18px_rgba(15,23,42,0.04)] ${toneClasses[tone]}`}>
      <CardContent className="flex h-full flex-col gap-2 p-3 sm:p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-semibold leading-snug text-slate-600">{label}</span>
          <span className="shrink-0 rounded-full bg-white/80 p-1.5 text-slate-600 ring-1 ring-inset ring-slate-200/80">
            {icon}
          </span>
        </div>
        <div className="font-display text-[1.25rem] font-bold sm:text-[1.35rem] md:text-[1.6rem]">{value}</div>
        <div className="min-h-[2.5rem] text-xs leading-5 text-slate-500">{detail}</div>
        {hasAction ? (
          <div className="pt-0.5">
            <TransitionLink
              href={href!}
              loadingMessage={loadingMessage || 'Opening page...'}
              className="inline-flex w-full justify-center rounded-lg border border-slate-200 bg-white/80 px-2.5 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 sm:w-fit"
            >
              {actionLabel}
            </TransitionLink>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

export default function DashboardStats() {
  const { data: productStats = {} } = useFetcher(API_ENDPOINTS.PRODUCT_STATS);
  const { meta: supplierMeta } = useFetcher(API_ENDPOINTS.SUPPLIERS);
  const { data: shelfLifeStats = {} } = useFetcher(API_ENDPOINTS.PRODUCT_SHELF_LIFE_STATS);
  const { data: requisitions = [] } = useFetcher(API_ENDPOINTS.REQUISITIONS);
  const { data: recentRequisitions = {} } = useFetcher(API_ENDPOINTS.RECENT_REQUISITIONS);

  const activeProducts = productStats.active ?? 0;
  const inactiveProducts = productStats.inactive ?? 0;
  const suppliersTotal = supplierMeta?.total ?? 0;
  const expiringSoonTotal = shelfLifeStats.expiring_soon ?? 0;
  const expiredTotal = shelfLifeStats.expired ?? 0;
  const activeRequisition = recentRequisitions?.active;
  const latestRequisition = requisitions[0];

  const cards = [
    {
      label: 'Total Products',
      value: activeProducts + inactiveProducts,
      detail: 'All tracked product records',
      icon: <Box size={18} />,
      tone: 'slate',
      href: '/products',
      loadingMessage: 'Opening products...',
    },
    {
      label: 'Expired Soon',
      value: expiringSoonTotal,
      detail: 'Products that need attention before expiry',
      icon: <Clock size={18} />,
      tone: 'emerald',
      href: '/products/filters?status=expiring_soon',
      loadingMessage: 'Opening expiring soon products...',
    },
    {
      label: 'Expired',
      value: expiredTotal,
      detail: 'Products already past their shelf life',
      icon: <AlertTriangle size={18} />,
      tone: 'orange',
      href: '/products/filters?status=expired',
      loadingMessage: 'Opening expired products...',
    },
    {
      label: 'Suppliers',
      value: suppliersTotal,
      detail: 'Supplier accounts available in the system',
      icon: <Truck size={18} />,
      tone: 'sky',
      href: '/suppliers',
      loadingMessage: 'Opening suppliers...',
    },
    {
      label: 'Active Requisition Products',
      value: activeRequisition?.count_products ?? 0,
      detail: activeRequisition?.date
        ? `Scheduled for ${formatDashboardDate(activeRequisition.date)}`
        : 'No active requisition found',
      icon: <Calendar size={18} />,
      tone: 'amber',
      href: activeRequisition?.id ? `/requisitions/${activeRequisition.id}` : '/requisitions',
      loadingMessage: activeRequisition?.id ? 'Opening requisition details...' : 'Opening requisitions...',
      actionLabel: activeRequisition?.id ? 'View Requisition' : 'Create a Requisition',
    },
    {
      label: 'Last Recent Requisition',
      value: latestRequisition ? `#${latestRequisition.id}` : '--',
      detail: latestRequisition?.date
        ? `${latestRequisition.count_products ?? 0} products • ${formatDashboardDate(latestRequisition.date)}`
        : 'No requisition date available yet',
      icon: <Clock size={18} />,
      tone: 'rose',
      href: latestRequisition?.id ? `/requisitions/${latestRequisition.id}` : undefined,
      loadingMessage: 'Opening requisition details...',
      actionLabel: 'View Requisition',
    },
  ];

  return (
    <div className="grid w-full gap-3 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <DashboardMetricCard key={card.label} {...card} />
      ))}
    </div>
  );
}
