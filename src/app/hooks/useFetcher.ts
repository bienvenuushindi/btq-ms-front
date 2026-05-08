import {authFetcher} from '@/lib/api';
import useSWR from 'swr';

export const useFetcher = (url: string | null) => {
  const {data: result = {}, error, isLoading, mutate} = useSWR(url, authFetcher, {
    revalidateOnMount: true,
  });
  return {...result, error, isLoading, mutate};
};
