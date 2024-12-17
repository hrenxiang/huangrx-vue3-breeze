export interface IAnyObj {
  [index: string]: unknown;
}

export interface JwtPayload {
  // 必要的字段
  exp: number; // 过期时间，Unix 时间戳（秒）
  iat: number; // 签发时间，Unix 时间戳（秒）
  iss?: string; // 签发者，表示 JWT 的发布者
  sub?: string; // 主题，通常是用户 ID 或主体标识
  aud?: string | string[]; // 受众，可以是一个字符串或字符串数组，表示谁是这个 JWT 的目标
  jti?: string; // JWT ID，标识 JWT 的唯一性，防止重放攻击
}

export interface TokenPayload {
  userName: string;
  userId: string;
}

export interface LoginDTO extends IAnyObj {
  username?: string;
  password?: string;
  refreshToken?: string;
  loginType: 'normal' | 'refresh_token';
}

export interface LoginVO {
  token: TokenDTO;
  user: LoginUserVO;
}

export interface TokenDTO extends IAnyObj {
  accessToken: string;
  refreshToken: string;
  expire: string;
}

export interface LoginUserVO {
  userInfo: UserVO;
  roleKey: string;
  permissions: string[];
}

export interface UserVO {
  userId: string;
  username: string;
  nickname: string;
  userType: number;
  email: string;
  phoneNumber: string;
  sex: number;
  avatar: string;
  status: number;
  loginIp: string;
}

/**
 * FileVO
 */
export interface FileVO {
  /**
   * 文件ID
   */
  id: string;
  /**
   * 文件名称
   */
  fileName: string;
  /**
   * 文件地址
   */
  filePath: string;
  /**
   * 上传时间
   */
  createTime: string;
  /**
   * 分片上传时，服务端返回的是否终结标识
   */
  index?: string;
}

export interface ResponseDTO<T> {
  code: number;
  message: string;
  data: T;
}

export interface BreadCrumbData {
  path?: string;
  title: string;
  method?: () => volid;
}

export interface MenuItem {
  id: string;
  name: string;
  level: string;
  path: string;
  meta: {
    icon?: DefineComponent<IIconProps>;
    disabled?: boolean;
  };
  child: MenuItem[];
}
