import { authErrMap, networkErrMap } from '@/api/base/errorMessages.ts';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import {
  getRefreshToken,
  getToken,
  getTokenExpiry,
  removeRefreshToken,
  removeToken,
  setRefreshToken,
  setToken,
} from '@/utils/auth.ts';
import router from '@/router';
import { errorMsg } from '@/utils/message.ts';
import { authApi } from '@/api/business/auth.ts';
import { nextTick } from 'vue';

// 错误处理函数
export const handleNetworkError = (errResponse: AxiosResponse) => {
  if (errResponse.status) {
    errResponse.statusText =
      networkErrMap[errResponse.status] ??
      `其他连接错误 --${errResponse.status}`;

    errorMsg(errResponse.statusText);
  }

  if (errResponse.status === 401) {
    // 清除存储的用户信息等
    removeToken();
    // 跳转到登录页面
    nextTick(() => {
      router.push('/login').then();
    }).then();
  }
};

export const handleAuthError = (response: AxiosResponse) => {
  errorMsg(response.data.message);
  const isAuthError = authErrMap[response.data.code];
  if (isAuthError) {
    removeToken();
    removeRefreshToken();
    nextTick(() => {
      router.push('/login');
    }).then();
  }
};

// 更新请求头，增强功能
export const handleChangeRequestHeader = async (
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
  // 获取当前时间的 Unix 时间戳，单位秒
  const currentTime = Math.floor(Date.now() / 1000);

  let token = getToken();
  if (token) {
    const tokenExpiryTime = getTokenExpiry(token);
    if (tokenExpiryTime && tokenExpiryTime <= currentTime) {
      removeToken();
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        // 过期时间
        const expiryTime = getTokenExpiry(refreshToken);
        if (expiryTime && expiryTime > currentTime) {
          try {
            const res = await authApi.doLogin({
              refreshToken,
              loginType: 'refresh_token',
            });

            token = res.data.token.accessToken;
            setToken(res.data.token.accessToken);
            setRefreshToken(res.data.token.refreshToken);
          } catch (error) {
            removeRefreshToken();
            errorMsg('登陆失效，请重新登陆！');
            nextTick(() => {
              router.push('/login').then();
            }).then();
            return Promise.reject(error); // 这里直接返回 reject，阻止后续请求继续发送
          }
        } else {
          removeRefreshToken();
          errorMsg('登陆失效，请重新登陆！');
          nextTick(() => {
            router.push('/login').then();
          }).then();
          return Promise.reject('Token expired, please login again');
        }
      } else {
        errorMsg('登陆失效，请重新登陆！');
        nextTick(() => {
          router.push('/login').then();
        }).then();
        return Promise.reject('No refresh token available');
      }
    }
  }

  config.headers['Authorization'] = token ? `Bearer ${token}` : '';
  config.headers['Accept-Language'] = localStorage.getItem('locale') || 'en';
  return config;
};
