import React from 'react';
import clsx from 'clsx';
import { ArrowRight } from 'react-feather';
import Badge from '@/components/Badge';
import Card from '@/components/Card';
import DataGrid from '@/components/DataGrid';
import Button from '@/components/Button';
import { useFetcher } from '@/app/hooks/useFetcher';
import { useRouter } from 'next/navigation';
import { BASE_URL } from '@/lib/api';

export default function ExpiredProductContainer({ title, type, limit }: {title: any, type: any, limit?: any}) {
  const router = useRouter();
  const params = limit ? `?limit=${limit}` : '';
  const endpoint = `/product_details/${type}${params}`;
  const {
    data: expired = [],
    meta: { count: productCount } = {},
    error,
    isLoading,
    mutate,
  } = useFetcher(endpoint);

  const columns = [
    {
      key: 'image_urls',
      type: 'picture',
      label: '',
      dataTransformation: (value: any) => BASE_URL + value[0],
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

  const shouldDisplayViewAllButton = productCount > 5 && limit;

  return (
    <Card>
      <div className="flex w-full justify-between items-center">
        <h3 className="font-semibold text-xl">{title}</h3>
        <div className="flex items-center gap-1">
          <span
            className={clsx(
              'px-2 rounded-2xl font-bold',
              type === 'expired' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
            )}
          >
            {productCount}
          </span>
          <span className={clsx(type === 'expired' ? 'text-red-300' : 'text-green-300')}>Product(s)</span>
        </div>
      </div>

      <DataGrid
        columns={columns}
        data={expired}
        tHeadProps={{ color: 'primary' }}
        isLoading={isLoading}
      />

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
