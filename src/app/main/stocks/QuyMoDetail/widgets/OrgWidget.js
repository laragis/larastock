import { Card, Link, Typography } from '@mui/material';
import DataList from '../DataList';

function OrgWidget({data}){
  const {
    shortName,
    name,
    email,
    phonePostal,
    phone,
    website,
    templateContract
  } = data?.owner || {};

  return (
    <Card className='p-12'>
      <Typography className="font-medium text-orange-800 text-[18px]">{shortName}</Typography>
      <Typography className="text-gray-600">{name}</Typography>

      <DataList
        className="pt-6"
        data={[
          {label: 'Email', value: email},
          {label: 'Phone', value: `+${phonePostal} ${phone}`},
          {label: 'Website', value: <Link href={website} target="_blank" className="!text-blue-500">{shortName}</Link>},
          {label: 'Mẫu hợp đồng', value: <Link href={templateContract} className="!text-blue-500">Link</Link>},
        ]}
      />
    </Card>
  )
}

export default OrgWidget