import { Table, TableBody, TableCell, tableCellClasses, TableHead, tableHeadClasses, TableRow } from '@mui/material';
import { formatNumber } from 'app/utils/index';
import { styled } from '@mui/material/styles';
import {Fragment} from 'react'

const TableStyled = styled(Table)(({ theme }) => ({
  [`& .row-heading`]: {
    background: '#E3E9F6',

    '& td': {
      fontWeight: 500,
    }
  },

  [`& .${tableCellClasses.root}`]: {
    borderBottom: '1px solid #E3E9F6',
  },
}));

function FeeTable({ className, groups }) {
  return (
    <TableStyled size='small' className={className}>
      <TableBody>
        {groups.map((g, k) => {
          const {headings, rows, unitLabel} = g || {}

          return (
            <Fragment key={k}>
              <TableRow className="row-heading">
                {headings?.map((label, k) => (
                  <TableCell key={k}>{label}</TableCell>
                ))}
              </TableRow>

              {rows?.map((f, k) => {
                const { beginVolume, beginRelationalOperator, endVolume, endRelationalOperator, fee } = f;
                let volumeRange = '';

                if (beginVolume === 0) {
                  volumeRange = `${endRelationalOperator?.code} ${formatNumber(endVolume)}`;
                } else if (endVolume === null) {
                  volumeRange = `${beginRelationalOperator?.code} ${formatNumber(beginVolume)}`;
                } else {
                  volumeRange = `${formatNumber(beginVolume)} - ${formatNumber(endVolume)}`;
                }

                return (
                  <TableRow key={k}>
                    <TableCell>{volumeRange} {unitLabel && `${unitLabel}`}</TableCell>
                    <TableCell className='font-medium'>{fee} %</TableCell>
                  </TableRow>
                );
              })}
            </Fragment>
          )
        })}

      </TableBody>
    </TableStyled>
  );
}

export default FeeTable;