export interface IAnyObj {
  [index: string]: unknown;
}

export interface TokenPayload {
  userName: string;
  userId: string;
}

/**
 * FileVO
 */
export interface FileVO {
  /**
   * 文件ID
   */
  fileId: string;
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
  uploadTime: string;
  /**
   * 分片上传时，服务端返回的是否终结标识
   */
  index?: string;
}

export interface BaseResponse<T> {
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
