import { LoginDTO, LoginVO, ResponseDTO } from '@/types/base';
import { Post } from '@/api/base/http.ts';

export const authApi = {
  doLogin: async (param: LoginDTO) => {
    return Post<ResponseDTO<LoginVO>>(`/login`, param);
  },
};
