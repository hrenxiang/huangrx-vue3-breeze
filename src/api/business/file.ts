import { Get, Post } from '@/api/base/http.ts';
import { FileVO, ResponseDTO } from '@/types/base';

export const fileApi = {
  downloadFile: async (filePath: string) => {
    return Get<Blob>(`/file/download?filePath=${filePath}`, {}, 'blob');
  },
  fragmentUploadFile: async (param: string, data: FormData) => {
    return Post<ResponseDTO<FileVO>>(`/file/fragment/upload?${param}`, data);
  },

  uploadFile: async (param: string, data: FormData) => {
    return Post<ResponseDTO<FileVO>>(`/file/upload?type=${param}`, data);
  },
};
