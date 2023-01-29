import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { selectApiData } from 'app/utils/index';

const getETFIntraday = (params) => axios.get(`https://api-finfo.vndirect.com.vn/v4/stock_intraday_latest`, {
  params: {
    q: 'code:FUESSVFL',
    sort: 'time',
    size: 100000,
    ...params
  }
});

function useETFIntradayQuery(params, options = {}) {
  return useQuery({
    queryKey: ['etf', 'intraday', params],
    queryFn: () => getETFIntraday(params),
    select: selectApiData,
    ...options,
  });
}

export default useETFIntradayQuery;
