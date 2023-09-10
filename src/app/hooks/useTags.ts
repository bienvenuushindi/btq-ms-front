import useSWR from 'swr';
import {API_URL, authFetcher} from '@/lib/api';

export const useTags = (url = null) => {
  const {data: result = {}, error, isLoading} = useSWR(url || API_URL + '/tags', authFetcher);
  const {data, meta = {}, links = {}} = result;
  return {data, meta, links, error, isLoading};
};