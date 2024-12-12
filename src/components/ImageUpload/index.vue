<script setup lang="ts">
import { getToken } from '@/utils/auth';
import { BaseResponse, FileVO } from '@/types/base';
import { reactive, ref, watch } from 'vue';
import {
  ElMessage,
  UploadFile,
  UploadFiles,
  UploadProgressEvent,
  UploadUserFile,
} from 'element-plus';
import IconPackComponent from '@/components/IconPack/index.vue';
import { Calendar, CloseSmall, NewPicture, Plus } from '@icon-park/vue-next';
import { normDateFormat } from '@/utils/date.ts';
import ImageViewer from '@/components/ImageViewer/index.vue';

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

let uploadPercent = ref<number>(0);

let progressFlag = ref<boolean>(true);

const uploadFileUrl = import.meta.env.VITE_APP_BASE_FILE_UPLOAD_URL;

const headers = { Authorization: `Bearer ${getToken()}` };

const isLoad = ref<boolean>(false);

// 监听 originalList 的变化
watch(
  () => props.originalList,
  (newOriginalList) => {
    // 如果 originalList 有值，就复制到 fileList 中
    if (!isLoad.value) {
      newOriginalList.forEach((item) => {
        if (item && item.fileId) {
          fileList.push({
            name: item.fileName,
            url: item.filePath,
            createTime: item.uploadTime,
            uid: Date.now(),
          });
          isLoad.value = true;
        }

        if (!item.fileId && item.filePath) {
          fileList.push({
            name: item.fileName,
            url: item.filePath,
            createTime: item.uploadTime,
            uid: Date.now(),
          });
          isLoad.value = true;
        }
      });
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
      ElMessage({
        type: 'error',
        message: `文件格式不正确, 请上传${props.fileType.join('、')}格式文件！`,
        grouping: true,
      });
      return false;
    }
  }

  // 校检文件大小
  if (props.fileSize) {
    const isLt = file.size / 1024 / 1024 < props.fileSize / 1;
    if (!isLt) {
      ElMessage({
        type: 'error',
        message: `上传文件大小不能超过 ${props.fileSize} MB！`,
        grouping: true,
      });
      return false;
    }
  }

  // TODO: 加载动画
  return true;
};

// 文件个数超出
const handleExceed = () => {
  ElMessage({
    type: 'error',
    message: `上传文件数量不能超过 ${props.limit} 个！`,
    grouping: true,
  });
};

// 上传失败
const handleUploadError = () => {
  ElMessage({
    type: 'error',
    message: '文件上传失败，请重试！',
    grouping: true,
  });
};

// 上传成功处理
const handleUploadSuccess = (
  res: BaseResponse<FileVO>,
  uploadFile: UploadFile,
) => {
  if (res.code === 200) {
    fileList.push({
      ...uploadFile,
      url: res.data.filePath,
      fileId: res.data.fileId,
      createTime: normDateFormat(res.data.uploadTime),
    });
    emit('upload-complete', fileList);
    handleRemoveFile(uploadFile);
  } else {
    ElMessage({
      type: 'error',
      message: res.message,
      grouping: true,
    });
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

// 上传进度
const handleProgress = (evt: UploadProgressEvent) => {
  uploadPercent.value = Math.floor(evt.percent);
  if (uploadPercent.value >= 100) {
    uploadPercent.value = 100;
    setTimeout(() => {
      progressFlag.value = false;
    }, 1000);
  }
};

const triggerUpload = () => {
  fileUpload.value.$el.querySelector('input').click();
};

defineExpose({
  triggerUpload,
});
</script>

<template>
  <div class="upload-file">
    <el-upload
      :multiple="false"
      :data="addition"
      :action="uploadFileUrl"
      :before-upload="handleBeforeUpload"
      :file-list="fileList"
      :limit="limit"
      :on-error="handleUploadError"
      :on-exceed="handleExceed"
      :on-success="handleUploadSuccess"
      :on-remove="handleRemove"
      :on-progress="handleProgress"
      :show-file-list="false"
      :headers="headers"
      class="upload-file-uploader"
      ref="fileUpload"
      drag
    >
      <div class="el-upload__btn">
        <icon-pack-component :icon="Plus" />
      </div>
    </el-upload>

    <!--  文件上传列表  -->
    <div class="upload-file-list">
      <div
        v-for="file in fileList"
        :key="file.fileId"
        class="upload-file-list__item"
      >
        <div class="upload-file-list__item-image">
          <image-viewer :image-url="file.url" :icon-size="32" />
        </div>

        <div class="upload-file-list__item-desc">
          <el-tooltip
            :content="file.name"
            placement="top"
            :disabled="!file.name"
          >
            <span class="upload-file-list__item-name">
              <icon-pack-component :icon="NewPicture" />
              {{ file.name || '--' }}
            </span>
          </el-tooltip>
          <span class="upload-file-list__item-time">
            <icon-pack-component :icon="Calendar" />
            {{ file.createTime || '--' }}
          </span>
        </div>

        <div class="upload-file-list__item-btn" @click="handleRemoveFile(file)">
          <el-link :underline="false" type="info">
            <icon-pack-component :icon="CloseSmall" />
          </el-link>
        </div>
      </div>
    </div>

    <div class="el-upload__tip">
      <template>请上传清晰且无遮挡、涂抹的文件。</template>
      <br />
      <template v-if="props.fileType"
        >格式支持{{ props.fileType.join('、').toUpperCase() }}，
      </template>
      <template v-if="props.fileSize / 1"
        >文件大小{{ props.fileSize }}MB以内
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
