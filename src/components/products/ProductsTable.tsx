'use client'
import DataGrid from '@/components/DataGrid';
import {API_URL, BASE_URL} from '@/lib/api';
import Badge from '@/components/Badge';
import {useRouter} from 'next/navigation';
import {SearchBar} from '@/components/SearchBar';
import {useState} from 'react';
import {useProducts} from '@/app/hooks/useProducts';
import Paginate from '@/components/Paginate';
import TableMetaData from '@/components/TableMetaData';
import ProductsTableLoader from '@/components/banners/ProductsTableLoader';
import EntityTable from '@/components/EntityTable';

export default function ProductsTable() {
  const [url, setUrl] = useState(null);
  const {data: products = [], meta, links, error, isLoading} = useProducts(url);
  const router = useRouter()
  const columns = [
    {
      key: 'image_urls',
      type: 'picture',
      label: 'Product',
      dataTransformation: (value: any) => BASE_URL + value[0],
      action: (data) => {
        // setOpenBar({state: true, target: 'supplier_details'});
        // setSidebarData(data.attributes);
      }
    },
    {
      key: 'name',
      type: 'text',
      label: 'Product Name',
      // dataTransformation: (value: any) => value.toUpperCase(),
    }, {
      key: 'short_description',
      type: 'text',
      label: 'Description',
      // dataTransformation: (value: any) => value.toUpperCase(),
    }, {
      key: 'active',
      type: 'text',
      label: ' Status',
      dataTransformation: (value: any) => value ? <Badge variant="success">Active</Badge> : <Badge variant="danger">Inactive</Badge>,
    }, {
      key: 'created_at',
      type: 'text',
      label: 'Created At',
      // dataTransformation: (value: any) => value.toUpperCase(),
    }, {
      key: 'View',
      type: 'button',
      label: 'Details',
      action: async (data) => {
        await router.replace('/products/' + data.id)
      }
      // dataTransformation: (value: any) => value.toUpperCase(),
    },
  ];

  return (
    <>
      <EntityTable
        isLoading={isLoading}
        loader={<ProductsTableLoader/>}
        columns={columns}
        data={products}
        meta={meta}
        links={links}
        updateList={setUrl}
        entities={'products'}/>
    </>
  );
}