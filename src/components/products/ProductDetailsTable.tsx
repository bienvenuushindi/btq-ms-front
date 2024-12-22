'use client'
import {useContext} from 'react';
import {SidebarContext} from '@/components/sections/sidebar/SidebarContainer';
import {Edit, Trash2} from 'react-feather';
import {useParams, useRouter} from 'next/navigation';
import EntityTable from '@/components/table/EntityTable';
import Badge from '@/components/utils/Badge';
import DateDisplay from "@/components/DateDisplay";

export const ProductDetailsTable = ({product, isLoading}) => {
  const {setOpenBar, setSidebarData} = useContext(SidebarContext);
  const router = useRouter();
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
      key: 'image_urls',
      type: 'picture',
      label: '',
      className:'w-full bg-gray-600',
      dataTransformation: (value: any) => value[0],
      // action: (data) => {
      //   // setOpenBar({state: true, target: 'supplier_details'});
      //   // setSidebarData(data.attributes);
      // }
    },
    {
      key: 'size',
      type: 'text',
      label: 'Variants',
      dataTransformation: (value: any) => <span>{product.name}<br/>{value.toUpperCase()}</span>,
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
      dataTransformation: (value: any) => value ? <Badge variant="success">Active</Badge> :
        <Badge variant="danger">Inactive</Badge>,
    },
    {
      key: 'button',
      type: 'details',
      label: "Suppliers",
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