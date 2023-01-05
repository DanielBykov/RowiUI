import PropTypes from 'prop-types';
import {useContext, useEffect} from 'react';
import {Link as RouterLink, useLocation} from 'react-router-dom';
// material
import {styled} from '@mui/material/styles';
import {Avatar, Box, Drawer, Link, Typography} from '@mui/material';
// mock
// hooks
import useResponsive from '../../../_DATA/hooks/useResponsive';
// components
import Logo from '../../cmp/Logo';
import Scrollbar from '../../cmp/Scrollbar';
import NavSection from '../../cmp/NavSection';
//
import navConfig from './NavConfig';
import {AuthContext} from "../../../_DATA/context";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
  const { user } = useContext(AuthContext)

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar src={""} alt="photoURL" />
            <Box sx={{ ml: 2, overflow: 'hidden' }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {user?.attributes?.email || ""}
              </Typography>
              {/*<Typography variant="body2" sx={{ color: 'text.secondary' }}>*/}
              {/*  [text.secondary]*/}
              {/*</Typography>*/}
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection navConfig={navConfig} />

    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
