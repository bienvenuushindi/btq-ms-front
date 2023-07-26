'use client';
import useSWR from 'swr';
import {API_URL, authFetcher} from '@/lib/api';
import {useParams, usePathname} from 'next/navigation';


export default function Product() {
  const params = useParams();
  const productId = params.id
  console.log(productId)
  const {data, error, isLoading} = useSWR(API_URL + '/products/' + productId, authFetcher);
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  console.log(data);
  return <div>
    <ul>
      {data && <li
        key={data.id}>{data.attributes.name}, {data['attributes']['description']}</li>}
    </ul>
  </div>;
}