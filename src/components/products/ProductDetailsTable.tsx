import DataGrid from '@/components/DataGrid';
import {useContext} from 'react';
import {SidebarContext} from '@/components/sidebar/SidebarContainer';
import TableLoader from '@/components/banners/TableLoader';

export const ProductDetailsTable = ({details, isLoading}) => {
  const {setOpenBar, setSidebarData} = useContext(SidebarContext);
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
      <DataGrid
        data={details}
        columns={columns}
        tHeadProps={{color: 'primary'}}
        isLoading={isLoading}
      />
    </>
  );
};