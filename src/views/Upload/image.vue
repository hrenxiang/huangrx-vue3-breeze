<script lang="ts" setup>
import ImageUpload from '@comp/ImageUpload/index.vue';

defineOptions({
  name: 'UploadImage',
});
</script>

<template>
  <el-card class="app-main-card">
    <image-upload />
  </el-card>
</template>
