import { Table as MuiTable, tableCellClasses } from '@mui/material';
import { styled } from '@mui/material/styles';

const Table = styled(MuiTable)(({ theme }) => ({
  [`& .${tableCellClasses.root}`]: {
    borderColor: theme.palette.divider,
  },
}));

export default Table;
