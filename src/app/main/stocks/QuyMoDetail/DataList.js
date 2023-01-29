import { Box } from '@mui/material';
import clsx from 'clsx';
import { isNil } from 'lodash';

function DataList({ className, data }){
  return (
    <Box className={clsx(className, 'leading-6')}>
      {data.map(({label, value, visible}, k) => (visible === true || isNil(visible)) && (
        <div key={k}>
          <span className="text-[13px] pr-4">{label}</span> <span className="font-medium text-[15px]">{value}</span>
        </div>
      ))}
    </Box>
  )
}

export default DataList