import DataGrid from '@/components/DataGrid';
import {useContext} from 'react';
import {SidebarContext} from '@/components/sidebar/SidebarContainer';

export default function SuppliersTable({suppliers}) {
  const {setOpenBar, setSidebarData} = useContext(SidebarContext);
  const columns = [
    {
      key: 'shop_name',
      type: 'text',
      label: 'Shop Name',
      // dataTransformation: (value: any) => value.toUpperCase(),
    },
    {
      key: 'image_urls',
      type: 'details',
      label: 'Photos',
      action: (data) => {
        setOpenBar({state: true, target: 'supplier_details'});
        setSidebarData(data.attributes);
      }
    },
  ];

  return (
    <>
      <DataGrid
        columns={columns}
        data={suppliers}
        tHeadProps={{color: 'primary'}}
      />
    </>
  );
}