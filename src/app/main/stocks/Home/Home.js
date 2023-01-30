import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { Box, Container } from '@mui/material';
import Widget1 from './widgets/Widget1';
import Widget2 from './widgets/Widget2';
import Widget3 from './widgets/Widget3';

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

function HomePage(props) {

  return (
    <Root
      content={
        <Container className="py-20">
          <Box className="grid grid-cols-3 gap-16">
            <Box className="grid gap-16">
              <Widget1 />
              <Widget2 />
            </Box>
            <Box className="col-span-2">
              <Widget3 />
            </Box>

          </Box>
        </Container>
      }
      scroll="content"
    />
  );
}

export default HomePage;
