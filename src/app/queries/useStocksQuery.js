import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { selectApiData } from 'app/utils/index';

const getStocks = (params) =>
  axios.get(`https://api-finfo.vndirect.com.vn/v4/stocks`, {
    params: {
      q: 'type:IFC,ETF,STOCK~status:LISTED',
      size: 10000,
      ...params
    }
  });

function useProductsQuery(params, options = {}) {
  return useQuery({
    queryKey: ['stock', 'list', params],
    queryFn: () => getStocks(params),
    select: selectApiData,
    ...options,
  });
}

export default useProductsQuery;
