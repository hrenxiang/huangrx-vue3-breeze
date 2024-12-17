export interface IAnyObj {
  [index: string]: unknown;
}

export interface TokenPayload {
  userName: string;
  userId: string;
}

export interface LoginDTO extends IAnyObj {
  username: string;
  password: string;
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
