import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { selectApiData } from 'app/utils/index';

const getStockPrices = (params) =>
  axios.get(`https://finfo-api.vndirect.com.vn/v4/stock_prices`, {
    params: {
      // q: 'code:FUEVFVND~date:gte:2023-01-01~date:lte:2023-01-19',
      sort: 'dates',
      size: 10000,
      ...params,
    },
  });

function useStockPricesQuery(params, options = {}) {
  return useQuery({
    queryKey: ['stock', 'prices', params],
    queryFn: () => getStockPrices(params),
    select: selectApiData,
    ...options,
  });
}

export default useStockPricesQuery;