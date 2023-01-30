import Card from 'app/shared-components/Card';
import useStockChangePricesQuery from 'app/queries/useStockChangePricesQuery';
import { find, map, get } from 'lodash';
import { CardContent, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useState } from 'react';
import { colorClass, formatNumber } from 'app/utils/index';
import clsx from 'clsx';
import Table from 'app/shared-components/Table/Table';
import moment from 'moment';

const codeList = [
  {code: 'VNINDEX'},
  {code: 'VN30'},
  {code: 'HNX'},
  {code: 'UPCOM'},
  {code: 'VN30F1M'},
]

const periods = [
  {label: '1 ngày', value: '1D'},
  {label: 'Từ đầu tháng', value: 'MTD'},
  {label: 'Từ đầu quý', value: 'QTD'},
  {label: 'Từ đầu năm', value: 'YTD'},
  {label: '1 tuần', value: '5D'},
  {label: '1 tháng', value: '1M'},
  {label: '3 tháng', value: '3M'},
  {label: '6 tháng', value: '6M'},
  {label: '1 năm', value: '1Y'},
]

function Widget1(){
  const [period, setPeriod] = useState('1D')

  const {isLoading, data} = useStockChangePricesQuery({
    q: `code:${map(codeList, 'code').join(',')}~period:${period}`
  })

  const items = codeList.map(({code}) => ({
    ...find(data, {code})
  }))

  const lastUpdated = get(items, '0.lastUpdated')

  return (
    <Card loading={isLoading}>
      <CardContent className="flex justify-between">
        <div>Chọn kỳ thời gian</div>
        {/*<div className="text-sm"><span className="text-gray-600">Cập nhật lúc</span> <span className="font-medium">{moment(lastUpdated).format('DD/MM/YYYY H:mm')}</span></div>*/}
      </CardContent>
      <TableContainer>
        <Table size="small">
          <TableHead className="bg-[#E3E9F6]">
            <TableRow>
              <TableCell>Chỉ số</TableCell>
              <TableCell>Điểm</TableCell>
              <TableCell></TableCell>
              <TableCell>Thay đổi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(({code, price, change, changePct, name}, k) => {
              return (
                <TableRow key={k} className={clsx({ 'bg-[#e3e9f65e]': k === 0 })}>
                  <TableCell className={clsx({ 'text-orange-500': k === 0 })}>
                    <span title={name}>{code}</span>
                  </TableCell>
                  <TableCell className={clsx(colorClass(changePct))}>
                    {formatNumber(price, '0,0.[00]')}
                  </TableCell>
                  <TableCell className={clsx(colorClass(changePct))}>
                    {formatNumber(change, '0,0.[00]')}
                  </TableCell>
                  <TableCell className={clsx(colorClass(changePct))}>
                    {formatNumber(changePct, '0,0.[00]')}%
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

      </TableContainer>

    </Card>
  )
}

export default Widget1