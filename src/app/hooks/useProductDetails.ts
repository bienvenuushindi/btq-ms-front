import useSWR from 'swr';
import {API_URL, authFetcher} from '@/lib/api';

export const useProductDetails = (id) => {
  const {data: result, error, isLoading} = useSWR(API_URL + '/products/' + id + '/product_details', authFetcher);
  const {data, meta = {}, links = {}} = result;
  return {data, error, isLoading};
};