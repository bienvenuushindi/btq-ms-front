'use client'
import DataGrid from '@/components/DataGrid';
import {useRouter} from 'next/navigation';

export default function RequisitionsList({items}) {
  const router = useRouter()
  const columns = [
    {
      key: 'date',
      label: 'Date',
      type: 'text'
    },
    {
      key: 'total_price',
      label: 'Total Amount',
      type: 'text'
    },
    {
      key: 'price_currency',
      label: 'Currency',
      type: 'text'
    },
    {
      key: 'count_products',
      label: 'No of Products ',
      type: 'text'
    },
    {
      key: 'count_products_bought',
      label: 'Products Bought',
      type: 'text'
    },
    {
      key: 'archived',
      label: 'Archived',
      type: 'text',
      dataTransformation: (value)=>{
       return value ? 'Archived' : 'No'
      }
    },
    {
      key: 'Show',
      type: 'button',
      label: 'Show',
      action: async (data) => {
           await router.replace('/requisitions/' + data.id)
      }
    }
  ];

  return (
    <>
      <DataGrid data={items} columns={columns}/>
    </>
  );
}