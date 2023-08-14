import useSWR from 'swr';
import {API_URL, authFetcher} from '@/lib/api';

export const useSuppliers = (id) => {
  const url_path = id ? '/countries/'+id+'/suppliers/' : '/suppliers'
  const {data: result = {}, error, isLoading} = useSWR(API_URL + url_path, authFetcher);
  const {data: suppliers=[], meta = {}, links = {}} = result;
  return {suppliers, error, isLoading};
};