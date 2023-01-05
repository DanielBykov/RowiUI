import {Link as RouterLink} from 'react-router-dom';
// @mui
import {Box} from '@mui/material';

// ----------------------------------------------------------------------

const logoUrl = "https://image.jimcdn.com/app/cms/image/transf/dimension=200x10000:format=png/path/se72d47d64c5acda3/image/ibff73b15a402b4f1/version/1634422871/image.png"

export default function Logo({ disabledLink = false, sx }) {

  const logo = <Box component="img" src={logoUrl} sx={{ ...sx }} />

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}

const LogoLogin = ({sx, className}) => {
  return (<Box component="img" src={logoUrl} sx={sx} className={className} />)
}

export {LogoLogin}
