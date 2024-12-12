import { defineStore } from 'pinia';
import { TokenPayload } from '@/types/base';

interface UserState {
  userId: string;
  userName: string;
}

export const userStore = defineStore('USER', {
  state: (): UserState => {
    return {
      userId: '',
      userName: '',
    };
  },
  //类似于computed 可以帮我们去修饰我们的值
  getters: {},
  //可以操作异步 和 同步提交state
  actions: {
    updateUser(payload?: TokenPayload | null) {
      this.userName = payload?.userName ?? '';
      this.userId = payload?.userId ?? '';
    },
  },
});
