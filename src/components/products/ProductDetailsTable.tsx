'use client'
import {useContext} from 'react';
import {SidebarContext} from '@/components/sidebar/SidebarContainer';
import {Edit, Trash2} from 'react-feather';
import {useParams, useRouter} from 'next/navigation';
import EntityTable from '@/components/EntityTable';

export const ProductDetailsTable = ({details, isLoading}) => {
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
      key: 'size',
      type: 'text',
      label: 'Size',
      // dataTransformation: (value: any) => value.toUpperCase(),
    },
    {
      key: 'unit_price',
      type: 'text',
      label: 'Price Unit',
      // dataTransformation: (value: any) => value.toUpperCase(),
    },
    {
      key: 'box_price',
      type: 'text',
      label: 'Price Box',
      // dataTransformation: (value: any) => value.toUpperCase(),
    },
    {
      key: 'dozen_price',
      type: 'text',
      label: 'Price Dozen',
    }, {
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
      key: 'image_urls',
      type: 'details',
      label: 'Photos',
      action: (data) => {
        setOpenBar({state: true, target: 'product_details'});
        setSidebarData(data.attributes);
      }
    },
    {
      key: 'button',
      type: 'details',
      label: "Prices",
      action: (data) => {
        setOpenBar({state: true, target: 'price_details'});
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