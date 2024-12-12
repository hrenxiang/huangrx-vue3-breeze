// import file from '@/api/business/file.ts';
// import { ALoadingService } from '@/directives/loading/ALoadingService.ts';
//
// export const downloadFile = async (filePath: string, fileName?: string) => {
//   let loadingInstance: { close: () => void; destroy: () => void } | null = null;
//   try {
//     // 显示加载状态
//     loadingInstance = ALoadingService({
//       background: 'rgba(255, 255, 255, 0.7)',
//     });
//
//     const startTime = Date.now();
//     const response = await file.downloadFile(filePath);
//     const endTime = Date.now();
//     const elapsedTime = endTime - startTime;
//     // 如果请求时间小于 1 秒，则延迟 1 秒
//     const delay = elapsedTime < 1000 ? 500 : 0;
//
//     // 延迟一秒后执行下载操作
//     await new Promise<void>((resolve) => {
//       setTimeout(() => {
//         // 创建一个下载链接并模拟点击，下载文件
//         const link = document.createElement('a');
//         link.href = URL.createObjectURL(response); // 创建文件URL
//         link.download =
//           fileName || filePath.split('/').pop() || 'downloadedFile';
//         link.click();
//
//         // 释放 URL 对象
//         URL.revokeObjectURL(link.href);
//
//         // 延迟完成后调用 resolve
//         resolve();
//       }, delay);
//     });
//   } catch (error) {
//     console.error('下载文件失败:', error);
//   } finally {
//     if (loadingInstance) {
//       loadingInstance.close();
//       loadingInstance.destroy();
//     }
//   }
// };
//
// export const openNewWindow = (url: string, title: string) => {
//   const win = window.open('about:blank');
//   if (win) {
//     win.document.title = title;
//     const iframe = document.createElement('iframe');
//     iframe.src = url;
//     iframe.style.width = '100%';
//     iframe.style.height = '100vh';
//     iframe.style.margin = '0';
//     iframe.style.padding = '0';
//     iframe.style.overflow = 'hidden';
//     iframe.style.border = 'none';
//     win.document.body.style.margin = '0';
//     win.document.body.appendChild(iframe);
//   }
// };
