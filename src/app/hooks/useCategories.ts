'use client';
import useSWR from 'swr';
import {API_URL, authFetcher} from '@/lib/api';

export const useCategories = () => {
  const {data: result={}, error, isLoading, mutate} = useSWR(API_URL + '/categories/', authFetcher);
  const {data: categories=[], meta = {}, links = {}} = result;
  return {categories , error, meta, links, isLoading,mutate};
};