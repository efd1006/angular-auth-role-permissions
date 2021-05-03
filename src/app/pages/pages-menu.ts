import { NbMenuItem } from '@nebular/theme';
import { DASHBOARD_PATH, PERMISSIONS_PATH, ROLES_PATH } from '../@core/constants/routes';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: DASHBOARD_PATH,
    home: true,
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Roles',
    icon: 'options-2-outline',
    link: ROLES_PATH
  },
  {
    title: 'Permissions',
    icon: 'lock-outline',
    link: PERMISSIONS_PATH
  }
];
