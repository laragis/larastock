import { Card, Link, Typography } from '@mui/material';
import { map } from 'lodash';
import DataList from '../DataList';

function OtherWidget({ data }) {
  const { productAssetAllocationModelList, productSupervisoryBankAccount, riskLevel } = data;

  return (
    <Card className="p-12">
      <Typography className="font-medium text-orange-800 text-[18px]">Khác</Typography>
      <DataList
        data={[
          { label: 'Tài sản đầu tư', value: map(productAssetAllocationModelList, 'name').join(', ') },
          { label: 'Mức độ rủi ro', value: riskLevel.name },
          {
            label: 'Ngân hàng lưu ký, giám sát và quản trị quỹ',
            value: (
              <Link href={productSupervisoryBankAccount?.bank?.website} className="!text-blue-500" target="_blank">
                {productSupervisoryBankAccount?.bank?.shortName} ({productSupervisoryBankAccount?.bank?.stockName})
              </Link>
            )
          }
        ]}
      />
    </Card>
  );
}

export default OtherWidget;