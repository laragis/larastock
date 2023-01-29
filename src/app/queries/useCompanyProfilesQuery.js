// https://finfo-api.vndirect.com.vn/v4/company_profiles?q=code:FUEVFVND

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { selectApiData } from 'app/utils/index';

const getCompanyProfiles = (params) => axios.get(`https://finfo-api.vndirect.com.vn/v4/company_profiles`, {
  params: {
    q: 'code:FUESSVFL',
    ...params
  }
});

function useCompanyProfilesQuery(params, options = {}) {
  return useQuery({
    queryKey: ['company', 'profiles', params],
    queryFn: () => getCompanyProfiles(params),
    select: selectApiData,
    ...options,
  });
}

export default useCompanyProfilesQuery;
