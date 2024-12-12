import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { createPinia } from 'pinia';
import Vue3Lottie from 'vue3-lottie';
import Loading from '@/directives/loading/loading.ts';

import '@/styles/redefine/element-plus.scss';
import '@/styles/global.scss';
import 'nprogress/css/nprogress.css';
import '@icon-park/vue-next/styles/index.css';

// 覆盖 console.log 方法，只在开发环境打印相关信息
if (import.meta.env.VITE_APP_CONSOLE_FLAG === 'false') {
  console.log = () => {};
}

const store = createPinia();

createApp(App)
  .use(router)
  .use(ElementPlus, { locale: zhCn })
  .use(Vue3Lottie)
  .use(store)
  .directive('aLoading', Loading)
  .mount('#app');
