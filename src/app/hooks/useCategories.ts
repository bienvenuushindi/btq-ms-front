'use client';
import useSWR from 'swr';
import {API_URL, authFetcher} from '@/lib/api';
import useSWRImmutable from 'swr/immutable';

export const useCategories = (url = null) => {
  const {data: result = {}, error, isLoading, mutate} = useSWRImmutable(url || API_URL + '/categories/', authFetcher);
  const {data: categories = [], meta = {}, links = {}} = result;
  return {categories, error, meta, links, isLoading, mutate};
};