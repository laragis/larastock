import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { selectApiData } from 'app/utils/index';

// https://finfo-api.vndirect.com.vn/v4/stock_prices?sort=date&size=1500&q=code:FUESSVFL~date:gte:2022-01-28
// https://dstock.vndirect.com.vn/tong-quan/FUESSVFL/stock-chart-popup
// https://dchart.vndirect.com.vn/?symbol=FUESSVFL&theme=light


const getETFPrices = (params) => axios.get(`https://finfo-api.vndirect.com.vn/v4/stock_prices`, {
  params: {
    q: 'code:FUESSVFL~date:gte:2022-01-28',
    sort: 'date',
    size: 1500,
    ...params
  }
});

function useETFPricesQuery(params, options = {}) {
  return useQuery({
    queryKey: ['etf', 'prices', params],
    queryFn: () => getETFPrices(params),
    select: selectApiData,
    ...options,
  });
}

export default useETFPricesQuery;
