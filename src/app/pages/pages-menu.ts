import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/dashboard',
    home: true,
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Roles',
    icon: 'options-2-outline',
    link: '/roles'
  },
  {
    title: 'Permissions',
    icon: 'lock-outline',
    link: '/permissions'
  }
];
