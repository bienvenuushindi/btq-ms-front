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

const variantLabel = (count) => `${count} ${count === 1 ? 'variant' : 'variants'}`;

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
    <Card className={`rounded-xl border border-slate-200/80 shadow-[0_7px_16px_rgba(15,23,42,0.04)] sm:rounded-[18px] sm:border-slate-200/90 ${toneClasses[tone]}`}>
      <CardContent className="flex h-full min-h-[86px] flex-col gap-1.5 p-3 sm:min-h-0 sm:gap-2 sm:p-4">
        <div className="flex items-start justify-between gap-2 sm:gap-3">
          <span className="text-[10px] font-semibold leading-snug text-slate-600 sm:text-xs">{label}</span>
          <span className="hidden shrink-0 rounded-full bg-white/80 p-1.5 text-slate-600 ring-1 ring-inset ring-slate-200/80 sm:inline-flex">
            {icon}
          </span>
        </div>
        <div className="font-display text-xl font-bold leading-tight sm:text-[1.35rem] md:text-[1.6rem]">{value}</div>
        <div className="line-clamp-2 min-h-0 text-[10px] leading-4 text-slate-500 sm:min-h-[2.5rem] sm:text-xs sm:leading-5">{detail}</div>
        {hasAction ? (
          <div className="hidden pt-0.5 sm:block">
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
  const todayDate = format(new Date(), 'yyyy-MM-dd');
  const { data: currentUser } = useFetcher(API_ENDPOINTS.CURRENT_USER);
  const { data: productStats = {} } = useFetcher(API_ENDPOINTS.PRODUCT_STATS);
  const role = currentUser?.role?.toString().toLowerCase();
  const isSupplier = role === 'supplier';
  const isAdmin = role === 'admin';
  const { meta: supplierMeta } = useFetcher(isSupplier ? null : API_ENDPOINTS.SUPPLIERS);
  const { data: shelfLifeStats = {} } = useFetcher(API_ENDPOINTS.PRODUCT_SHELF_LIFE_STATS);
  const { data: requisitions = [] } = useFetcher(API_ENDPOINTS.REQUISITIONS);
  const { meta: activeRequisitionMeta } = useFetcher(isAdmin ? `${API_ENDPOINTS.REQUISITIONS}?status=not_archived` : null);
  const { meta: todayRequisitionMeta } = useFetcher(isAdmin ? `${API_ENDPOINTS.REQUISITIONS}?date=${todayDate}` : null);
  const { data: recentRequisitions = {} } = useFetcher(API_ENDPOINTS.RECENT_REQUISITIONS);

  const activeVariants = productStats.active ?? 0;
  const inactiveVariants = productStats.inactive ?? 0;
  const marketVariants = productStats.market ?? 0;
  const marketTotalVariants = productStats.market_total ?? marketVariants;
  const suppliersTotal = supplierMeta?.total ?? 0;
  const expiringSoonTotal = shelfLifeStats.expiring_soon ?? 0;
  const expiredTotal = shelfLifeStats.expired ?? 0;
  const latestRequisition = requisitions[0];
  const recentActiveRequisition = recentRequisitions?.active;
  const activeRequisition = recentActiveRequisition?.id
    ? recentActiveRequisition
    : latestRequisition && !latestRequisition.archived
      ? latestRequisition
      : null;
  const activeRequisitionsTotal = activeRequisitionMeta?.total ?? 0;
  const todayRequisitionsTotal = todayRequisitionMeta?.total ?? 0;

  const cards = [
    {
      label: 'Total Variants',
      value: activeVariants + inactiveVariants,
      detail: 'All tracked sellable product variants',
      icon: <Box size={18} />,
      tone: 'slate',
      href: '/products',
      loadingMessage: 'Opening products...',
    },
    {
      label: 'Expired Soon',
      value: expiringSoonTotal,
      detail: 'Variants that need attention before expiry',
      icon: <Clock size={18} />,
      tone: 'emerald',
      href: '/products/filters?status=expiring_soon',
      loadingMessage: 'Opening expiring soon products...',
    },
    {
      label: 'Expired',
      value: expiredTotal,
      detail: 'Variants already past their shelf life',
      icon: <AlertTriangle size={18} />,
      tone: 'orange',
      href: '/products/filters?status=expired',
      loadingMessage: 'Opening expired products...',
    },
    isSupplier
      ? {
          label: 'Market Variants',
          value: marketTotalVariants,
          detail: `${marketVariants} variants still available to add to your shop`,
          icon: <Truck size={18} />,
          tone: 'sky',
          href: '/products',
          loadingMessage: 'Opening market variants...',
          actionLabel: 'Browse Market',
        }
      : {
          label: 'Suppliers',
          value: suppliersTotal,
          detail: 'Supplier accounts available in the system',
          icon: <Truck size={18} />,
          tone: 'sky',
          href: '/suppliers',
          loadingMessage: 'Opening suppliers...',
    },
    isAdmin
      ? {
          label: 'Active Requisitions',
          value: activeRequisitionsTotal,
          detail: 'Open requisitions across all supplier sessions',
          icon: <Calendar size={18} />,
          tone: 'amber',
          href: '/requisitions',
          loadingMessage: 'Opening requisitions...',
          actionLabel: 'View Requisitions',
        }
      : {
          label: 'Open Requisition Items',
          value: activeRequisition?.count_products ?? 0,
          detail: activeRequisition?.date
            ? `Requisition #${activeRequisition.id} scheduled for ${formatDashboardDate(activeRequisition.date)}`
            : 'No active requisition found',
          icon: <Calendar size={18} />,
          tone: 'amber',
          href: activeRequisition?.id ? `/requisitions/${activeRequisition.id}` : '/requisitions',
          loadingMessage: activeRequisition?.id ? 'Opening requisition details...' : 'Opening requisitions...',
          actionLabel: activeRequisition?.id ? 'View Requisition' : 'Create a Requisition',
        },
    isAdmin
      ? {
          label: "Today's Requisitions",
          value: todayRequisitionsTotal,
          detail: `Scheduled for ${formatDashboardDate(todayDate)} across all supplier sessions`,
          icon: <Clock size={18} />,
          tone: 'rose',
          href: `/requisitions?date=${todayDate}`,
          loadingMessage: "Opening today's requisitions...",
          actionLabel: 'View Requisitions',
        }
      : {
          label: 'My Newest Requisition',
          value: latestRequisition ? `#${latestRequisition.id}` : '--',
          detail: latestRequisition?.date
            ? `${variantLabel(latestRequisition.count_products ?? 0)} in the latest visible requisition • ${formatDashboardDate(latestRequisition.date)}`
            : 'No requisition found yet',
          icon: <Clock size={18} />,
          tone: 'rose',
          href: latestRequisition?.id ? `/requisitions/${latestRequisition.id}` : undefined,
          loadingMessage: 'Opening requisition details...',
          actionLabel: 'View Requisition',
        },
  ];

  return (
    <div className="grid w-full grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <DashboardMetricCard key={card.label} {...card} />
      ))}
    </div>
  );
}
