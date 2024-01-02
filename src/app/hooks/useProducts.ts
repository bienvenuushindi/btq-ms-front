import useSWR from 'swr';
import {API_URL, authFetcher} from '@/lib/api';
import useSWRImmutable from 'swr/immutable';

export const useProducts = (url = null) => {
  const {data: result = {}, error, isLoading} = useSWRImmutable(url || API_URL + '/products', authFetcher);
  const {data, included=[], meta = {}, links = {}} = result;
  return {data, meta, links, error, isLoading};
};