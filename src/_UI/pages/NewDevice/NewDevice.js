import Page from "../../cmp/Page";
import {styled} from "@mui/material/styles";
import {Container, Typography} from "@mui/material";
import NewDeviceForm from "./NewDeviceForm";

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export default function AddDevice() {
  return (
    <Page title="Add a new Rowi device">
      <RootStyle>

        <Container>
          <ContentStyle>
            <Typography variant="h4" gutterBottom>Add a new Rowi device</Typography>

            <Typography sx={{ color: 'text.secondary', mb: 5 }}>
              Device ID and Device Secret could be found in Kiwi Warmer mobile app right after setting your device
            </Typography>

            <NewDeviceForm />

            {/*<Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>*/}
            {/*  By submitting the form, I agree to Minimal&nbsp;*/}
            {/*  <Link underline="always" color="text.primary" href="#">*/}
            {/*    Terms of Service*/}
            {/*  </Link>*/}
            {/*  {' '}and{' '}*/}
            {/*  <Link underline="always" color="text.primary" href="#">*/}
            {/*    Privacy Policy*/}
            {/*  </Link>*/}
            {/*  .*/}
            {/*</Typography>*/}

          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  )
}
