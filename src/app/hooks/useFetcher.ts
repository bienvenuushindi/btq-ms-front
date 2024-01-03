import {API_URL, authFetcher} from '@/lib/api';
import useSWRImmutable from 'swr/immutable';

export const useFetcher = (path, url) => {
  const {data: result = {}, error, isLoading, mutate} = useSWRImmutable(  url || API_URL + path, authFetcher);
  const {data, meta = {}, links = {}} = result;
  return {data, meta, links, error, isLoading, mutate};
};