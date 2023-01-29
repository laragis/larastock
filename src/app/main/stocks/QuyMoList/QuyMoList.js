import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import FusePageSimple from '@fuse/core/FusePageSimple';
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card, CardContent,
  LinearProgress,
  Stack,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import useProductsQuery from 'app/queries/useProductsQuery';
import { useImmer } from 'use-immer';
import { useCallback } from 'react';
import { defaultTo, filter, find, get, includes, isEmpty, isEqual, orderBy } from 'lodash';
import clsx from 'clsx';
import { useUpdateEffect } from '@fuse/hooks';
import SortIcon from './SortIcon';
import TableStyled from './TableStyled';
import { formatNAV, NAVColorClass, toDateStr } from 'app/utils/index';
import { useNavigate } from 'react-router-dom';

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

const defaultSortField = 'navToLastYear'; // annualizedReturn36Months, navTo1Months, navTo3Months, navTo6Months, navTo12Months, navTo24Months, navTo36Months, navToBeginning, navToEstablish, navToLastYear, navToPrevious,

const defaultFilters = {
  types: ['NEW_FUND', 'TRADING_FUND'],
  issuerIds: [],
  sortOrder: 'DESC',
  sortField: defaultSortField,
  page: 1,
  pageSize: 100,
  isIpo: false,
  fundAssetTypes: [],
  bondRemainPeriods: [],
  searchField: '',
  isBuyByReward: false
};

const filterFundAssetTypes = (data, types) => {
  return filter(data, a => includes(types, a.dataFundAssetType.code));
};

const navChangeOptions = [
  { label: 'YTD', id: 'navToLastYear', code: 'YTD' },
  { label: '1 tháng', id: 'navTo1Months', code: '1M' },
  { label: '3 tháng', id: 'navTo3Months', code: '3M' },
  { label: '6 tháng', id: 'navTo6Months', code: '6M' },
  { label: '1 năm', id: 'navTo12Months', code: '1Y' },
  { label: '2 năm', id: 'navTo24Months', code: '2Y' },
  { label: '3 năm', id: 'navTo36Months', code: '3Y' }
];

