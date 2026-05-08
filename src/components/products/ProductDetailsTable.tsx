'use client'
import {useContext} from 'react';
import {SidebarContext} from '@/components/sections/sidebar/SidebarContainer';
import {Edit, Trash2} from 'react-feather';
import {useParams, useRouter} from 'next/navigation';
import Image from 'next/image';
import EntityTable from '@/components/table/EntityTable';
import DateDisplay from "@/components/DateDisplay";
import {useRouteTransition} from '@/components/navigation/RouteTransitionProvider';
import StatusIndicator from '@/components/utils/StatusIndicator';
import {getImageUrls} from '@/lib/helper';

export const ProductDetailsTable = ({product, isLoading}) => {
  const {setOpenBar, setSidebarData} = useContext(SidebarContext);
  const router = useRouter();
  const {startNavigation} = useRouteTransition();
  const params = useParams();
  const productID = params.id;
  const actions = [
    {
      label: 'Edit',
      className: 'text-lightBlue-100',
      icon: (
        <Edit size={20} color="#2962FF"/>
      ),
      onClick: (row) => {
        startNavigation('Opening update form...');
        router.push(`/products/${productID}/details/update/${row.id}`);
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
  const columns = [
    {
      key: 'size',
      type: 'text',
      label: 'Variants',
      dataTransformation: (value: any, row: any) => {
        const imageSrc = getImageUrls(row.image_urls || [])[0] || '/images/product-placeholder.png';

        return (
          <div className="flex min-w-0 items-center gap-3">
            <Image
              src={imageSrc}
              alt={`${product.name} ${value}`}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full border border-slate-200 bg-white object-cover"
              priority
            />
            <span className="min-w-0 font-semibold text-slate-900">
              {product.name}<br/>{value.toUpperCase()}
            </span>
          </div>
        );
      },
    },
    {
      key: 'unit_price',
      type: 'text',
      label: 'Unit Prices',
      appendTransformation: (val1: any, val2: any) => isNaN(val1)? val1 : val1 +" "+ val2['currency']
    },
    {
      key: 'box_price',
      type: 'text',
      label: 'Box Prices',
      appendTransformation: (val1: any, val2: any) => isNaN(val1)? val1 : val1 +" "+  val2['currency']
    },
    {
      key: 'dozen_price',
      type: 'text',
      label: 'Group Prices',
      appendTransformation: (val1: any, val2: any) => isNaN(val1)? val1 : val1 +" "+  val2['currency']
    },
    {
      key: 'box_units',
      type: 'text',
      label: 'Box Units',
      // dataTransformation: (value: any) => value.toUpperCase(),
    },
    {
      key: 'dozen_units',
      type: 'text',
      label: 'Group Units',
    },
    {
      key: 'expired_date',
      type: 'text',
      label: 'Expired',
      dataTransformation: (value: any) => <DateDisplay date={value} />
    },
    {
      key: 'status',
      type: 'text',
      label: ' Status',
      dataTransformation: (value: any) => <StatusIndicator active={value} />,
    },
    {
      key: 'button',
      type: 'details',
      label: (row) => `Suppliers (${row.suppliers?.length || 0})`,
      action: (data) => {
        setOpenBar({state: true, target: 'price_details',title:  product.name + ' (' + data.size+ ')'});
        setSidebarData(data);
      }
    },
  ];

  return (
    <>
      <EntityTable
        isLoading={isLoading}
        columns={columns}
        data={product.product_details}
        actions={actions}
        searchable={false}
      />
    </>
  );
};
