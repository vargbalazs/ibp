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
