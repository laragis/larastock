import { Box, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import useProductQuery from 'app/queries/useProductQuery';
import DautuWidget from './widgets/DautuWidget';
import FeeWidget from './widgets/FeeWidget/FeeWidget';
import NAVWidget from './widgets/NAVWidget';
import OrgWidget from './widgets/OrgWidget';
import DatLenhWidget from './widgets/DatLenhWidget';
import Heading from './Heading';
import useProductSIPQuery from 'app/queries/useProductSIPQuery';
import OtherWidget from './widgets/OtherWidget';
import useProductNAVHistoryQuery from 'app/queries/useProductNAVHistoryQuery';

function CardInfo() {
  const { id } = useParams();

  const { data: navHistory } = useProductNAVHistoryQuery({ productId: id });
  const { data } = useProductQuery(id);
  const { data: sip } = useProductSIPQuery(id);

  if (!data) return null;


  return (
    <Box>
      <Heading data={data} />

      <div className="grid md:grid-cols-2 gap-16 mt-20">
        <div className="flex gap-16 flex-col">
          <div className="grid sm:grid-cols-2 gap-16">
            <NAVWidget data={data} navHistory={navHistory} />

            <OrgWidget data={data} />
          </div>

          <DatLenhWidget data={data} sip={sip} />
        </div>

        <Box className="flex flex-col gap-16">
          <FeeWidget data={data} />

          <OtherWidget data={data} />
        </Box>
      </div>
    </Box>
  );
}

function QuyMoDetail() {
  return (
    <Box p={3}>
      <Stack spacing={2}>
        <CardInfo />
        <DautuWidget />
      </Stack>
    </Box>
  );
}

export default QuyMoDetail;
