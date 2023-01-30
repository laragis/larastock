import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { selectApiData } from 'app/utils/index';

const getStockChangePrices = (params) =>
  axios.get(`https://finfo-api.vndirect.com.vn/v4/change_prices`, {
    params: {
      q: 'code:VNINDEX,VN30,HNX,UPCOM,VN30F1M~period:YTD',
      ...params,
    },
  });

function useStockChangePricesQuery(params, options = {}) {
  return useQuery({
    queryKey: ['stock', 'changePrices', params],
    queryFn: () => getStockChangePrices(params),
    select: selectApiData,
    ...options,
  });
}

export default useStockChangePricesQuery;