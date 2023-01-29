import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { selectApiData } from 'app/utils/index';

const getProductSIP = (id) => axios.get(`https://api.fmarket.vn/res/sip-detail/${id}`);

function useProductSIPQuery(id, options = {}) {
  return useQuery({
    queryKey: ['productSIP', 'detail', id],
    queryFn: () => getProductSIP(id),
    select: selectApiData,
    ...options,
  });
}

export default useProductSIPQuery;
