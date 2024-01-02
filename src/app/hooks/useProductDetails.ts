import useSWR from 'swr';
import {API_URL, authFetcher} from '@/lib/api';
import useSWRImmutable from 'swr/immutable';

export const useProductDetails = (productID=null) => {
  const URL = API_URL + '/products/' + productID + '/product_details'
  const {data: result={}, error, isLoading} = useSWRImmutable( URL, authFetcher);
  const {data, meta = {}, links = {}} = result;
  return {data, error, isLoading};
};