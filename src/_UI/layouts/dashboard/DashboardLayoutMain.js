import {useContext, useEffect, useState} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
// material
import {styled} from '@mui/material/styles';
//
import {AuthContext, ContextDataUI, useContextDataUi} from "../../../_DATA/context";
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import {apiGraphQlQuery, useDashCreate, useUserUI} from "../../../_DATA/hooks/useGraphQL";
import {DASH_ADMIN} from "../../../_DATA/const";
import {listRowiUIDashViewers} from "../../../graphql/queries";
import {updateRowiUIUser} from "../../../graphql/mutations";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

function DashboardLayoutMain() {
  const [open, setOpen] = useState(false);
  // let {loading} = useContextDataUi()
  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}

export const isDashAdmin = (user) => {
  const cognitoGroups = user?.signInUserSession?.accessToken?.payload?.['cognito:groups'] || []
  return cognitoGroups.includes(DASH_ADMIN)
}

export const DashboardLayoutMainWithData = () => {
  const navigate = useNavigate() // redirect to a page
  const { user: cognitoUser, user: { attributes: { email, sub }={} }={} } = useContext(AuthContext)
  const {userUI, setUserUI, fetchOrCreateUserUI, fetchUserUI} = useUserUI()
  const [loadingUserUI, setLoadingUserUI ] = useState(true)
  const {addDash} = useDashCreate()
  const updateUserUI = () => {fetchUserUI(sub)}

  // #0 Cognito bug - a new user first login
  useEffect(() => {
      if(cognitoUser && !cognitoUser?.attributes){
        window.location.reload()
      }
  },[cognitoUser])

  // #1 UserUI - get-or-create
  useEffect(() => {
    if(sub){
      fetchOrCreateUserUI(sub, email)
    }
  },[sub])

  // User group - Admin / Viewer
  useEffect(async () => {
    if(userUI?.id){

      // Dash ID
      const { RowiUIDash: dash } = userUI

      // Admin => get or create RowiUIDash
      if(isDashAdmin(cognitoUser)){

        // Create Dash
        if(!dash){
          await addDash(email, sub)
          updateUserUI() // update local data
        }

      } else { // Viewer
        // Look for Viewers dash
        if(!dash){
          const {items: [firstItem]} = await apiGraphQlQuery({listRowiUIDashViewers},
            {filter: {email: {eq: email}}} )
          // todo - multi viewers support/reject
          if(firstItem){
            await apiGraphQlQuery({updateRowiUIUser}, {
              input: {
                id: sub,
                rowiUIUserRowiUIDashId: firstItem.rowiuidashID
              }
            })
            updateUserUI() // update local data
          }
        }
        // navigate("/404")
      }
      setLoadingUserUI(false)
    }
  },[userUI?.id])

  return (
    <ContextDataUI.Provider value={{
      userUI,
      setUserUI,
      loadingUserUI,
      updateUserUI,
      isAdmin: isDashAdmin(cognitoUser)
    }}>
      <DashboardLayoutMain />
    </ContextDataUI.Provider>
  )
}
