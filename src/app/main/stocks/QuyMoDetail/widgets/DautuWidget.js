import {
  Box,
  Card,
  CardContent,
  Link,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { find, map } from 'lodash';
import { colorClass, formatNumber } from 'app/utils/index';
import Table from 'app/shared-components/Table/Table';
import useStockChangePricesQuery from 'app/queries/useStockChangePricesQuery';
import clsx from 'clsx';
import useCompanyProfilesQuery from 'app/queries/useCompanyProfilesQuery';

const groupStocks = [
  {code: 'FPT', proportion: 12.2},
  {code: 'MWG', proportion: 6.5},
  {code: 'MBB', proportion: 6.4},
  {code: 'QNS', proportion: 5.1},
  {code: 'DPR', proportion: 4.5},
  {code: 'STB', proportion: 3.7},
  {code: 'SZC', proportion: 3.4},
  {code: 'KDH', proportion: 3.3},
  {code: 'PVS', proportion: 3.0},
  {code: 'BWE', proportion: 3.0},
]

const groupIndexs = [
  {code: 'VNINDEX'},
  {code: 'VN30'},
  {code: 'HNX'},
  {code: 'UPCOM'},
  {code: 'VN30F1M'},
]

function DautuWidget(){
  const codes = [
    ...map(groupIndexs, 'code'),
    ...map(groupStocks, 'code'),
  ]

  const {data: profiles} = useCompanyProfilesQuery({
    q: `code:${map(groupStocks, 'code').join(',')}`,
  })

  const {data} = useStockChangePricesQuery({
    q: `code:${codes.join(',')}~period:1Y`,
  })

  const getChangePct = (code) => find(data, {code})?.changePct

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" className="text-orange-500">Danh mục đầu tư</Typography>
      </CardContent>
      <div className="grid md:grid-cols-3 gap-16">
        <Box className="col-span-2 p">
          <TableContainer className="border border-b-0 rounded-r-lg">
            <Table size="small" >
              <TableHead className="bg-[#E3E9F6]">
                <TableRow>
                  <TableCell>Mã cổ phiếu</TableCell>
                  <TableCell>Tỷ trọng (%)</TableCell>
                  <TableCell>Thay đổi (%)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groupStocks.map(({code, proportion}, k) => {
                  const item = find(data, {code})
                  const pct = getChangePct(code)
                  const profile = find(profiles, {code})

                  return (
                    <TableRow key={k}>
                      <TableCell className="flex gap-16 text-right">
                        <Link className="text-inherit" underline="none" target="_blank" href={`https://dchart.vndirect.com.vn/?symbol=${code}&theme=light`} title={profile?.vnName}>{code}</Link>
                      </TableCell>
                      <TableCell>{formatNumber(proportion, '0.0')}</TableCell>
                      <TableCell className={clsx(colorClass(pct), 'font-medium')}>
                        <span title={`Cập nhật lúc ${item?.lastUpdated}`}>{formatNumber(pct, '0.0')}</span>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box>
          <TableContainer className="border rounded-l-lg">
            <Table size="small" className="">
              <TableHead className="bg-[#E3E9F6]">
                <TableRow>
                  <TableCell>Chỉ số</TableCell>
                  <TableCell>Thay đổi (%)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groupIndexs.map(({ code }, k) => {
                  const item = find(data, {code})
                  const pct = getChangePct(code)

                  return (
                    <TableRow key={k}>
                      <TableCell>
                        <Link underline="none" target="_blank" href={`https://dchart.vndirect.com.vn/?symbol=${code}&theme=light`}>{code}</Link>
                      </TableCell>
                      <TableCell className={clsx(colorClass(pct), 'font-medium')}>
                        <span title={`Cập nhật lúc ${item?.lastUpdated}`}>{formatNumber(pct, '0.0')}</span>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
    </Card>
  )
}

export default DautuWidget