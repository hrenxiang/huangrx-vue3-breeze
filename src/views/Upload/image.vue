<script lang="ts" setup>
import ImageUpload from '@comp/ImageUpload/index.vue';

defineOptions({
  name: 'UploadImage',
});
</script>

<template>
  <el-card class="app-main-card">
    <image-upload
      :addition="{ type: 'default' }"
      :limit="1"
      :is-edit="true"
      :original-list="imgList"
      :file-type="['JPG', 'JPEG', 'PNG']"
      :file-size="10"
      @upload-complete="handleImgUploadComplete"
    />
  </el-card>
</template>
