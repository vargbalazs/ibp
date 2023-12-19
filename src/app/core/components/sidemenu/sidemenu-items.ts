import { MenuItem } from '../../interfaces/menu-item.interface';

export const menuItems: MenuItem[] = [
  {
    text: 'Törzsadatok',
    icon: 'dataset',
    items: [
      {
        text: 'Projektek',
        routePath: 'masterdata/projects',
      },
      {
        text: 'Business units',
        routePath: 'masterdata/bus',
      },
      {
        text: 'Vevők',
        routePath: 'masterdata/customers',
      },
    ],
  },
  {
    text: 'Tervezés',
    icon: 'settings',
    items: [
      {
        text: 'Tervkészítés',
        routePath: 'planning/planning-sheet',
      },
      {
        text: 'Categories',
      },
      {
        text: 'Instructors',
      },
      {
        text: 'Video library',
      },
    ],
  },
  { text: 'Design', icon: 'logout' },
  {
    text: 'Market & Sell',
    icon: 'apps',
  },
  { text: 'Reporting', icon: 'payments' },
];
