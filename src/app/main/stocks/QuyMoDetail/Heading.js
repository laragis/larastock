import { Avatar, Box, Divider, Link, Typography } from '@mui/material';

function Heading({data}){
  const {
    name,
    shortName,
    owner,
    websiteURL,
    description,
  } = data;

  return (
    <Box>
      <Box className='flex items-center gap-8'>
        <Avatar alt={shortName} src={owner?.avatarUrl} variant='square' />
        <Link className="!text-orange-800" underline='none' target='_blank' variant='h6' href={websiteURL}>
          {name} ({shortName})
        </Link>
      </Box>
      <Divider className='my-8' />
      <Typography className='text-gray-700'>{description}</Typography>
    </Box>
  )
}

export default Heading