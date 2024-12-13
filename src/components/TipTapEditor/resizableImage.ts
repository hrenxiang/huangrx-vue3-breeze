// 导入Image扩展模块
import Image from '@tiptap/extension-image';
import {
  AlignTextCenter,
  AlignTextLeft,
  AlignTextRight,
} from '@icon-park/vue-next';
import { createApp, h } from 'vue';

// 扩展Image插件，添加自定义功能
export const ImageResize = Image.extend({
  // 添加自定义的属性
  addAttributes() {
    return {
      // 保留父类的属性
      ...this.parent?.(),
      // 新增style属性，默认值为全宽自动高度
      style: {
        default: 'width: 100%; height: 100%; cursor: pointer;',
      },
    };
  },

  // 添加自定义的NodeView
  addNodeView() {
    return ({ node, editor, getPos }) => {
      // 获取编辑器和一些编辑器配置
      const {
        view,
        options: { editable },
      } = editor;

      // 获取节点的style属性
      const { style } = node.attrs;

      // 创建容器元素
      const $wrapper = document.createElement('div');
      const $container = document.createElement('div');
      const $img = document.createElement('img');

      // 控制按钮样式
      const iconStyle =
        'width: 16px; height: 16px; cursor: pointer; display: flex; align-items: center;';

      // 分发更新节点视图
      const dispatchNodeView = () => {
        if (typeof getPos === 'function') {
          const newAttrs = {
            ...node.attrs,
            style: `${$img.style.cssText}`,
          };
          view.dispatch(view.state.tr.setNodeMarkup(getPos(), null, newAttrs));
        }
      };

      // 绘制位置控制器
      const paintPositionController = () => {
        // 创建位置控制器容器
        const $positionController = document.createElement('div');

        // 设置位置控制器的样式
        $positionController.setAttribute(
          'style',
          'position: absolute; top: 0%; left: 50%; width: 100px; height: 25px; z-index: 999; background-color: white; border-radius: 2px; border: 1px solid #6C6C6C; cursor: pointer; transform: translate(-50%, -50%); display: flex; justify-content: space-between; align-items: center; padding: 0 10px;',
        );

        // 使用 `h` 函数创建图标组件
        const leftIcon = h(AlignTextLeft, { theme: 'outline', size: '16' });
        const centerIcon = h(AlignTextCenter, { theme: 'outline', size: '16' });
        const rightIcon = h(AlignTextRight, { theme: 'outline', size: '16' });

        const iconWrapperStyle = {
          width: '100%',
          height: '100%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        };

        // 创建一个 Vue 应用实例并挂载到 DOM
        const app = createApp({
          data() {
            return {
              opacity: 0.5, // 初始状态是完全半透明
            };
          },
          render() {
            return h(
              'div',
              {
                style: {
                  ...iconWrapperStyle,
                  opacity: this.opacity,
                  transition: 'opacity 0.3s ease', // 添加过渡效果
                },
                onMouseover: () => {
                  this.opacity = 1; // 鼠标移入时设置 opacity 为 0.3
                },
                onMouseout: () => {
                  this.opacity = 0.5; // 鼠标移出时设置 opacity 恢复为 1
                },
              },
              [
                // 给每个图标添加点击事件
                h(leftIcon, {
                  ...leftIcon.props, // 保留原有的 props
                  onClick: () => {
                    console.log('Left icon clicked');
                    // 处理点击事件逻辑
                    $img.setAttribute(
                      'style',
                      `${$img.style.cssText} margin: 0 auto 0 0;`,
                    );
                    dispatchNodeView();
                  },
                }),
                h(centerIcon, {
                  ...centerIcon.props,
                  onClick: () => {
                    console.log('Center icon clicked');
                    // 处理点击事件逻辑
                    $img.setAttribute(
                      'style',
                      `${$img.style.cssText} margin: 0 auto;`,
                    );
                    dispatchNodeView();
                  },
                }),
                h(rightIcon, {
                  ...rightIcon.props,
                  onClick: () => {
                    console.log('Right icon clicked');
                    // 处理点击事件逻辑
                    $img.setAttribute(
                      'style',
                      `${$img.style.cssText} margin: 0 0 0 auto;`,
                    );
                    dispatchNodeView();
                  },
                }),
              ],
            );
          },
        });

        app.mount($positionController);

        // 将位置控制器添加到容器中
        $container.appendChild($positionController);
      };

      // 设置wrapper的样式并将容器添加到wrapper中
      $wrapper.setAttribute('style', `display: flex;`);
      $wrapper.appendChild($container);

      // 设置容器的样式，并将图片元素添加到容器中
      $container.setAttribute('style', `${style}`);
      $container.appendChild($img);

      // 遍历节点属性并为图片设置相应的属性
      Object.entries(node.attrs).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        $img.setAttribute(key, value);
      });

      // 如果不是可编辑状态，返回一个只包含图片的DOM
      if (!editable) return { dom: $img };

      // 判断是否是移动端
      const isMobile = document.documentElement.clientWidth < 768;

      // 计算拖动点的位置
      const dotPosition = isMobile ? '-8px' : '-4px';
      const dotsPosition = [
        `top: ${dotPosition}; left: ${dotPosition}; cursor: nwse-resize;`,
        `top: ${dotPosition}; right: ${dotPosition}; cursor: nesw-resize;`,
        `bottom: ${dotPosition}; left: ${dotPosition}; cursor: nesw-resize;`,
        `bottom: ${dotPosition}; right: ${dotPosition}; cursor: nwse-resize;`,
      ];

      // 处理图片大小调整的状态
      let isResizing = false;
      let startX: number, startWidth: number;

      // 为容器添加点击事件
      $container.addEventListener('click', () => {
        // 移除剩余的调整点和位置控制器
        const isMobile = document.documentElement.clientWidth < 768;

        if (isMobile) {
          const focusedElement = document.querySelector(
            '.ProseMirror-focused',
          ) as HTMLElement;
          focusedElement?.blur();
        }

        // 如果容器中包含调整点，移除它们
        if ($container.childElementCount > 3) {
          for (let i = 0; i < 5; i++) {
            $container.removeChild($container.lastChild as Node);
          }
        }

        // 绘制位置控制器
        paintPositionController();

        // 设置容器的样式并启用拖动操作
        $container.setAttribute(
          'style',
          `position: relative; border: 1px dashed #6C6C6C; ${style} height: auto; cursor: pointer;`,
        );

        // 为调整点添加事件监听器，支持拖动调整图片大小
        Array.from({ length: 4 }, (_, index) => {
          const $dot = document.createElement('div');
          $dot.setAttribute(
            'style',
            `position: absolute; width: ${isMobile ? 16 : 9}px; height: ${isMobile ? 16 : 9}px; border: 1.5px solid #6C6C6C; border-radius: 50%; ${dotsPosition[index]}`,
          );

          $dot.addEventListener('mousedown', (e) => {
            e.preventDefault();
            isResizing = true;
            startX = e.clientX;
            startWidth = $container.offsetWidth;

            // 拖动时调整图片宽度
            const onMouseMove = (e: MouseEvent) => {
              if (!isResizing) return;
              const deltaX =
                index % 2 === 0 ? -(e.clientX - startX) : e.clientX - startX;

              const newWidth = startWidth + deltaX;

              $container.style.width = newWidth + 'px';
              $img.style.width = newWidth + 'px';
            };

            // 停止拖动时更新节点
            const onMouseUp = () => {
              if (isResizing) {
                isResizing = false;
              }
              dispatchNodeView();

              document.removeEventListener('mousemove', onMouseMove);
              document.removeEventListener('mouseup', onMouseUp);
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
          });

          // 支持触摸屏操作
          $dot.addEventListener(
            'touchstart',
            (e) => {
              if (e.cancelable) {
                e.preventDefault();
              }
              isResizing = true;
              startX = e.touches[0].clientX;
              startWidth = $container.offsetWidth;

              // 拖动时调整图片宽度
              const onTouchMove = (e: TouchEvent) => {
                if (!isResizing) return;
                const deltaX =
                  index % 2 === 0
                    ? -(e.touches[0].clientX - startX)
                    : e.touches[0].clientX - startX;

                const newWidth = startWidth + deltaX;

                $container.style.width = newWidth + 'px';
                $img.style.width = newWidth + 'px';
              };

              // 停止拖动时更新节点
              const onTouchEnd = () => {
                if (isResizing) {
                  isResizing = false;
                }
                dispatchNodeView();

                document.removeEventListener('touchmove', onTouchMove);
                document.removeEventListener('touchend', onTouchEnd);
              };

              document.addEventListener('touchmove', onTouchMove);
              document.addEventListener('touchend', onTouchEnd);
            },
            { passive: false },
          );
          $container.appendChild($dot);
        });
      });

      // 全局点击事件，点击外部区域时移除边框和调整点
      document.addEventListener('click', (e: MouseEvent) => {
        const $target = e.target as HTMLElement;
        const isClickInside =
          $container.contains($target) || $target.style.cssText === iconStyle;

        // 如果点击不在容器内，移除边框和调整点
        if (!isClickInside) {
          const containerStyle = $container.getAttribute('style');
          const newStyle = containerStyle?.replace(
            'border: 1px dashed #6C6C6C;',
            '',
          );
          $container.setAttribute('style', newStyle as string);

          // 移除多余的调整点
          if ($container.childElementCount > 3) {
            for (let i = 0; i < 5; i++) {
              $container.removeChild($container.lastChild as Node);
            }
          }
        }
      });

      // 返回包含图片和位置控制器的DOM
      return {
        dom: $wrapper,
      };
    };
  },
});
