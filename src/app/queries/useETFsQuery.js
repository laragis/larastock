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

const getETFs = (params) =>
  axios.get(`https://api-finfo.vndirect.com.vn/v4/stocks`, {
    params: {
      q: 'type:ETF~status:LISTED',
      fields: `code,companyName,companyNameEng,shortName,floor,industryName,type`,
      size: 1000,
      ...params
    }
  });

function useETFsQuery(params, options = {}) {
  return useQuery({
    queryKey: ['etf', 'list', params],
    queryFn: () => getETFs(params),
    select: selectApiData,
    ...options,
  });
}

export default useETFsQuery;
