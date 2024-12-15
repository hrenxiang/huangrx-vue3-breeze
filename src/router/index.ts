import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/layout/index.vue';
import { setGuards } from '@/router/guard.ts';
import Login from '@/views/Login/index.vue';
import Index from '@/views/Index/index.vue';
import TipTap from '@/views/TipTap/index.vue';
import UploadImage from '@/views/Upload/image.vue';

const router = createRouter({
  // history 模式 不带 #
  history: createWebHistory(),
  routes: [
    {
      path: '',
      component: Layout,
      redirect: '/index',
      children: [
        {
          name: 'Index',
          path: '/index',
          component: Index,
        },
        {
          name: 'TipTap',
          path: '/richText/tipTap',
          component: TipTap,
        },
        {
          name: 'UploadImage',
          path: '/upload/image',
          component: UploadImage,
        },
      ],
    },
    {
      name: 'Login',
      path: '/login',
      component: Login,
    },
  ],
});

setGuards(router);
export default router;
