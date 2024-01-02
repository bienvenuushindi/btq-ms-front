import useSWR from 'swr';
import {API_URL, authFetcher} from '@/lib/api';
import useSWRImmutable from 'swr/immutable';

export const usePriceDetails = (productDetailID) => {
  const {data: result=[], error, isLoading} = useSWRImmutable(API_URL + '/product_details/'+productDetailID+'/price_details', authFetcher);
  return {result , error, isLoading};
};