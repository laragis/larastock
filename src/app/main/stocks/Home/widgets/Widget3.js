import Card from 'app/shared-components/Card';
import { orderBy } from 'lodash';
import { CardContent, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { formatNumber, toDateStr } from 'app/utils/index';
import Table from 'app/shared-components/Table/Table';
import useMacroInterestsQuery from 'app/queries/useMacroInterestsQuery';
import useProductsQuery from 'app/queries/useProductsQuery';
import moment from 'moment';

const options = [
  { label: 'Không kỳ hạn', value: `term:0` },
  { label: '1 tuần', value: `term:1~unit:WEEKLY` },
  { label: '1 tháng', value: `term:1~unit:MONTHLY` },
  { label: '3 tháng', value: `term:3~unit:MONTHLY` },
  { label: '6 tháng', value: `term:6~unit:MONTHLY` },
  { label: '12 tháng', value: `term:12~unit:MONTHLY` }
];

function Widget2() {
  const { isLoading, data } = useProductsQuery({
    types: ['GOLD'],
    issuerIds: [],
    page: 1,
    pageSize: 100,
    fundAssetTypes: [],
    bondRemainPeriods: [],
    searchField: ''
  }, {
    select: data => data.data
  });

  const rows = data?.data?.rows
  const lastUpdated = moment(data?.time).format('H:mm, DD/MM/YYYY')

  return (
    <Card loading={isLoading}>
      <CardContent className="flex justify-between">
        <Typography color="primary" className="text-lg font-medium">
          Lãi suất tiền gửi
        </Typography>
        <Typography className="text-sm">
          Ngày cập nhật {lastUpdated}
        </Typography>

      </CardContent>
      <TableContainer>
        <Table size="small">
          <TableHead className="bg-[#E3E9F6]">
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Loại vàng</TableCell>
              <TableCell>Công ty</TableCell>
              <TableCell>Giá mua (VND/chỉ)</TableCell>
              <TableCell>Giá bán (VND/chỉ)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map(({ name, owner, productGold }, k) => {
              return (
                <TableRow key={k}>
                  <TableCell>{k + 1}</TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell>{owner?.shortName}</TableCell>
                  <TableCell>{formatNumber(productGold?.buyPrice, '0,0.[00]')}</TableCell>
                  <TableCell>{formatNumber(productGold?.sellPrice, '0,0.[00]')}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

export default Widget2;
