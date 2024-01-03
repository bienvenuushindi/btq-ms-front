import {useFetcher} from '@/app/hooks/useFetcher';

export const useRequisitions = (url) => {
  const {data : requisitions=[], meta, links, error, isLoading, mutate} = useFetcher( '/requisitions', url);
  return {requisitions, meta, links, error, isLoading, mutate};
};