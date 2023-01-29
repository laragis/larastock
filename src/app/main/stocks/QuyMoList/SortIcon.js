import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import clsx from 'clsx';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const SortIcon = ({sortField, path}) => {
  const className = 'ml-8'

  if(sortField && sortField.path === path) {
    return sortField.order === 'asc' ?
      <ArrowUpwardIcon className={clsx(className)} sx={{fontSize: 15, color: '#606060'}}/> :
      <ArrowDownwardIcon className={clsx(className)} sx={{fontSize: 15, color: '#606060'}}/>
  }
  return null
}

export default SortIcon