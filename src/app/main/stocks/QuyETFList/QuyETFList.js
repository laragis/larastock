import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import FusePageSimple from '@fuse/core/FusePageSimple';
import useETFsQuery from 'app/queries/useETFsQuery';
import { Card, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import useStocksQuery from 'app/queries/useStocksQuery';
import { Link } from 'react-router-dom';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
  },
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
}));

function QuyETFList(props) {
  const { t } = useTranslation('examplePage');
  const {data} = useETFsQuery()
  // const {data: stocks} = useStocksQuery()

  return (
    <Root
      header={
        <div className="p-24">
          <h4>{t('TITLE')}</h4>
        </div>
      }
      content={
        <div className="p-24">
          <Card>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Code</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Listed Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((v, k) => (
                  <TableRow key={k}>
                    <TableCell>{k+1}</TableCell>
                    <TableCell>
                      <Link to={`/quy-etf/view/${v.code}`} className="!no-underline font-medium">{v.code}</Link>
                    </TableCell>
                    <TableCell>{v.shortName}</TableCell>
                    <TableCell>{v.listedDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      }
    />
  );
}

export default QuyETFList;
