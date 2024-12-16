import { ElMessage, ElMessageBox } from 'element-plus';

// 普通信息提示
export const infoMsg = (msgInfo: string) => {
  ElMessage({
    type: 'info',
    showClose: true,
    dangerouslyUseHTMLString: true,
    message: msgInfo,
    grouping: true,
  });
};

// 成功提示
export const successMsg = (msgInfo: string) => {
  ElMessage({
    type: 'success',
    showClose: true,
    dangerouslyUseHTMLString: true,
    message: msgInfo,
    grouping: true,
  });
};

// 错误提示
export const errorMsg = (msgInfo: string) => {
  ElMessage({
    type: 'error',
    showClose: true,
    dangerouslyUseHTMLString: true,
    message: msgInfo,
    grouping: true,
  });
};

// 警告提示
export const warnMsg = (msgInfo: string) => {
  ElMessage({
    type: 'warning',
    showClose: true,
    dangerouslyUseHTMLString: true,
    message: msgInfo,
    grouping: true,
  });
};

// 带一个确定按钮或是按钮的alertBox
export const alertBox = (
  msg: string,
  btnName: '确定' | '取消',
  type: '' | 'success' | 'warning' | 'info' | 'error',
  title?: string,
) => {
  const confirmName = btnName == '确定' ? '确定' : '是';
  return ElMessageBox.alert(msg, title || '提示', {
    type: type,
    confirmButtonText: confirmName,
    buttonSize: 'default',
    dangerouslyUseHTMLString: true,
  });
};
// 带确定取消按钮或者是否按钮的弹出提示框
export const confirmBox = (
  msg: string,
  btnName: '确定' | '取消',
  type: '' | 'success' | 'warning' | 'info' | 'error',
  title?: string,
) => {
  const confirmName = btnName == '确定' ? '确定' : '是';
  const cancelsName = btnName == '确定' ? '取消' : '否';
  return ElMessageBox.confirm(msg, title || '提示', {
    type: type,
    confirmButtonText: confirmName,
    cancelButtonText: cancelsName,
    buttonSize: 'default',
    closeOnClickModal: false,
    closeOnPressEscape: false,
    dangerouslyUseHTMLString: true,
  });
};
