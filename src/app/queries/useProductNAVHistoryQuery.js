import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { selectApiData } from 'app/utils/index';
import moment from 'moment';

const getProductNAVHistory = filters =>
  axios.post(`https://api.fmarket.vn/res/product/get-nav-history`, {
    isAllData: 0,
    // productId: 21,
    fromDate: moment().startOf('year').format('YYYYMMDD'),
    toDate: moment().format('YYYYMMDD'),
    ...filters
  });

function useProductNAVHistoryQuery(filters, options = {}) {
  return useQuery({
    queryKey: ['productNAVHistory', 'list', filters],
    queryFn: () => getProductNAVHistory(filters),
    select: selectApiData,
    ...options
  });
}

export default useProductNAVHistoryQuery;
