// src/api/http.ts
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import {
  handleAuthError,
  handleChangeRequestHeader,
  handleNetworkError,
} from '@/api/base/tool.ts';
import { IAnyObj } from '@/types/base';
import { networkSuccessCode } from '@/api/base/errorMessages.ts';

// 基础配置
const baseURL = import.meta.env.VITE_APP_BASE_API;
const timeout = 30000;

// 创建 Axios 实例
const request = axios.create({
  timeout,
  baseURL,
  withCredentials: false,
});

// 请求拦截器：处理请求头
request.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    return await handleChangeRequestHeader(config);
  },
  (error) => Promise.reject(error),
);

// 响应拦截器：处理响应
request.interceptors.response.use(
  (response: AxiosResponse) => {
    // 判断响应类型是否为二进制数据（比如文件下载的情况）
    const isBinaryResponse =
      response.headers['content-type']?.includes('application/octet-stream') ||
      response.config.responseType === 'blob';
    if (isBinaryResponse) {
      return response;
    }

    if (response.data.code !== networkSuccessCode) {
      handleAuthError(response);
      return Promise.reject(response.data);
    }
    return response;
  },
  (err) => {
    handleNetworkError(err.response);
    return Promise.reject(err.response);
  },
);

// 请求函数
export const Get = async <T>(
  url: string,
  params: IAnyObj = {},
  responseType?: 'json' | 'text' | 'blob',
): Promise<T> => {
  const response = await request.get(url, { params, responseType });
  return response.data as T;
};

export const Post = async <T>(
  url: string,
  data: IAnyObj | FormData,
  params: IAnyObj = {},
): Promise<T> => {
  const response = await request.post(url, data, { params });
  return response.data as T;
};

// DELETE 方法
export const Delete = async <T>(
  url: string,
  params: IAnyObj = {},
): Promise<T> => {
  const response = await request.delete(url, { params });
  return response.data as T;
};

// PUT 方法
export const Put = async <T>(
  url: string,
  data: IAnyObj,
  params: IAnyObj = {},
): Promise<T> => {
  const response = await request.put(url, data, { params });
  return response.data as T;
};

export default request;
