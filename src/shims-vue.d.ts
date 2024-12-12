declare module '*.vue' {
  import { DefineComponent } from 'vue'; // 导入 Vue 中的 DefineComponent 类型
  const component: DefineComponent<object, object, object>; // 声明 `.vue` 文件为 Vue 组件
  export default component; // 导出该组件
}
