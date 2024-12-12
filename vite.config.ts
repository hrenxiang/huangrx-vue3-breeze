import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig((config) => {
  const currentEnv = loadEnv(config.mode, process.cwd(), '');

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@comp': fileURLToPath(new URL('./src/components', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler', // 使用现代编译器
          additionalData: '@use "@/styles/variable.scss" as *;',
        },
      },
    },
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: currentEnv.VITE_APP_BASE_URL,
          changeOrigin: true,
          bypass(req, res, options) {
            const proxyURL =
              (options.target || '') +
              (options.rewrite ? options.rewrite(req.url || '') : '');
            res?.setHeader('x-req-proxyURL', proxyURL); // 将真实请求地址设置到响应头中
          },
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});
