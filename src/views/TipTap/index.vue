<script setup lang="ts">
import TipTapEditor from '@comp/TipTapEditor/index.vue';

defineOptions({
  name: 'TipTap',
});
</script>

<template>
  <el-card class="app-main-card">
    <tip-tap-editor />
  </el-card>
</template>
