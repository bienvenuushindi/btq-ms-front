import useSWR from 'swr';
import {API_URL, authFetcher} from '@/lib/api';

export const useProduct = (productId) => {
  const {data: result = {}, error, isLoading} = useSWR(API_URL + '/products/' + productId, authFetcher);
  const {data, included=[], meta = {}, links = {}} = result;
  return {data, included, meta, links, error, isLoading};
};