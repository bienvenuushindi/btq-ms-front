'use client'
import {useContext} from 'react';
import {SidebarContext} from '@/components/sidebar/SidebarContainer';
import {Edit, Trash2} from 'react-feather';
import {useParams, useRouter} from 'next/navigation';
import EntityTable from '@/components/EntityTable';
import Badge from '@/components/Badge';
import {BASE_URL} from '@/lib/api';

export const ProductDetailsTable = ({productName, details, isLoading}) => {
  const {setOpenBar, setSidebarData} = useContext(SidebarContext);
  const router = useRouter();
  const params = useParams();
  const productID = params.id;
  const actions = [
    {
      label: 'Edit',
      icon: (
        <Edit size={20}/>
      ),
      onClick: (rowIndex) => {
        router.push(`/products/${productID}/details/update/${rowIndex}`);
      },
    },
    {
      label: 'Delete',
      icon: (
        <Trash2 size={20}/>
      ),
      onClick: (rowIndex) => {
        console.log(`Delete clicked for row ${rowIndex}`);
      },
    },
  ];
  const columns = [
    {
      key: 'image_urls',
      type: 'picture',
      label: '',
      className:'w-full bg-gray-600',
      dataTransformation: (value: any) => BASE_URL + value[0],
      // action: (data) => {
      //   // setOpenBar({state: true, target: 'supplier_details'});
      //   // setSidebarData(data.attributes);
      // }
    },
    {
      key: 'size',
      type: 'text',
      label: 'Size',
      dataTransformation: (value: any) => <span>{productName}<br/>{value.toUpperCase()}</span>,
    },
    {
      key: 'unit_price',
      type: 'text',
      label: 'Price Unit',
      appendTransformation: (val1: any, val2: any) => isNaN(val1)? val1 : val1 +" "+ val2['currency']
    },
    {
      key: 'box_price',
      type: 'text',
      label: 'Price Box',
      appendTransformation: (val1: any, val2: any) => isNaN(val1)? val1 : val1 +" "+  val2['currency']
    },
    {
      key: 'dozen_price',
      type: 'text',
      label: 'Price Dozen',
      appendTransformation: (val1: any, val2: any) => isNaN(val1)? val1 : val1 +" "+  val2['currency']
    },
    {
      key: 'box_units',
      type: 'text',
      label: 'Units Box',
      // dataTransformation: (value: any) => value.toUpperCase(),
    },
    {
      key: 'dozen_units',
      type: 'text',
      label: 'Unit Dozen',
    },
    {
      key: 'expired_date',
      type: 'text',
      label: 'Expiration',
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
      label: "Prices",
      action: (data) => {
        setOpenBar({state: true, target: 'price_details',title:  productName + ' (' + data.attributes.size+ ')'});
        setSidebarData(data);
      }
    },
  ];

  return (
    <>
      <EntityTable
        isLoading={isLoading}
        columns={columns}
        data={details}
        actions={actions}
        searchable={false}
      />
    </>
  );
};