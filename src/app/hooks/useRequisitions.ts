import {useFetcher} from '@/app/hooks/useFetcher';

export const useRequisitions = (url = null) => {
  const {data : requisitions=[], meta, links, error, isLoading, mutate} = useFetcher(url || '/requisitions');
  return {requisitions, meta, links, error, isLoading, mutate};
};