import useSWR from 'swr';
import {API_URL, authFetcher} from '@/lib/api';

export const useCountries = () => {
  const {data: result, error, isLoading} = useSWR(API_URL + '/countries/', authFetcher);
  const {data: countries=[], meta = {}, links = {}} = result;
  return {countries , error, isLoading};
};