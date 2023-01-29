import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { selectApiData } from 'app/utils/index';

const getTechnicalSignals = (params) => axios.get(`https://finfo-api.vndirect.com.vn/v4/technical_signals?`, {
  params: {
    q: 'strategy:cipShort~code:HPG',
    ...params
  }
});

function useTechnicalSignalsQuery(params, options = {}) {
  return useQuery({
    queryKey: ['technicalSignals', 'list', params],
    queryFn: () => getTechnicalSignals(params),
    select: selectApiData,
    ...options,
  });
}

export default useTechnicalSignalsQuery