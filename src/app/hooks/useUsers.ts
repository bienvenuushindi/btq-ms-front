import useSWR from 'swr';
import {API_URL, authFetcher} from '@/lib/api';

export const useUsers = (url = null) => {
  const {data: result = {}, error, isLoading} = useSWR(url || API_URL + '/users', authFetcher);
  const {data, meta = {}, links = {}} = result;
  return {data, meta, links, error, isLoading};
};