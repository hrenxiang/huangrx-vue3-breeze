export const networkSuccessCode: number = 0;

// 存放错误消息的常量
export const networkErrMap: Record<string, string> = {
  '400': '错误的请求',
  '401': '未授权，请重新登录',
  '403': '拒绝访问',
  '404': '请求错误，未找到该资源',
  '405': '请求方法未允许',
  '408': '请求超时',
  '500': '服务器端出错',
  '501': '网络未实现',
  '502': '网络错误',
  '503': '服务不可用',
  '504': '网络超时',
  '505': 'http版本不支持该请求',
};

export const authErrMap: Record<string, string> = {
  '106': '用户未授权，请进行登录！',
  '107': '登录失效，请重新登录！',
  '109': '认证失败，请重新登录！',
};
