import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { selectApiData } from 'app/utils/index';

const getStockStats = (code) => axios.get(`https://sb-api.stockbook.vn/api/stocks/${code}/stats`);

function useStockStatsQuery(code, options = {}) {
  return useQuery({
    queryKey: ['stock', 'stats', code],
    queryFn: () => getStockStats(code),
    select: data => data?.data,
    ...options,
  });
}

export default useStockStatsQuery