import useSWR from 'swr';
import {API_URL, authFetcher} from '@/lib/api';

export const useFetcher = (url) => {
  const {data: result = {}, error, isLoading, mutate} = useSWR(API_URL + url, authFetcher);
  const {data, meta = {}, links = {}} = result;
  return {data, meta, links, error, isLoading, mutate};
};