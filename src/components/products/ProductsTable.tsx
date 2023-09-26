'use client';
import {BASE_URL} from '@/lib/api';
import Badge from '@/components/Badge';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {useProducts} from '@/app/hooks/useProducts';
import ProductsTableLoader from '@/components/banners/ProductsTableLoader';
import EntityTable from '@/components/EntityTable';
import ErrorBoundary from '@/components/ErrorBoundary';
import {Edit, Trash2} from 'react-feather';

export default function ProductsTable() {
  const [url, setUrl] = useState(null);
  const {data: products = [], meta, links, error, isLoading} = useProducts(url);
  const router = useRouter();
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

    }, {
      key: 'short_description',
      type: 'text',
      label: 'Description',
    }, {
      key: 'active',
      type: 'text',
      label: ' Status',
      dataTransformation: (value: any) => value ? <Badge variant="success">Active</Badge> :
        <Badge variant="danger">Inactive</Badge>,
    }, {
      key: 'created_at',
      type: 'text',
      label: 'Created At',
    }, {
      key: 'View',
      type: 'button',
      label: 'Details',
      action: async (data) => {
        await router.replace('/products/' + data.id);
      }
    },
  ];
  const actions = [
    {
      label: 'Edit',
      icon: (
        <Edit size={20}/>
      ),
      onClick: (rowIndex) => {
        console.log(`Edit clicked for row ${rowIndex}`);
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

  return (
    <ErrorBoundary error={error}>
      <EntityTable
        isLoading={isLoading}
        loader={<ProductsTableLoader/>}
        columns={columns}
        data={products}
        meta={meta}
        links={links}
        updateList={setUrl}
        entities={'products'}
        actions={actions}
      />
    </ErrorBoundary>
  );
}