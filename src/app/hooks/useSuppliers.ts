import useSWR from 'swr';
import {API_URL, authFetcher} from '@/lib/api';
import useSWRImmutable from 'swr/immutable';

export const useSuppliers = (url = null) => {
  const {data: result = {}, error, isLoading} = useSWRImmutable(url || API_URL + '/suppliers', authFetcher);
  const {data: suppliers = [], meta = {}, links = {}} = result;
  return {suppliers, meta, links, error, isLoading};
};