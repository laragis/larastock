import axios from 'axios';
import {get} from 'lodash'
import { useQuery } from '@tanstack/react-query';

const getStockReportDate = (params) =>
  axios.get(`https://finfo-api.vndirect.com.vn//v4/ratios/latest`, {
    params: {
      order: 'reportDate',
      filter: 'ratioCode:PRICE_CHG_PCT_CR_1M',
      fields: 'reportDate',
      ...params,
    },
  });

function useStockReportDateQuery(params, options = {}) {
  return useQuery({
    queryKey: ['stock', 'ratioDate', params],
    queryFn: () => getStockReportDate(params),
    select: data => get(data, 'data.data.0.reportDate'),
    ...options,
  });
}

export default useStockReportDateQuery;