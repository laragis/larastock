import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import FusePageSimple from '@fuse/core/FusePageSimple';
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";
import useProductsQuery from './useProductsQuery';
import { useImmer } from "use-immer";
import { useCallback } from "react";
import { isEmpty } from "lodash";

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider
  },
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {}
}));

const defaultFilters = {
  types: ['NEW_FUND', 'TRADING_FUND'],
  issuerIds: [],
  sortOrder: 'DESC',
  sortField: 'navTo6Months',
  page: 1,
  pageSize: 100,
  isIpo: false,
  fundAssetTypes: [],
  bondRemainPeriods: [],
  searchField: '',
  isBuyByReward: false
}



function QuyMoPage(props) {
  const { t } = useTranslation('examplePage');

  const [filters, setFilters] = useImmer(defaultFilters);

  const setFundAssetTypes = useCallback((types) => {
    setFilters((draft) => {
      draft.isIpo = false
      draft.fundAssetTypes = !isEmpty(types) ? types : []
    })
  }, [])

  const setIpo = useCallback((types) => {
    setFilters((draft) => {
      draft.isIpo = true
    })
  }, [])

  const { data } = useProductsQuery(filters);
  console.log(data?.rows);

  return (
    <Root
      header={
        <div className="p-24">
          <h2 className="uppercase font-semibold">Quỹ mở</h2>
        </div>
      }
      content={
        <div className="p-24 w-full">
          <Card className="p-8">
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button variant="contained" onClick={() => setFundAssetTypes()}>Tất cả quỹ</Button>
              <Button onClick={() => setFundAssetTypes(['BOND'])}>Quỹ trái phiếu</Button>
              <Button onClick={() => setFundAssetTypes(['STOCK'])}>Quỹ cổ phiếu</Button>
              <Button onClick={() => setFundAssetTypes(['BALANCED'])}>Quỹ cân bằng</Button>
              <Button onClick={() => setFundAssetTypes([''])}>Quỹ IPO</Button>
            </ButtonGroup>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tên CCQ</TableCell>
                  <TableCell>Tổ chức phát hành</TableCell>
                  <TableCell>Giá gần nhất (VND)</TableCell>
                  <TableCell>6M</TableCell>
                  <TableCell>3Y</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.rows.map((r, index) => (
                  <TableRow
                    key={index}
                  >
                    <TableCell className="flex gap-12">
                      <Avatar alt={r.shortName} src={r.owner.avatarUrl} variant="square"/>
                      <Box>
                        <Box sx={{color: 'secondary.main'}} className="font-semibold text-lg">{r.shortName}</Box>
                        <Box sx={{color: 'text.secondary'}}>{r.dataFundAssetType.name}</Box>
                      </Box>
                    </TableCell>
                    <TableCell>{r.owner.shortName}</TableCell>
                    <TableCell>{r.extra.lastNAV}</TableCell>
                    <TableCell>{r.productNavChange.navTo6Months}</TableCell>
                    <TableCell>{r.productNavChange.annualizedReturn36Months}</TableCell>
                    <TableCell>
                      annualizedReturn36Months <span className="text-blue-500">{r.productNavChange.annualizedReturn36Months}</span> @ <br/>
                      navTo1Months <span className="text-blue-500">{r.productNavChange.navTo1Months}</span> @ <br/>
                      navTo3Months <span className="text-blue-500">{r.productNavChange.navTo3Months}</span> @ <br/>
                      navTo6Months <span className="text-blue-500">{r.productNavChange.navTo6Months}</span> @ <br/>
                      navTo12Months <span className="text-blue-500">{r.productNavChange.navTo12Months}</span> @ <br/>
                      navTo24Months <span className="text-blue-500">{r.productNavChange.navTo24Months}</span> @ <br/>
                      navTo36Months <span className="text-blue-500">{r.productNavChange.navTo36Months}</span> @ <br/>
                      navToBeginning <span className="text-blue-500">{r.productNavChange.navToBeginning}</span> @ <br/>
                      navToEstablish <span className="text-blue-500">{r.productNavChange.navToEstablish}</span> @ <br/>
                      navToLastYear <span className="text-blue-500">{r.productNavChange.navToLastYear}</span> @ <br/>
                      navToPrevious <span className="text-blue-500">{r.productNavChange.navToPrevious}</span> @ <br/>
                      updateAt <span className="text-blue-500">{r.productNavChange.updateAt}</span> @ <br/>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>


          </Card>
        </div>
      }
      scroll="content"
    />
  );
}

export default QuyMoPage;
