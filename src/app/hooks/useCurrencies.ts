'use client'
import useSWR from 'swr';
import {API_URL, authFetcher} from '@/lib/api';
import useSWRImmutable from 'swr/immutable';

export  default  function useCurrencies(){
  const {data: result = {}, error, isLoading, mutate} = useSWRImmutable(API_URL + '/currencies', authFetcher);
  const {data} = result;
  return {data, error, isLoading, mutate};
}