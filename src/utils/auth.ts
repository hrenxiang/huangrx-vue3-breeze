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
