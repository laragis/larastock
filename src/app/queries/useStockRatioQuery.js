import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { selectApiData } from 'app/utils/index';

export const defaultRatioCode = `PRICE_CHG_PCT_CR_1M,PRICE_CHG_PCT_CR_3M,PRICE_CHG_PCT_CR_6M,PRICE_CHG_PCT_CR_YD,PRICE_CHG_PCT_CR_1Y,PRICE_CHG_PCT_CR_3Y,PRICE_CHG_PCT_CR_5Y`

const getStockRatio = (params) =>
  axios.get(`https://finfo-api.vndirect.com.vn/v4/ratios`, {
    params: {
      q: `code:FPT,VNINDEX~reportDate:2023-01-27~ratioCode:${defaultRatioCode}`,
      size: 100e3,
      ...params,
    },
  });

function useStockRatioQuery(params, options = {}) {
  return useQuery({
    queryKey: ['stock', 'ratio', params],
    queryFn: () => getStockRatio(params),
    select: selectApiData,
    ...options,
  });
}

export default useStockRatioQuery;