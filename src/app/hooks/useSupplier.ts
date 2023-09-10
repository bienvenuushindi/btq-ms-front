import useSWR from 'swr';
import {API_URL, authFetcher} from '@/lib/api';

export default function useSupplier(supplierID){
  const {data: result = {}, error, isLoading} = useSWR(API_URL + '/suppliers/' + supplierID, authFetcher);
  const {data, included=[], meta = {}, links = {}} = result;
  console.log("data")
  console.log(data)
  return {data, included, meta, links, error, isLoading};
}