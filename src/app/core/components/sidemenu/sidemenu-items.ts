import { MenuItem } from '../../interfaces/menu-item.interface';

export const menuItems: MenuItem[] = [
  {
    text: 'Dashboard',
    icon: 'home',
    items: [
      {
        text: 'subitem 11',
      },
      {
        text: 'subitem 12',
        items: [
          {
            text: 'subitem 121',
          },
          {
            text: 'subitem 122',
          },
        ],
      },
    ],
  },
  {
    text: 'Content',
    icon: 'settings',
    items: [
      {
        text: 'Courses',
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
