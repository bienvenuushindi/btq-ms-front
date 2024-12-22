import React from 'react';
import clsx from 'clsx';
import {ArrowRight, Edit, Trash2} from 'react-feather';
import Badge from '@/components/utils/Badge';
import Card from '@/components/utils/wrappers/Card';
import DataGrid from '@/components/table/DataGrid';
import Button from '@/components/utils/Button';
import { useFetcher } from '@/app/hooks/useFetcher';
import { useRouter } from 'next/navigation';
import {API_URL} from "@/lib/api";
import DataGridWithActions from "@/components/table/DataGridWIthActions";

export default function ExpiredProductContainer({ title, type, limit }: {title: any, type: any, limit?: any}) {
  const router = useRouter();
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
        console.log(row)
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
  const shouldDisplayViewAllButton = meta && meta.total > 5 && limit;

  return (
    <Card className="flex flex-col">
      <div className="flex w-full justify-between items-center py-3">
        <h3 className="font-semibold text-md">{title}</h3>
        <div className="flex items-center gap-1">
          <span
            className={clsx(
              'px-3 rounded font-bold',
              type === 'expired' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
            )}
          >
            {meta && meta.total}
          </span>
          {/*<span className={clsx(type === 'expired' ? 'text-red-300' : 'text-yellow-800')}>Product(s)</span>*/}
        </div>
      </div>

      <div className="flex-grow bg-gray-50">
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

      {shouldDisplayViewAllButton && (
        <Button
          onClick={async () => {
            await router.push(`/products/filters?status=${type}`);
          }}
          intent="none"
          className="flex justify-end p-2 my-2 ml-auto items-center"
        >
          <span className="text-md text-gray-700">View All</span> <ArrowRight size={20} />
        </Button>
      )}
    </Card>
  );
}
