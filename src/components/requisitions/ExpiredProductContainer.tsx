import React from 'react';
import clsx from 'clsx';
import { ArrowRight } from 'react-feather';
import Badge from '@/components/Badge';
import Card from '@/components/Card';
import DataGrid from '@/components/DataGrid';
import Button from '@/components/Button';
import { useFetcher } from '@/app/hooks/useFetcher';
import { useRouter } from 'next/navigation';
import {API_ENDPOINTS, API_URL} from "@/lib/api";

export default function ExpiredProductContainer({ title, type, limit }: {title: any, type: any, limit?: any}) {
  const router = useRouter();
  const params = limit ? `?limit=${limit}` : '';
  const endpoint = `/product_details/${type}${params}`;
  const {
    data: expired_products = [],
    meta,
    error,
    isLoading,
    mutate,
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
      label: 'Expired Date',
      dataTransformation: (value: any) => (
        <Badge size="small" variant={type === 'expired' ? 'danger' : 'success'}>
          {value}
        </Badge>
      ),
    },
  ];

  const shouldDisplayViewAllButton = meta && meta.total > 5 && limit;

  return (
    <Card className="h-96 flex flex-col">
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
        <DataGrid
          columns={columns}
          data={expired_products}
          tHeadProps={{ color: 'primary' }}
          isLoading={isLoading}
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
