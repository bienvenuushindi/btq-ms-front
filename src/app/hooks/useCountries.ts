import useSWR from 'swr';
import {API_URL, authFetcher} from '@/lib/api';
import useSWRImmutable from 'swr/immutable';

export const useCountries = () => {
  const {data: result={}, error, isLoading} = useSWRImmutable(API_URL + '/countries/', authFetcher);
  const {data: countries=[], meta = {}, links = {}} = result;
  return {countries , error, isLoading};
};