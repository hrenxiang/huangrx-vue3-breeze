// 创建 aLoading 的服务方法
import {
  ALoadingInstance,
  ALoadingOptions,
} from '@/directives/loading/ALoadingInstance.ts';

export interface ALoadingService {
  (options?: ALoadingOptions): {
    close: () => void;
    destroy: () => void;
  };
}

export const ALoadingService: ALoadingService = (
  options: ALoadingOptions = {},
) => {
  const el = document.body; // 你可以选择任何容器作为目标元素
  const loadingInstance = new ALoadingInstance(el, options); // 创建实例

  // 返回实例的方法，以便调用者可以控制加载动画
  return {
    close: () => loadingInstance.close(),
    destroy: () => loadingInstance.destroy(),
  };
};
