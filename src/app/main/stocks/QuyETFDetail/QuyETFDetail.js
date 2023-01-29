import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useParams } from 'react-router-dom';
import { Card, CardContent, IconButton, Link, Typography } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import useETFPricesQuery from 'app/queries/useETFPricesQuery';
import useCompanyProfilesQuery from 'app/queries/useCompanyProfilesQuery';
import { selectApiData } from 'app/utils/index';
import { head } from 'lodash';
import DataList from '../QuyMoDetail/DataList';
import ProfileWidget from './ProfileWidget';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
  },

}));

function QuyETFDetail(props) {
  const {code} = useParams()

  const {data} = useETFPricesQuery({
    q: `code:${code}~date:gte:2023-01-01`,
  })

  // 1D, 5D, 1M, 3M, 1Y, 5Y, Xem thêm

  return (
    <Root
      header={
        <div className="px-24 py-12 flex items-center gap-12">
          <Typography variant="h6" className="font-semibold">{code}</Typography>
          <IconButton onClick={() => window.open(`https://dchart.vndirect.com.vn/?symbol=${code}&theme=light`)} color="primary">
            <BarChartIcon />
          </IconButton>
        </div>
      }
      content={
        <div className="p-24 w-full">
          <ProfileWidget code={code}/>
        </div>
      }
    />
  );
}

export default QuyETFDetail;
