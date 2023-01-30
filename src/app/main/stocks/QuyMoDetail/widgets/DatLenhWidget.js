import { Alert, Card, Link, Typography } from '@mui/material';
import numeral from 'numeral';
import DataList from '../DataList';
import { formatNumber } from 'app/utils/index';

function DatLenhWidget({ data, sip }) {
  const {
    productTransactionDateModelList,
    productTradingSession,
    buyMinValue,
  } = data;

  const {
    productProgram,
    additionalNote,
    minCycleLength,
    nextSipSession,
    lastTransferDateTime
  } = sip || {}


  return (
    <Card className="p-12 h-full">
      <Typography className="font-medium text-orange-800 text-[18px]">Đầu tư</Typography>

      <DataList
        data={[
          { label: 'Đầu tư tối thiểu', value: `${numeral(buyMinValue).format('0,0')} VNĐ` },
          { label: 'Đặt lệnh và chuyển tiền mua', value: `Trước ${productTradingSession.closedOrderBookTimeString}` },
          { label: 'Ngày khớp lệnh', value: productTransactionDateModelList?.join(', ') },
          { label: 'Phiên khớp lệnh tiếp theo', value: productTradingSession.tradingTimeString }
        ]}
      />

      <Typography className="font-medium text-orange-800 text-[18px]">Định kỳ</Typography>

      <DataList
        data={[
          { label: 'Chương trình', value: productProgram?.name },
          { label: 'Đầu tư tối thiểu', value: formatNumber(productProgram?.buyMinValue) },
          { label: 'Thời gian đầu tư liên tục', value: `${minCycleLength} tháng` },
        ]}
      />

      <Alert severity="warning" icon={false} className="mt-8">
        <Typography>Đầu tư định kỳ là chương trình đầu tư tự động và liên tục.</Typography>
        <Typography>
          Thời điểm nhận tiền cuối cùng của kỳ tháng <span className="font-semibold">{nextSipSession}</span> là{' '}
          <span className="font-semibold">{lastTransferDateTime}</span>
        </Typography>
        <Typography>{additionalNote}</Typography>
      </Alert>
    </Card>
  );
}

export default DatLenhWidget;