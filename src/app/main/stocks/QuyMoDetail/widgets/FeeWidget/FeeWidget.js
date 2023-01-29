import { Box, Card, Divider, Typography } from '@mui/material';
import FeeTable from './FeeTable';
import { filter } from 'lodash';
import numeral from 'numeral';
import DataList from '../../DataList';
import OtherWidget from '../OtherWidget';

function FeeWidget({data}){
  const {
    customValue,
    managementFee,
    productFeeList,
    customField,
  } = data;

  const buyFees = filter(productFeeList, {type: 'BUY'})
  const sellFees = filter(productFeeList, {type: 'SELL'})
  const transferFees = filter(productFeeList, {type: 'TRANSFER'})

  const groups = [
    {
      headings: ['Giá trị mua', 'Phí mua'],
      rows: buyFees
    },
    {
      headings: ['Thời gian nắm giữ', 'Phí bán'],
      rows: sellFees,
      unitLabel: 'tháng'
    },
  ]

  return (
    <Card className="flex-1">
      <Box className="p-12 pb-6">
        <Typography className='font-medium text-orange-800 text-[18px]'>Phí</Typography>

        <DataList
          data={[
            {label: customField, value: <span className="text-red-500">{customValue}</span>},
            {label: `Phí quản lý`, value: <span className="text-red-500">{managementFee}%</span>},
          ]}
        />
      </Box>

      <FeeTable groups={groups}/>
    </Card>
  )
}

export default FeeWidget