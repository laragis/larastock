import { Card as MuiCard, LinearProgress } from '@mui/material';
import clsx from 'clsx';

function Card(inProps) {
  const {
    loading,
    children,
    className,
    ...other
  } = inProps

  return (
    <MuiCard
      className={clsx('relative', className)}
      {...other}
    >
      {loading && <LinearProgress className="absolute w-full" />}
      {children}
    </MuiCard>
  );
}

export default Card;