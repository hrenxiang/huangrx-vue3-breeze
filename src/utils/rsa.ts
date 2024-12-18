/**
 * RSA 加密解密工具类
 **/
import { JSEncrypt } from 'jsencrypt';

// 密钥管理模块
const keys = {
  publicKey: `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC1IPhQ9GuQslegyIHUqz/Cp+nhQAQ5tyrKb3GWYlajh6+x3ie/qHRnTtjtk9F3WDk8zxbg9y5jJ9btBE3dn6ccvUy7B8gVcA9alMgQVNkUAMAQQylce2PF0QI//6HX4moGDGfpTXxVEMp7L2K9/hoazi1bQT6SJkuMQwpJZ9ia6QIDAQAB`,
  privateKey: '', // 在这里填入私钥
};

// 加密
export const getEncryptString = (txt: string | undefined | null): string => {
  try {
    if (!txt) {
      return '';
    }
    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(keys.publicKey); // 设置公钥
    const encrypted = encryptor.encrypt(txt);
    if (!encrypted) throw new Error('加密失败');
    return encrypted;
  } catch (error) {
    console.error('加密过程出错:', error);
    return '';
  }
};

// 解密
export function getDecryptString(txt: string): string {
  try {
    const encryptor = new JSEncrypt();
    encryptor.setPrivateKey(keys.privateKey); // 设置私钥
    const decrypted = encryptor.decrypt(txt);
    if (!decrypted) throw new Error('解密失败');
    return decrypted;
  } catch (error) {
    console.error('解密过程出错:', error);
    return '';
  }
}
