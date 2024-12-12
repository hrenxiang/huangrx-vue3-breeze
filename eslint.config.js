import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // 定义适用于所有 JavaScript、TypeScript 和 Vue 文件的规则。
  {
    // 指定要应用此配置的文件模式。
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    // 设置全局变量，这些变量在浏览器环境中是可用的，例如 `window` 或 `document`。
    languageOptions: {
      // 使用预定义的浏览器全局变量集合。
      globals: globals.browser,
    },
    // 这里可以配置 ESLint 规则，或自定义规则。
    rules: {},
  },

  // 特别针对 `.vue` 文件的额外配置。
  {
    // 只对 Vue 文件应用以下配置。
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        // 指定使用 TypeScript 解析器解析 Vue 文件中的 <script> 块。
        parser: tseslint.parser,
      },
    },
  },

  // 导入 Prettier 的 ESLint 配置，以确保代码风格与 Prettier 一致。
  eslintConfigPrettier,

  // 引入推荐的 JavaScript 规则配置。
  pluginJs.configs.recommended,

  // 展开并引入 TypeScript 推荐的规则配置。
  ...tseslint.configs.recommended,

  // 展开并引入 Vue 插件中 'flat/essential' 规则配置。
  ...pluginVue.configs['flat/essential'],
];
