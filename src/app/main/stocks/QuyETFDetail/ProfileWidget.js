import { Card, CardContent, Link, Typography } from '@mui/material';
import DataList from '../QuyMoDetail/DataList';
import useCompanyProfilesQuery from 'app/queries/useCompanyProfilesQuery';
import { head } from 'lodash';
import { selectApiData, toDateStr } from 'app/utils/index';

function ProfileWidget({code}){
  const {data} = useCompanyProfilesQuery({
    q: `code:${code}`,
  }, {
    select: data => head(selectApiData(data))
  })

  const {
    email,
    fax,
    floor,
    foundDate,
    phone,
    vnAddress,
    vnName,
    vnSummary,
    website,
  } = data || {};

  return (
    <Card>
      <CardContent>
        <Typography className="text-orange-500 text-lg font-medium">{vnName} / {code}</Typography>

        <DataList
          data={[
            {label: 'Sàn CK', value: floor},
            {label: 'Ngày thành lập', value: toDateStr(foundDate)},
            {label: 'Địa chỉ', value: vnAddress},
            {label: 'Điện thoại', value: phone},
            {label: 'Email', value: email, visible: !!email},
            {label: 'Fax', value: fax},
            {label: 'Website', value: <Link href={`https://${website}`} target="_blank" className="!text-blue-500">{website}</Link> },
          ]}
        />

      </CardContent>
    </Card>
  )
}

export default ProfileWidget