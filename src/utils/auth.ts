import { JwtPayload } from '@/types/base';

const TOKEN_KEY = 'template-admin-token';
const REFRESH_TOKEN_KEY = 'template-admin-refresh-token';

// 设置 token
export const setToken = (token: string): void => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    console.error('Invalid token value');
  }
};

// 获取 token
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

// 删除 token
export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

// 检查 token 是否存在
export const hasToken = (): boolean => {
  return !!localStorage.getItem(TOKEN_KEY);
};

// 设置 token
export const setRefreshToken = (refreshToken: string): void => {
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  } else {
    console.error('Invalid token value');
  }
};

// 获取 token
export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

// 删除 token
export const removeRefreshToken = (): void => {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

// 检查 token 是否存在
export const hasRefreshToken = (): boolean => {
  return !!localStorage.getItem(REFRESH_TOKEN_KEY);
};

// 解码 JWT 的函数
export const decodeJWT = (token: string): JwtPayload => {
  const payload = token.split('.')[1]; // 获取 token 的 payload 部分
  const decodedPayload = atob(payload); // 解码 Base64 编码的 payload
  return JSON.parse(decodedPayload); // 将解码后的 JSON 字符串解析成对象
};

// 获取 JWT 的过期时间
export const getTokenExpiry = (token: string): number | null => {
  try {
    const decoded = decodeJWT(token);
    return decoded.exp ? decoded.exp : null; // 如果 exp 存在则返回过期时间
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null; // 如果解析失败，返回 null
  }
};
