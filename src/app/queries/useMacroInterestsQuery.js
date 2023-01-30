import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { selectApiData } from 'app/utils/index';

const getMacroInterests = (params) =>
  axios.get(`https://finfo-api.vndirect.com.vn/v4/macro_interests`, {
    params: {
      // q: 'customerType:PERSONAL~channel:COUNTER~paymentType:MATURITY~term:0',
      // q: 'customerType:PERSONAL~channel:COUNTER~paymentType:MATURITY~unit:WEEKLY~term:1',
      // q: 'customerType:PERSONAL~channel:COUNTER~paymentType:MATURITY~unit:MONTHLY~term:1',
      // q: 'customerType:PERSONAL~channel:COUNTER~paymentType:MATURITY~unit:MONTHLY~term:3',
      q: 'customerType:PERSONAL~channel:COUNTER~paymentType:MATURITY~unit:MONTHLY~term:6',
      // q: 'customerType:PERSONAL~channel:COUNTER~paymentType:MATURITY~unit:MONTHLY~term:12',
      ...params
    }
  });

function useMacroInterestsQuery(params, options = {}) {
  return useQuery({
    queryKey: ['macroInterests', 'list', params],
    queryFn: () => getMacroInterests(params),
    select: selectApiData,
    ...options,
  });
}

export default useMacroInterestsQuery;
