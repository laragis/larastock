import Card from 'app/shared-components/Card';
import { orderBy } from 'lodash';
import { CardContent, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { formatNumber, toDateStr } from 'app/utils/index';
import Table from 'app/shared-components/Table/Table';
import useMacroInterestsQuery from 'app/queries/useMacroInterestsQuery';

const options = [
  { label: 'Không kỳ hạn', value: `term:0` },
  { label: '1 tuần', value: `term:1~unit:WEEKLY` },
  { label: '1 tháng', value: `term:1~unit:MONTHLY` },
  { label: '3 tháng', value: `term:3~unit:MONTHLY` },
  { label: '6 tháng', value: `term:6~unit:MONTHLY` },
  { label: '12 tháng', value: `term:12~unit:MONTHLY` }
];

function Widget2() {
  const { isLoading, data } = useMacroInterestsQuery({
    q: `customerType:PERSONAL~channel:COUNTER~paymentType:MATURITY~${options[4]?.value}`,
  });

  const orderedData = orderBy(data, 'interestRate', 'desc');

  return (
    <Card loading={isLoading}>
      <CardContent className="flex justify-between">
        <Typography color="primary" className="text-lg font-medium">
          Lãi suất tiền gửi
        </Typography>
      </CardContent>
      <TableContainer>
        <Table size="small">
          <TableHead className="bg-[#E3E9F6]">
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Ngân hàng</TableCell>
              <TableCell>Lãi suất</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderedData?.map(({ source, interestRate, effectiveDate }, k) => {
              return (
                <TableRow key={k}>
                  <TableCell>{k + 1}</TableCell>
                  <TableCell>{source}</TableCell>
                  <TableCell>
                    <span title={`Ngày có hiệu lực ${toDateStr(effectiveDate)}`}>
                      {formatNumber(interestRate, '0,0.0')}%
                    </span>
                  </TableCell>
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
