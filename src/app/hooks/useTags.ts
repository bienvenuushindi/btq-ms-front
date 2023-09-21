import useSWR from 'swr';
import {API_URL, authFetcher} from '@/lib/api';
import useSWRImmutable from 'swr/immutable';

export const useTags = (url = null) => {
  const {data: result = {}, error, isLoading} = useSWRImmutable(url || API_URL + '/tags', authFetcher);
  const {data, meta = {}, links = {}} = result;
  return {data, meta, links, error, isLoading};
};