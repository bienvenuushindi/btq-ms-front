import {useFetcher} from '@/app/hooks/useFetcher';

export const useRequisitions = (url = null) => {
  const {data, meta, links, error, isLoading, mutate} = useFetcher(url || '/requisitions');
  console.log(data)
  console.log(error)
  return {data, meta, links, error, isLoading, mutate};
};