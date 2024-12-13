import { closeProgress, startProgress } from '@comp/Nprogress/index.ts';
import { getToken } from '@/utils/auth.ts';
import { Router } from 'vue-router';

const whiteList = ['/login', '/index', '/richText/tipTap'];

export const setGuards = (router: Router) => {
  // 全局前置守卫：用于在路由跳转前进行处理
  router.beforeEach((to, from, next) => {
    startProgress();
    console.log(from.path);
    if (getToken()) {
      // 登陆
      if (to.path === '/login') {
        next({ path: '/index' });
      } else {
        next();
      }
    } else {
      // 没有token
      if (whiteList.indexOf(to.path) !== -1) {
        // 在免登录白名单，直接进入
        next();
      } else {
        // 直接跳转到登录页
        next(`/login?redirect=${encodeURIComponent(to.fullPath)}`);
      }
    }

    closeProgress();
  });

  // 全局后置守卫：在路由导航完成后执行（可选）
  router.afterEach((to, from) => {
    // 在这里可以做一些数据统计、分析、页面标题设置等操作
    console.log(`From ${from.fullPath} navigated to ${to.fullPath}`);
  });
};
