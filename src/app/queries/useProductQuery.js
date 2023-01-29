import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { selectApiData } from 'app/utils/index';

const getProduct = (id) => axios.get(`https://api.fmarket.vn/res/products/${id}`);

function useProductQuery(id, options = {}) {
  return useQuery({
    queryKey: ['product', 'detail', id],
    queryFn: () => getProduct(id),
    select: selectApiData,
    ...options,
  });
}

export default useProductQuery;
