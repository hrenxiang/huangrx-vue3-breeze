import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/layout/index.vue';
import { setGuards } from '@/router/guard.ts';
import Login from '@/views/Login/index.vue';
import Index from '@/views/Index/index.vue';

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
