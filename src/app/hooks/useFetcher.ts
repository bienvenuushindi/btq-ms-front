import {authFetcher} from '@/lib/api';
import useSWRImmutable from 'swr/immutable';

export const useFetcher = (url: string) => {
  const {data: result = {}, error, isLoading, mutate} = useSWRImmutable(  url , authFetcher);
  return {...result, error, isLoading, mutate};
};