function QuyMoList(props) {
  const { t } = useTranslation('examplePage');
  const navigate = useNavigate();

  const [filters, setFilters] = useImmer(defaultFilters);

  const [sortField, setSortField] = useImmer({
    path: `productNavChange.${defaultSortField}`,
    order: 'desc'
  });

  const setFundAssetTypes = useCallback(types => {
    setFilters(draft => {
      if (isEqual(types, [''])) {
        draft.isIpo = true;
        draft.fundAssetTypes = null;
      } else {
        draft.isIpo = false;
        draft.fundAssetTypes = !isEmpty(types) ? types : [];
      }
    });
  }, []);

  const { data: initData } = useProductsQuery(defaultFilters);
  const { data, isFetching } = useProductsQuery(filters);

  const toFundAssetTypesCount = useCallback(
    types => {
      let count = filterFundAssetTypes(initData?.rows, types)?.length;
      return count ? `(${count})` : '';
    },
    [initData?.rows]
  );

  const getVariantBtn = types => {
    if (isEqual(types, ['']) && filters.isIpo === true) return 'contained';

    return isEqual(filters.fundAssetTypes, defaultTo(types, [])) ? 'contained' : 'outlined';
  };

  const rows = orderBy(
    data?.rows,
    [
      item => {
        return defaultTo(get(item, sortField.path), '');
      }
    ],
    [sortField.order]
  );

  const handleSort = useCallback(
    path => {
      if (sortField.path === path) {
        if (sortField.order == 'desc') setSortField({ path, order: 'asc' });
        else setSortField({ path, order: 'desc' });
      } else {
        if (sortField.order == 'desc') setSortField({ path, order: 'asc' });
        else setSortField({ path, order: 'desc' });
      }
    },
    [sortField]
  );

  useUpdateEffect(() => {
    setSortField(draft => {
      draft.path = `productNavChange.${filters.sortField}`;
    });
  }, [filters.sortField]);

  console.log(rows);

  return (
    <Root
      header={
        <div className="p-24">
          <h2 className="uppercase font-semibold">Quỹ mở</h2>
        </div>
      }
      content={
        <div className="p-24 w-full">
          <Card className="relative">
            {isFetching && <LinearProgress color="primary" className="absolute w-full"/>}
            <CardContent sx={{p: 1.5}}>
              <Stack justifyContent="space-between" direction="row" alignItems="center">
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                  <Button variant={getVariantBtn()} onClick={() => setFundAssetTypes()}>
                    Tất cả quỹ ({initData?.rows?.length})
                  </Button>
                  <Button variant={getVariantBtn(['BOND'])} onClick={() => setFundAssetTypes(['BOND'])}>
                    Quỹ trái phiếu {toFundAssetTypesCount(['BOND'])}
                  </Button>
                  <Button variant={getVariantBtn(['STOCK'])} onClick={() => setFundAssetTypes(['STOCK'])}>
                    Quỹ cổ phiếu {toFundAssetTypesCount(['STOCK'])}
                  </Button>
                  <Button variant={getVariantBtn(['BALANCED'])} onClick={() => setFundAssetTypes(['BALANCED'])}>
                    Quỹ cân bằng {toFundAssetTypesCount(['BALANCED'])}
                  </Button>
                  <Button variant={getVariantBtn([''])} onClick={() => setFundAssetTypes([''])}>
                    Quỹ IPO {toFundAssetTypesCount([''])}
                  </Button>
                </ButtonGroup>

                <Autocomplete
                  disablePortal
                  options={navChangeOptions}
                  getOptionLabel={option => option.label}
                  sx={{ width: 200 }}
                  value={find(navChangeOptions, { id: filters.sortField })}
                  renderInput={params => <TextField variant="filled" {...params} label={'Lợi nhuận'} />}
                  onChange={(e, inputValue) => {
                    setFilters(draft => {
                      draft.sortField = inputValue?.id ?? defaultSortField;
                    });
                  }}
                />
              </Stack>

              <TableStyled>
                <TableHead>
                  <TableRow>
                    <TableCell onClick={() => handleSort('shortName')}>
                      Tên CCQ <SortIcon sortField={sortField} path="shortName" />
                    </TableCell>
                    <TableCell onClick={() => handleSort('owner.shortName')}>
                      Tổ chức phát hành <SortIcon sortField={sortField} path="owner.shortName" />
                    </TableCell>
                    <TableCell className="text-right" onClick={() => handleSort('extra.lastNAV')}>
                      Giá gần nhất (VND) <SortIcon sortField={sortField} path="extra.lastNAV" />
                    </TableCell>
                    <TableCell
                      className="text-center"
                      onClick={() => handleSort(`productNavChange.${filters.sortField}`)}
                    >
                      {find(navChangeOptions, { id: filters.sortField })?.code}
                      <SortIcon sortField={sortField} path={`productNavChange.${filters.sortField}`} />
                    </TableCell>
                    <TableCell
                      className="text-center"
                      onClick={() => handleSort('productNavChange.annualizedReturn36Months')}
                    >
                      LN bình quân hàng năm <br />
                      (3 năm gần nhất)
                      <SortIcon sortField={sortField} path="productNavChange.annualizedReturn36Months" />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((r, index) => {
                    const navToCurrent = get(r, `productNavChange.${filters.sortField}`);
                    return (
                      <TableRow key={index}>
                        <TableCell className="flex gap-12" title={r.name}>
                          <a href={r.websiteURL} target="_blank">
                            <Avatar alt={r.shortName} src={r.owner.avatarUrl} variant="square" />
                          </a>
                          <Box className="cursor-pointer" onClick={() => navigate(`/quy-mo/view/${r.id}`)}>
                            <Box sx={{ color: 'secondary.main' }} className="font-semibold text-lg">
                              {r.shortName}
                            </Box>
                            <Box sx={{ color: 'text.secondary' }}>{r.dataFundAssetType.name}</Box>
                          </Box>
                        </TableCell>
                        <TableCell title={r.owner.name}>{r.owner.shortName}</TableCell>
                        <TableCell className="text-right">
                          <Box>{formatNAV(r.extra.lastNAV)}</Box>
                          <Typography sx={{ color: 'text.disabled' }} className="text-sm">
                            Cập nhật ngày {toDateStr(r.extra.lastNAVDate, 'DD/MM')}
                          </Typography>
                        </TableCell>
                        <TableCell className={clsx('text-center font-medium', NAVColorClass(navToCurrent))}>
                          {navToCurrent ? `${navToCurrent} %` : '_'}
                        </TableCell>
                        <TableCell
                          className={clsx(
                            'text-center font-medium',
                            NAVColorClass(r.productNavChange.annualizedReturn36Months)
                          )}
                        >
                          {r.productNavChange.annualizedReturn36Months
                            ? `${r.productNavChange.annualizedReturn36Months} %`
                            : '_'}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </TableStyled>
            </CardContent>
          </Card>
        </div>
      }
    />
  );
}

export default QuyMoList;
