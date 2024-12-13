import { Edit, Home } from '@icon-park/vue-next';
import { MenuItem } from '@/types/base';
import { markRaw } from 'vue';

const menuData: MenuItem[] = [
  {
    id: '1',
    name: 'Dashboard',
    level: '1',
    path: '/index',
    meta: {
      icon: markRaw(Home),
    },
    child: [],
  },
  {
    id: '2',
    name: 'Rich Text',
    level: '1',
    path: '',
    meta: {
      icon: markRaw(Edit),
    },
    child: [
      {
        id: '21',
        name: 'TipTap',
        level: '1-1',
        path: '/richText/tipTap',
        meta: {},
        child: [],
      },
    ],
  },
];

export default menuData;
