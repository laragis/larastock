import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { selectApiData } from 'app/utils/index';

const getLSTienGui = (filters) =>
  axios.post(`https://finfo-api.vndirect.com.vn/v4/macro_interests`, {
    q: 'customerType:PERSONAL~channel:COUNTER~paymentType:MATURITY~term:0',
    // q: 'customerType:PERSONAL~channel:COUNTER~paymentType:MATURITY~term:0',
    // q: 'customerType:PERSONAL~channel:COUNTER~paymentType:MATURITY~unit:WEEKLY~term:1',
    // q: 'customerType:PERSONAL~channel:COUNTER~paymentType:MATURITY~unit:MONTHLY~term:1',
    // q: 'customerType:PERSONAL~channel:COUNTER~paymentType:MATURITY~unit:MONTHLY~term:3',
    // q: 'customerType:PERSONAL~channel:COUNTER~paymentType:MATURITY~unit:MONTHLY~term:6',
    // q: 'customerType:PERSONAL~channel:COUNTER~paymentType:MATURITY~unit:MONTHLY~term:12',
    filters
  });

function useLSTienGuiQuery(filters, options = {}) {
  return useQuery({
    queryKey: ['lsTienGui', 'list', filters],
    queryFn: () => getLSTienGui(filters),
    select: selectApiData,
    ...options,
  });
}

export default getLSTienGui;
