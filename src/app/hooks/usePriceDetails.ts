import useSWR from 'swr';
import {API_URL, authFetcher} from '@/lib/api';

export const usePriceDetails = (productDetailID) => {
  const {data: result, error, isLoading} = useSWR(API_URL + '/product_details/'+productDetailID+'/price_details', authFetcher);
  const {data: priceDetails=[], meta = {}, links = {}} = result;
  return {priceDetails , error, isLoading};
};