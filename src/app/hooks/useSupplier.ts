import useSWR from 'swr';
import {API_URL, authFetcher} from '@/lib/api';
import useSWRImmutable from 'swr/immutable';

export default function useSupplier(supplierID){
  const {data: result = {}, error, isLoading} = useSWRImmutable(API_URL + '/suppliers/' + supplierID, authFetcher);
  const {data, included=[], meta = {}, links = {}} = result;
  return {data, included, meta, links, error, isLoading};
}