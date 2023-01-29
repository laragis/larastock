import { styled } from '@mui/material/styles';
import { Table, tableCellClasses, tableHeadClasses } from '@mui/material';

const TableStyled = styled(Table)(({theme}) => ({
  padding: 10,

  [`& .${tableHeadClasses.root} .${tableCellClasses.root}`]: {
    fontWeight: 600,
    fontSize: 16,
    cursor: 'pointer',
    borderBottom: '1px solid rgb(233 233 233)'
  },

  '& td': {
    fontSize: 16
  }
}))

export default TableStyled