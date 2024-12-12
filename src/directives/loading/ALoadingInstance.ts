import { App, ComponentPublicInstance, createApp } from 'vue';
import ALoading from '@/directives/loading/a-loading.vue';

export interface ALoadingOptions {
  background?: string; // 背景颜色
}

export class ALoadingInstance {
  private readonly el: HTMLElement;
  private app: App;
  private readonly instance: ComponentPublicInstance;

  constructor(targetEl: HTMLElement, options: ALoadingOptions) {
    // 创建一个容器元素
    this.el = document.createElement('div');
    this.el.setAttribute('data-v', 'loading'); // 给 div 加上标识，避免重复添加

    // 设置样式
    this.el.style.position = 'fixed';
    this.el.style.width = '100vw';
    this.el.style.height = '100vh';
    this.el.style.zIndex = '20002';
    this.el.style.background = options.background || 'rgba(255, 255, 255, 0.7)';
    this.el.style.display = 'flex';
    this.el.style.justifyContent = 'center';
    this.el.style.alignItems = 'center';
    this.el.style.top = '0';
    this.el.style.borderRadius = 'inherit';

    // 创建 Vue 应用实例，并挂载 loading 组件
    this.app = createApp(ALoading);

    this.instance = this.app.mount(this.el) as ComponentPublicInstance;
    this.el.appendChild(this.instance.$el);
    targetEl.appendChild(this.el); // 将 div 添加到目标元素中
  }

  // 关闭加载动画
  close(): void {
    this.el.style.display = 'none';
  }

  // 销毁加载动画实例
  destroy(): void {
    if (this.el.parentElement) {
      this.el.parentElement.removeChild(this.el); // 移除 div 元素
    }
  }
}
