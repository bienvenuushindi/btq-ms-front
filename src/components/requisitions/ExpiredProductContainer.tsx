import React, {useState} from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import {ArrowRight, Edit, MoreVertical, Package, Trash2} from 'react-feather';
import Card from '@/components/utils/wrappers/Card';
import Button from '@/components/utils/Button';
import {useFetcher} from '@/app/hooks/useFetcher';
import {useRouter} from 'next/navigation';
import {API_ENDPOINTS, API_URL} from '@/lib/api';
import {useRouteTransition} from '@/components/navigation/RouteTransitionProvider';
import CustomPopover from '@/components/popover/CustomPopover';
import {getImageUrls} from '@/lib/helper';
import Badge from '@/components/utils/Badge';
import EntityTable from '@/components/table/EntityTable';

const formatExpiryDate = (value?: string) => {
  if (!value) return 'No expiry date';

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) return value;

  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(parsedDate);
};

const buildProductLabel = (item: any) => {
  return [item?.product_name, item?.size].filter(Boolean).join(' - ') || 'Unnamed product';
};

const ProductImage = ({src, alt}: {src?: string; alt: string}) => {
  if (!src) {
    return (
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-100 text-slate-400 sm:h-[74px] sm:w-[74px] sm:rounded-[20px]">
        <Package size={20}/>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={74}
      height={74}
      className="h-14 w-14 shrink-0 rounded-2xl border border-slate-200 bg-slate-100 object-cover sm:h-[74px] sm:w-[74px] sm:rounded-[20px]"
    />
  );
};

const LoadingCards = () => (
  <div className="space-y-3">
    {Array.from({length: 3}).map((_, index) => (
      <div
        key={`loading-card-${index}`}
        className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-2.5 py-2.5 sm:gap-3 sm:rounded-[24px] sm:px-3 sm:py-3"
      >
        <div className="h-14 w-14 animate-pulse rounded-2xl bg-slate-200 sm:h-[74px] sm:w-[74px] sm:rounded-[20px]"/>
        <div className="flex-1 space-y-2">
          <div className="h-4 w-2/3 animate-pulse rounded-full bg-slate-200"/>
          <div className="h-3 w-1/2 animate-pulse rounded-full bg-slate-100"/>
        </div>
        <div className="h-8 w-8 animate-pulse rounded-full bg-slate-100"/>
      </div>
    ))}
  </div>
);

export default function ExpiredProductContainer({title, type, limit}: {title: any, type: any, limit?: any}) {
  const router = useRouter();
  const {startNavigation} = useRouteTransition();
  const params = limit ? `?limit=${limit}` : '';
  const endpoint = `/product_details/${type}${params}`;
  const [url, setUrl] = useState(() => API_URL + endpoint);
  const {
    data: expiredProducts = [],
    meta,
    links,
    isLoading,
  } = useFetcher(url);
  const {data: shelfLifeStats = {}} = useFetcher(API_ENDPOINTS.PRODUCT_SHELF_LIFE_STATS);
  const totalItems = type === 'expired' ? (shelfLifeStats.expired ?? 0) : (shelfLifeStats.expiring_soon ?? 0);

  const actions = [
    {
      label: 'Edit',
      className: 'text-sky-700',
      icon: <Edit size={18} color="#0369a1"/>,
      onClick: (row) => {
        startNavigation('Opening update form...');
        router.push(`/products/${row.product_id}/details/update/${row.id}`);
      },
    },
    {
      label: 'Delete',
      className: 'text-rose-600',
      icon: <Trash2 size={18} color="#e11d48"/>,
      onClick: (row) => {
        console.log(`Delete clicked for row ${row.id}`);
      },
    },
  ];
  const shouldDisplayViewAllButton = totalItems > Number(limit || 10);
  const isHomePreview = Boolean(limit);

  const columns = [
    {
      key: 'image_urls',
      type: 'picture',
      label: '',
      dataTransformation: (value: any) => getImageUrls(value || [])[0],
    },
    {
      key: 'size',
      type: 'text',
      label: 'Product Name',
      appendTransformation: (value: any, row: any) => clsx(row.product_name, value ? ` - ${value}` : ''),
    },
    {
      key: 'expired_date',
      type: 'text',
      label: type === 'expired' ? 'Expired On' : 'Expires On',
      dataTransformation: (value: any) => (
        <Badge
          size="small"
          variant={type === 'expired' ? 'danger' : 'warning'}
          className="px-2.5 py-1 text-[11px] normal-case tracking-normal"
        >
          {formatExpiryDate(value)}
        </Badge>
      ),
    },
  ];

  if (!isHomePreview) {
    return (
      <Card className="flex min-w-0 flex-col rounded-2xl border-slate-200/80 bg-white p-3 shadow-sm sm:rounded-[30px] sm:p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 sm:text-xs sm:tracking-[0.28em]">Shelf Life</p>
            <h3 className="mt-1 font-display text-lg font-bold text-slate-900 sm:text-[1.45rem]">{title}</h3>
          </div>
          <span
            className={clsx(
              'inline-flex min-w-9 items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-bold ring-1 ring-inset sm:min-w-[42px] sm:px-3 sm:py-1 sm:text-sm',
              type === 'expired'
                ? 'bg-rose-50 text-rose-700 ring-rose-200'
                : 'bg-amber-50 text-amber-700 ring-amber-200'
            )}
          >
            {totalItems}
          </span>
        </div>

        <div className="mt-3 min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white sm:mt-4 sm:rounded-[24px]">
          <EntityTable
            columns={columns}
            data={expiredProducts}
            isLoading={isLoading}
            meta={meta}
            links={links}
            actions={actions}
            loader={undefined}
            updateList={setUrl}
            searchable={false}
          />
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex min-h-0 min-w-0 flex-col rounded-2xl border-slate-200/80 bg-white p-2.5 shadow-sm sm:min-h-[420px] sm:rounded-[30px] sm:p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 sm:text-xs sm:tracking-[0.28em]">Shelf Life</p>
          <h3 className="mt-1 font-display text-lg font-bold text-slate-900 sm:text-[1.45rem]">{title}</h3>
        </div>
        <span
          className={clsx(
            'inline-flex min-w-9 items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-bold ring-1 ring-inset sm:min-w-[42px] sm:px-3 sm:py-1 sm:text-sm',
            type === 'expired'
              ? 'bg-rose-50 text-rose-700 ring-rose-200'
              : 'bg-amber-50 text-amber-700 ring-amber-200'
          )}
        >
          {totalItems}
        </span>
      </div>

      <div className="mt-3 min-w-0 rounded-2xl border border-slate-200 bg-slate-50/85 p-2 sm:rounded-[28px] sm:p-3">
        <div className="mb-3 flex flex-col gap-1 px-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <p className="text-sm font-semibold text-slate-700">{title}</p>
          <span className="text-xs text-slate-400">
            {limit ? `Showing up to ${limit}` : `${expiredProducts.length} item${expiredProducts.length === 1 ? '' : 's'}`}
          </span>
        </div>

        <div className="max-h-[420px] space-y-2 overflow-y-auto pr-0.5 sm:max-h-[540px] sm:space-y-3 sm:pr-1">
          {isLoading ? (
            <LoadingCards/>
          ) : expiredProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-3 py-8 text-center text-sm text-slate-500 sm:rounded-[24px] sm:px-5 sm:py-10">
              No shelf-life items found in this section.
            </div>
          ) : (
            expiredProducts.map((item) => {
              const imageSrc = getImageUrls(item.image_urls || [])[0];
              const productLabel = buildProductLabel(item);

              return (
                <div
                  key={item.id}
                  className="flex min-w-0 items-start gap-2.5 rounded-2xl border border-slate-200 bg-white px-2.5 py-2.5 shadow-[0_8px_20px_rgba(15,23,42,0.05)] sm:gap-3 sm:rounded-[24px] sm:px-3 sm:py-3"
                >
                  <ProductImage src={imageSrc} alt={productLabel}/>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-semibold text-slate-900 sm:text-sm md:text-[15px]">{productLabel}</p>
                    <div className="mt-2">
                      <Badge
                        size="small"
                        variant={type === 'expired' ? 'danger' : 'warning'}
                        className="max-w-full whitespace-normal px-2 py-0.5 text-[10px] normal-case tracking-normal sm:px-2.5 sm:py-1 sm:text-[11px]"
                      >
                        {type === 'expired' ? 'Expired on' : 'Expires on'} {formatExpiryDate(item.expired_date)}
                      </Badge>
                    </div>
                  </div>

                  <div className="shrink-0 self-center sm:self-start">
                    <CustomPopover
                      title={
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-700 sm:h-10 sm:w-10">
                          <MoreVertical size={16}/>
                        </span>
                      }
                    >
                      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_34px_rgba(15,23,42,0.12)]">
                        <div className="grid gap-1 p-2">
                          <span className="px-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Actions</span>
                          {actions.map((action) => (
                            <Button
                              key={`${item.id}-${action.label}`}
                              size="small"
                              intent="text"
                              className="flex w-full items-center rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                              onClick={() => action.onClick(item)}
                            >
                              <span className="mr-2">{action.icon}</span>
                              <span className={clsx('font-medium', action.className)}>{action.label}</span>
                            </Button>
                          ))}
                        </div>
                      </div>
                    </CustomPopover>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {shouldDisplayViewAllButton && (
          <div className="mt-4 flex justify-end">
            <Button
              onClick={async () => {
                startNavigation('Opening shelf life list...');
                await router.push(`/products/filters?status=${type}`);
              }}
              intent="none"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 hover:border-primary/30 hover:bg-sky-50 sm:gap-2 sm:px-4 sm:py-2"
            >
              <span className="text-xs font-semibold text-primary sm:text-sm">View All</span>
              <ArrowRight size={16}/>
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
