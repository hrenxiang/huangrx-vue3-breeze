import { Edit, Home, UploadTwo } from '@icon-park/vue-next';
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
  {
    id: '3',
    name: 'Upload',
    level: '1',
    path: '',
    meta: {
      icon: markRaw(UploadTwo),
    },
    child: [
      {
        id: '31',
        name: 'Upload Image',
        level: '1-1',
        path: '/upload/image',
        meta: {},
        child: [],
      },
      {
        id: '32',
        name: 'Upload File',
        level: '1-1',
        path: '/upload/file',
        meta: {},
        child: [],
      },
      {
        id: '33',
        name: 'Upload Video',
        level: '1-1',
        path: '/upload/video',
        meta: {},
        child: [],
      },
    ],
  },
];

export default menuData;
