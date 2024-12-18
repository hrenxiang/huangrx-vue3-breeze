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

/**
 * 请求白名单，包含允许无需认证即可访问的路由。
 * @constant {string[]}
 * @name whiteList
 */
const whiteList = ['/login', '/register', '/index/images/**'];

/**
 * 验证给定的 URL 是否在白名单中。
 *
 * 该函数会检查 `config.url` 是否匹配白名单中的某个模式。支持两种模式匹配：
 * 1. 精确匹配：白名单中的模式与 `config.url` 完全相同。
 * 2. 前缀匹配：白名单中的模式以 `**` 结尾时，匹配 `config.url` 是否以该模式的前缀开头。
 *
 * @param {string[]} whiteList - 包含允许访问的 URL 模式的白名单数组。
 * @param {InternalAxiosRequestConfig} config - 包含请求配置的对象，其中 `url` 属性是要验证的 URL。
 * @returns {boolean} 如果 `config.url` 在白名单中，返回 `true`；否则返回 `false`。
 */
const verifyWhiteList = (
  whiteList: string[],
  config: InternalAxiosRequestConfig,
) => {
  return whiteList.some((pattern) => {
    // 对于以 /index/images/ 开头的特殊情况进行处理
    if (pattern.endsWith('**')) {
      const prefix = pattern.slice(0, -2);
      return config.url?.startsWith(prefix);
    } else {
      return config.url === pattern;
    }
  });
};

// 更新请求头，增强功能
export const handleChangeRequestHeader = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  // 检查配置的 URL 是否匹配任何一个规则
  const isMatched = verifyWhiteList(whiteList, config);
  if (isMatched) {
    return config;
  }

  let token = getToken();
  const refreshToken = getRefreshToken();
  const currentTime = Math.floor(Date.now() / 1000);

  if (token) {
    const tokenExpiryTime = getTokenExpiry(token);
    if (tokenExpiryTime && tokenExpiryTime <= currentTime) {
      if (refreshToken && getTokenExpiry(refreshToken)) {
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
