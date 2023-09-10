'use client'
import DataGrid from '@/components/DataGrid';
import {BASE_URL} from '@/lib/api';
import Badge from '@/components/Badge';
import {useRouter} from 'next/navigation';

export default function CategoriesTable({categories}) {
  const router = useRouter()
  const columns = [
    // {
    //   key: 'image_urls',
    //   type: 'picture',
    //   label: 'Product',
    //   dataTransformation: (value: any) => BASE_URL + value[0],
    //   action: (data) => {
    //     // setOpenBar({state: true, target: 'supplier_details'});
    //     // setSidebarData(data.attributes);
    //   }
    // },
    {
      key: 'name',
      type: 'text',
      label: 'Category Name',
      // dataTransformation: (value: any) => value.toUpperCase(),
    }, {
      key: 'description',
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
      key: 'count_products',
      type: 'text',
      label: 'Numb of Products',
      // dataTransformation: (value: any) => value.toUpperCase(),
    },
    // {
    //   key: 'View',
    //   type: 'button',
    //   label: 'Details',
    //   action: async (data) => {
    //     await router.replace('/products/' + data.id)
    //   },
    //   // dataTransformation: (value: any) => value.toUpperCase(),
    // },
  ];

  return (
    <>
      <DataGrid
        columns={columns}
        data={categories}
        tHeadProps={{color: 'primary'}}
      />
    </>
  );
}