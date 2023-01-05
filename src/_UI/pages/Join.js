import {Link as RouterLink} from 'react-router-dom';
// @mui
import {styled} from '@mui/material/styles';
import {Button, Container, TextField, Typography} from '@mui/material';
// components
import Page from '../cmp/Page';
import {Form} from "formik";
import {useState} from "react";

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Join() {
  const [val, setVal ] = useState("")
  const handleClick = () => {
    console.log('d256 val:', val)
  }
  return (
    <Page title="404 Page Not Found">
      <Container>
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            Join
          </Typography>

          <Container>
            <form>
              <input type={"email"} value={val} onChange={(e)=> {
                setVal(e.target.value)
              }}/>
            </form>
            <Button onClick={handleClick}>Ok</Button>
          </Container>


        </ContentStyle>
      </Container>
    </Page>
  );
}
