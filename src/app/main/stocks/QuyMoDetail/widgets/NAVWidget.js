import { Box, Card, Typography } from '@mui/material';
import clsx from 'clsx';
import { formatNAV, formatNumber, NAVColorClass, toDateStr } from 'app/utils/index';
import { maxBy, minBy } from 'lodash';
import moment from 'moment';

function NAVWidget({data, navHistory}){
  const {
    productNavChange,
    extra,
  } = data;

  const maxNav = maxBy(navHistory, 'nav')
  const minNav = minBy(navHistory, 'nav')

  return (
    <Card spacing={1} className='p-12 leading-8'>
      <Box className='flex flex-col'>
        <span className="font-medium text-orange-800 text-[18px]">NAV/CCQ</span>
        <Typography className={clsx('font-medium text-[42px]', NAVColorClass(extra?.lastNAV))}>
          <span title={`NAV/CCQ ngày ${toDateStr(extra?.lastNAVDate)}`}>{formatNAV(extra?.lastNAV)}</span>
          <span className="relative">
            <Box component="sup" className="text-[12px] text-gray-400" title={`NAV/CCQ cao nhất 2023 (${toDateStr(maxNav?.navDate, 'DD/MM')})`} sx={{top: -22, left: 10}}>
              {formatNumber(maxNav?.nav)}
            </Box>
            <Box component="sub" className="text-[12px] text-gray-400 absolute" title={`NAV/CCQ thấp nhất 2023 (${toDateStr(minNav?.navDate, 'DD/MM')})`} sx={{left: 10, bottom: 18}}>
              {formatNumber(minNav?.nav)}
            </Box>
          </span>
        </Typography>
      </Box>
      <Box className='flex items-center gap-6'>
        Thay đổi so với đầu năm
        <Typography className={clsx('font-medium text-lg', NAVColorClass(productNavChange?.navToLastYear))}>
          {productNavChange?.navToLastYear} %
        </Typography>
      </Box>
      <Box>
        Cập nhật ngày <span className="text-gray-800 font-medium">{toDateStr(extra?.lastNAVDate)}</span>
      </Box>
    </Card>
  )
}

export default NAVWidget