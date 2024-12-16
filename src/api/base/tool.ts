import { networkErrMap } from '@/api/base/errorMessages.ts';
import { InternalAxiosRequestConfig } from 'axios';
import { getToken, removeToken } from '@/utils/auth.ts';
import router from '@/router';
import { errorMsg } from '@/utils/message.ts';

// 错误处理函数
export const handleNetworkError = (errStatus?: number): string => {
  if (errStatus === 401) {
    // 清除存储的用户信息等
    errorMsg('登陆已过期，请重新登陆！');
    removeToken();
    // 跳转到登录页面
    router.push('/login');
  }
  if (errStatus) {
    return networkErrMap[errStatus] ?? `其他连接错误 --${errStatus}`;
  }
  return '状态码不存在';
};

// 更新请求头，增强功能
export const handleChangeRequestHeader = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const token = getToken() || '';
  config.headers['Authorization'] = token ? `Bearer ${token}` : '';
  config.headers['Accept-Language'] = localStorage.getItem('locale') || 'en';
  return config;
};
