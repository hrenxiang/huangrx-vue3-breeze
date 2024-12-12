import {
  AfferentTwo,
  Agreement,
  Audit,
  ConnectionArrow,
  DataAll,
  EnterTheKeyboard,
} from '@icon-park/vue-next';
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
  {
    id: '3',
    name: '测试2',
    level: '1',
    path: '',
    meta: {
      icon: markRaw(AfferentTwo),
    },
    child: [
      {
        id: '31',
        name: '测试3',
        level: '1-1',
        path: '/b',
        meta: {
          icon: markRaw(Agreement),
        },
        child: [],
      },
      {
        id: '32',
        name: '测试4',
        level: '1-1',
        path: '/c',
        meta: {
          icon: markRaw(ConnectionArrow),
        },
        child: [],
      },
      {
        id: '33',
        name: '测试5',
        level: '1-1',
        path: '/d',
        meta: {
          icon: markRaw(DataAll),
        },
        child: [],
      },
    ],
  },
  {
    id: '11',
    name: '测试6',
    level: '1',
    path: '/e',
    meta: {
      icon: markRaw(EnterTheKeyboard),
    },
    child: [],
  },
];

export default menuData;
