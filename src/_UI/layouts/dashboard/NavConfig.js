// component
import Iconify from '../../cmp/Iconify';

// ----------------------------------------------------------------------

/* Icons
* eva:shopping-bag-fill
* eva:file-text-fill
* eva:lock-fill
* eva:person-add-fill
* eva:alert-triangle-fill
* */

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Rowi Devices Chart',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Rowi Devices',
    path: '/dashboard/devices',
    icon: getIcon('eva:people-fill'),
    // children:   [
    //   {
    //     title: 'Rowi 1',
    //     path: '/dashboard/devices/[deviceId]',
    //   }
    // ],
  },
  {
    title: 'Add a new Rowi device',
    path: '/dashboard/add-device',
    icon: getIcon('eva:plus-circle-fill'),
    adminOnly: true
  },
  // {
  //   title: 'Dashboard Users',
  //   path: '/dashboard/users',
  //   icon: getIcon('eva:plus-circle-fill'),
  //   adminOnly: true
  // },
];

export default navConfig;
