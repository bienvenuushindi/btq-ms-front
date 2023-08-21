'use client';
import DataGrid from '@/components/DataGrid';
import {useContext, useEffect, useState} from 'react';
import {SidebarContext} from '@/components/sidebar/SidebarContainer';
import {deleteItem} from '@/lib/api';
import {useRouter} from 'next/navigation';

export default function RequisitionItemsTable({details, requisitionId}) {
  const {setOpenBar, setSidebarData} = useContext(SidebarContext);
  const [data, setData] = useState(details);
  useEffect(() => {
    setData(details);
  }, [details]);
  const columns = [
    {
      key: 'name',
      type: 'text',
      label: 'Product ',
      // dataTransformation: (value: any) => value.toUpperCase(),
    },
    {
      key: 'size',
      type: 'text',
      label: 'Size',
      // dataTransformation: (value: any) => value.toUpperCase(),
    },
    {
      key: 'button',
      type: 'details',
      label: 'Details',
      action: (data) => {
        setOpenBar({state: true, target: 'requisition_details'});
        setSidebarData(data);
      }
    },
    {
      key: 'Remove',
      type: 'button',
      label: 'Remove',
      action: async (data) => {
        await deleteItem('/requisitions/' + requisitionId + '/product_details/' + data.id + '/remove_item');
        setData((prev) => prev.filter(item => item.id !== data.id));
      }
    }
  ];

  return (
    <>
      <DataGrid
        data={data}
        columns={columns}
        tHeadProps={{color: 'primary'}}
      />
    </>
  );
};