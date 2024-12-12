import { createApp, DirectiveBinding } from 'vue';
import ALoading from '@/directives/loading/a-loading.vue';

const createLoading = (el: HTMLElement) => {
  // 创建div标签
  const loadingDom = document.createElement('div');
  // 添加自定义属性作为标识，避免重复loading
  loadingDom.setAttribute('data-v', 'loading');
  // 设置样式，父元素相对定位，子元素绝对定位父元素之上
  el.style.position = 'relative';
  loadingDom.style.width = '100%';
  loadingDom.style.height = '100%';
  loadingDom.style.zIndex = '2000';
  loadingDom.style.maxHeight = '100vh';
  loadingDom.style.position = `absolute`;
  loadingDom.style.background = `rgba(255, 255, 255, 0.7)`;
  loadingDom.style.display = `flex`;
  loadingDom.style.justifyContent = `center`;
  loadingDom.style.alignItems = `center`;
  loadingDom.style.top = '0';
  loadingDom.style.borderRadius = 'inherit';

  // 创建APP实例，传入loading组件，并且挂载loading组件和创建的标签
  const app = createApp(ALoading);
  const instance = app.mount(loadingDom);
  loadingDom.appendChild(instance.$el);

  el.appendChild(loadingDom);
};

const aLoading = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    // v-loading 为 true 时，创建 loading 动画
    if (binding.value) {
      createLoading(el);
    }
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    // 获取当前父元素的最后一个子节点
    const lastChild = el.lastChild;

    // 判断 lastChild 是否是 HTMLElement，且包含 dataset
    if (lastChild instanceof HTMLElement && lastChild.dataset) {
      // v-loading 为 false，且最后一个子节点是 loading，移除加载动画
      if (binding.value === false && lastChild.dataset.v === 'loading') {
        el.removeChild(lastChild);
        return;
      }

      // v-loading 为 true 且最后一个子节点不是 loading，重新创建 loading 动画
      if (binding.value === true && lastChild.dataset.v !== 'loading') {
        createLoading(el);
      }
    } else {
      // 如果 lastChild 不是 HTMLElement，直接根据 v-loading 值来创建或移除 loading
      if (binding.value === true) {
        createLoading(el);
      }
    }
  },
};

// 导出自定义指令
export default aLoading;
