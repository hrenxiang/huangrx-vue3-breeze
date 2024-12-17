<script setup lang="ts">
import { getToken } from '@/utils/auth';
import { FileVO, ResponseDTO } from '@/types/base';
import { PropType, reactive, ref, watch } from 'vue';
import {
  UploadFile,
  UploadFiles,
  UploadRequestOptions,
  UploadUserFile,
} from 'element-plus';
import IconPackComponent from '@/components/IconPack/index.vue';
import { Calendar, CloseSmall, NewPicture, Plus } from '@icon-park/vue-next';
import { normDateFormat } from '@/utils/date.ts';
import ImageViewer from '@/components/ImageViewer/index.vue';
import { errorMsg } from '@/utils/message.ts';
import { networkSuccessCode } from '@/api/base/errorMessages.ts';
import { fileApi } from '@/api/business/file.ts';

defineOptions({
  name: 'ImageUpload',
});

const props = defineProps({
  // 数量限制
  limit: {
    type: Number,
    default: 5,
  },
  // 大小限制(MB)
  fileSize: {
    type: Number,
    default: 5,
  },
  // 文件类型, 例如['png', 'jpg', 'jpeg']
  fileType: {
    type: Array<string>,
    default: ['doc', 'xls', 'ppt', 'txt', 'pdf'],
  },
  // 业务类型
  addition: {
    type: Object,
    default: () => {
      return {
        type: '',
      };
    },
  },
  originalItem: {
    type: Object as PropType<FileVO>,
    default: null,
  },
  // 列表
  originalList: {
    type: Array<FileVO>,
    default: () => {
      return [];
    },
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
});

interface CustomUploadFile extends UploadUserFile {
  fileId?: string;
  createTime?: string;
}

let fileUpload = ref();

const emit = defineEmits(['upload-complete']);

let fileList = reactive<CustomUploadFile[]>([]);

const headers = { Authorization: `Bearer ${getToken()}` };

const isInitialLoad = ref<boolean>(true);

// 监听 originalItem 的变化
watch(
  () => props.originalItem,
  (newOriginalItem) => {
    if (isInitialLoad.value && newOriginalItem) {
      fileList.push({
        uid: Date.now(),
        fileId: newOriginalItem.id,
        name: newOriginalItem.fileName,
        url: newOriginalItem.filePath,
        createTime: newOriginalItem.createTime,
      });
      isInitialLoad.value = false; // 防止之后再处理 props 变化
    }
  },
  { immediate: true, deep: true },
);

// 监听 originalList 的变化
watch(
  () => props.originalList,
  (newOriginalList) => {
    if (isInitialLoad.value && newOriginalList?.length) {
      newOriginalList.forEach((item) => {
        fileList.push({
          uid: Date.now(),
          fileId: item.id,
          name: item.fileName,
          url: item.filePath,
          createTime: item.createTime,
        });
      });
      isInitialLoad.value = false; // 防止之后再处理 props 变化
    }
  },
  { immediate: true, deep: true },
);

// 上传前校检格式和大小
const handleBeforeUpload = (file: File) => {
  // 校检文件类型
  if (props.fileType) {
    const fileName = file.name.split('.');
    const fileExt = fileName[fileName.length - 1].toLowerCase();
    const isTypeOk = props.fileType.some(
      (type) => type.toLowerCase() === fileExt,
    );
    if (!isTypeOk) {
      errorMsg(`文件格式不正确, 请上传${props.fileType.join('、')}格式文件！`);
      return false;
    }
  }

  // 校检文件大小
  if (props.fileSize) {
    const isLt = file.size / 1024 / 1024 < props.fileSize / 1;
    if (!isLt) {
      errorMsg(`上传文件大小不能超过 ${props.fileSize} MB！`);
      return false;
    }
  }

  // 校验成功
  return true;
};

// 上传超过限制
const handleExceed = () => {
  errorMsg(`上传文件数量不能超过 ${props.limit} 个！`);
};

// 自定义上传逻辑
const handleUploadFile = (options: UploadRequestOptions): Promise<unknown> => {
  const formData = new FormData();
  formData.append('file', options.file);

  return new Promise((resolve, reject) => {
    fileApi
      .uploadFile(props.addition.type, formData)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// 上传失败
const handleUploadError = (error: Error) => {
  console.log(error.message);
  let response = JSON.parse(error.message) as ResponseDTO<string>;
  console.log(response?.code);
  errorMsg(response.message);
};

// 上传成功处理
const handleUploadSuccess = (
  res: ResponseDTO<FileVO>,
  uploadFile: UploadFile,
) => {
  console.log(res);
  if (res.code === networkSuccessCode) {
    fileList.push({
      ...uploadFile,
      fileId: res.data.id,
      name: res.data.fileName,
      url: res.data.filePath,
      createTime: normDateFormat(res.data.createTime),
    });
    emit('upload-complete', fileList);
  } else {
    errorMsg(res.message);
  }
};

// 处理文件移除的回调
const handleRemove = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  const index = uploadFiles.findIndex((item) => item.uid === uploadFile.uid);
  if (index !== -1) {
    uploadFiles.splice(index, 1);
  }
};

// 处理文件移除
const handleRemoveFile = (file: UploadUserFile) => {
  const index = fileList.findIndex((item) => item.uid === file.uid);
  if (index !== -1) {
    fileList.splice(index, 1);
    fileUpload.value.handleRemove(file);
  }
  emit('upload-complete', fileList);
};

// 模拟点击文件上传按钮，触发上传操作
const triggerUpload = () => {
  fileUpload.value.$el.querySelector('input').click();
};

defineExpose({
  triggerUpload,
});
</script>

<template>
  <div class="upload-image-wrapper">
    <el-upload
      drag
      :multiple="false"
      :show-file-list="false"
      ref="fileUpload"
      class="upload-image-body"
      :data="addition"
      :file-list="fileList"
      :limit="limit"
      :before-upload="handleBeforeUpload"
      :on-exceed="handleExceed"
      :http-request="handleUploadFile"
      :on-error="handleUploadError"
      :on-success="handleUploadSuccess"
      :on-remove="handleRemove"
      :headers="headers"
    >
      <div class="upload-image-plus">
        <icon-pack-component :icon="Plus" />
      </div>
    </el-upload>

    <!--  文件上传列表  -->
    <div class="upload-image-list">
      <div
        v-for="file in fileList"
        :key="file.fileId"
        class="upload-image-item"
      >
        <div class="upload-image-item__img">
          <image-viewer :image-url="file.url" :icon-size="32" />
        </div>

        <div class="upload-image-item__desc">
          <el-tooltip
            :content="file.name"
            placement="top"
            :disabled="!file.name"
          >
            <span class="upload-image-item__name">
              <icon-pack-component :icon="NewPicture" />
              {{ file.name || '--' }}
            </span>
          </el-tooltip>
          <span class="upload-image-item__time">
            <icon-pack-component :icon="Calendar" />
            {{ file.createTime || '--' }}
          </span>
        </div>

        <div class="upload-image-item__remove" @click="handleRemoveFile(file)">
          <el-link :underline="false" type="info">
            <icon-pack-component :icon="CloseSmall" />
          </el-link>
        </div>
      </div>
    </div>

    <div class="upload-image-tip">
      <template>请上传清晰且无遮挡、涂抹的文件。</template>
      <br />
      <template v-if="props.fileType">
        格式支持{{ props.fileType.join('、').toUpperCase() }}，
      </template>
      <template v-if="props.fileSize / 1">
        文件大小{{ props.fileSize }}MB以内
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.el-upload__btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  height: 100%;

  .el-upload__icon {
    font-size: 19px;
    line-height: 16px;
  }
}

.upload-file {
  width: 390px;
}

.upload-file-uploader {
  margin-bottom: 5px;
  width: 100%;
  height: 170px;
}

:deep(.el-upload-dragger) {
  width: 100% !important;
  height: 170px;
}

:deep(.el-upload) {
  width: 100% !important;
}

.upload-file-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 10px;
}

.upload-file-list__item {
  display: grid;
  padding: 12px 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  grid-template-columns: 20% 70% 10%;

  &-image {
    display: flex;
    align-items: center;
    overflow: hidden;
    border-radius: 5px;
    object-fit: cover;
  }

  &-desc {
    display: flex;
    justify-content: space-between;
    padding: 0 8px;
    font-size: 12px;
    flex-direction: column;
  }

  &-name {
    display: flex;
    align-items: center;
    overflow: hidden; /* 隐藏超出部分 */
    width: 100%;
    text-overflow: ellipsis; /* 用省略号代替超出部分 */
    white-space: nowrap; /* 防止文字换行 */
    flex-direction: row;
    gap: 6px;
  }

  &-time {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 6px;
    width: 100%;
  }

  &-btn {
    display: flex;
    justify-content: center;
    align-items: center;

    :hover {
      color: red;
    }
  }
}

.el-upload__tip {
  margin-top: 6px !important;
  font-size: 12px;
  text-align: left;
  color: #666;
  line-height: 18px !important;
  letter-spacing: 0;
}

:deep(.upload-file) {
  width: 100% !important;
}
</style>
