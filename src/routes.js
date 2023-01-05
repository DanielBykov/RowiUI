import {Navigate, useRoutes} from 'react-router-dom';
// layouts
import {DashboardLayoutMainWithData} from './_UI/layouts/dashboard/DashboardLayoutMain';
import LogoOnlyLayout from './_UI/layouts/LogoOnlyLayout';
//
import DeviceTable from './_UI/pages/@deviceTable/_DeviceTable';
import NotFound from './_UI/pages/Page404';
import DeviceChart from './_UI/pages/@deviceChart/_DeviceChart';
import AddDevice from "./_UI/pages/NewDevice/NewDevice";
import UserTable from "./_UI/pages/ViewerTable";
import {AuthHOC} from "./_UI/layouts/AuthLayout";
import Join from "./_UI/pages/Join";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <><AuthHOC><DashboardLayoutMainWithData /></AuthHOC></>,
      children: [
        { path: 'app', element: <DeviceChart /> }, // Chart View
        { path: 'devices', element: <DeviceTable /> }, // Device table
        { path: 'add-device', element: <AddDevice /> }, // Add device
        { path: 'users', element: <UserTable /> }, // Add device
        // { path: 'no-dash', element: <div>No Dashboard</div> }
      ],
    },

    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/join', element: <Join/> },
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
