import useSWR from 'swr';
import {API_URL, authFetcher} from '@/lib/api';

export const useProductDetails = (id=null) => {
  const URL = API_URL + '/products/' + id + '/product_details'
  const {data: result={}, error, isLoading} = useSWR( URL, authFetcher);
  const {data, meta = {}, links = {}} = result;
  return {data, error, isLoading};
};