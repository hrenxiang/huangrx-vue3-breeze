import { Audit } from '@icon-park/vue-next';
import { MenuItem } from '@/types/base';
import { markRaw } from 'vue';

const menuData: MenuItem[] = [
  {
    id: '1',
    name: '测试1',
    level: '1',
    path: '/index',
    meta: {
      icon: markRaw(Audit),
    },
    child: [],
  },
];

export default menuData;
