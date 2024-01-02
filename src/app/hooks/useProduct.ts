import {API_URL, authFetcher} from '@/lib/api';
import useSWRImmutable from 'swr/immutable';

export const useProduct = (productId) => {
  const {data: result = {}, error, isLoading} = useSWRImmutable(API_URL + '/products/' + productId, authFetcher);
  const {data: data={}, included=[], meta = {}, links = {}} = result;
  let {id, attributes: product={}} = data
  product = {id, ...product}
  return {product, included, meta, links, error, isLoading};
};