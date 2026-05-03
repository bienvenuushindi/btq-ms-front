import React from 'react';
import clsx from 'clsx';
import {ArrowRight, Edit, Trash2} from 'react-feather';
import Badge from '@/components/utils/Badge';
import Card from '@/components/utils/wrappers/Card';
import Button from '@/components/utils/Button';
import { useFetcher } from '@/app/hooks/useFetcher';
import { useRouter } from 'next/navigation';
import {API_URL} from "@/lib/api";
import DataGridWithActions from "@/components/table/DataGridWIthActions";
import {useRouteTransition} from '@/components/navigation/RouteTransitionProvider';

export default function ExpiredProductContainer({ title, type, limit }: {title: any, type: any, limit?: any}) {
  const router = useRouter();
  const {startNavigation} = useRouteTransition();
  const params = limit ? `?limit=${limit}` : '';
  const endpoint = `/product_details/${type}${params}`;
  const {
    data: expired_products = [],
    meta,
    isLoading,
  } = useFetcher(API_URL+endpoint);

  const columns = [
    {
      key: 'image_urls',
      type: 'picture',
      label: '',
      dataTransformation: (value: any) => value[0],
    },
    {
      key: 'size',
      type: 'text',
      label: 'Product Name',
      appendTransformation: (val1: any, val2: any) => clsx(val2['product_name'], val1),
    },
    {
      key: 'expired_date',
      type: 'text',
      label: 'Expired On',
      dataTransformation: (value: any) => (
        <Badge size="small" variant={type === 'expired' ? 'danger' : 'success'}>
          {value}
        </Badge>
      ),
    },
  ];
  const actions = [
    {
      label: 'Edit',
      className: 'text-lightBlue-100',
      icon: (
          <Edit size={20} color="#2962FF"/>
      ),
      onClick: (row) => {
        startNavigation('Opening update form...');
        router.push(`/products/${row.product_id}/details/update/${row.id}`);
      },
    },
    {
      label: 'Delete',
      className: 'text-red-600',
      icon: (
          <Trash2 size={20} color="#EF4444FF"/>
      ),
      onClick: (row) => {
        console.log(`Delete clicked for row ${row.id}`);
      },
    },
  ];
  const shouldDisplayViewAllButton = meta && meta.total > Number(limit || 10);

  return (
    <Card className="flex flex-col border-slate-200/70 bg-white/95">
      <div className="flex w-full items-center justify-between py-2">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Shelf life</p>
          <h3 className="font-display text-2xl text-primary">{title}</h3>
        </div>
        <div className="flex items-center gap-1">
          <span
            className={clsx(
              'rounded-full px-3 py-1 text-sm font-bold',
              type === 'expired' ? 'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200' : 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200'
            )}
          >
            {meta && meta.total}
          </span>
        </div>
      </div>

      <div className="flex-grow overflow-hidden rounded-2xl bg-slate-50/80">
        <div className="max-h-[620px] overflow-y-auto p-1">
          <DataGridWithActions
            columns={columns}
            data={expired_products}
            tHeadProps={{color: 'primary'}}
            isLoading={isLoading}
            actions={actions}
            loader={undefined}
            onSorting={undefined}
          />
        </div>
      </div>

      {shouldDisplayViewAllButton && (
        <Button
          onClick={async () => {
            await router.push(`/products/filters?status=${type}`);
          }}
          intent="none"
          className="my-2 ml-auto flex items-center justify-end rounded-full border border-slate-200 bg-white/80 px-4 py-2 hover:border-primary/30 hover:bg-blue-50"
        >
          <span className="text-md text-primary">View All</span> <ArrowRight size={20} />
        </Button>
      )}
    </Card>
  );
}
