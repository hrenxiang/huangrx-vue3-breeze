const TOKEN_KEY = 'template-admin-token';

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
