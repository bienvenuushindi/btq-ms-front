import useSWRImmutable from 'swr/immutable';
import {API_URL, authFetcher} from '@/lib/api';

export const useRequisition = (reqDate) => {
  const {data : result={}, error, isLoading, mutate} = useSWRImmutable(  API_URL + '/requisitions/date/' + reqDate, authFetcher);
  const {data: item={}} = result
  const {id,attributes} = item || {}
  const requisition = id && {id, ...attributes}
  return {requisition, error, isLoading, mutate};
};