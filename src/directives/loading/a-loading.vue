<script setup>
import { Vue3Lottie } from 'vue3-lottie';
import LoadingJson from '@/assets/lottie/loading.json';

defineOptions({
  name: 'ALoading',
});
</script>

<template>
  <div class="loading-animation__wrapper">
    <Vue3Lottie :animationData="LoadingJson" :height="140" :width="140" />
  </div>
</template>

<style scoped lang="scss">
.loading-animation__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
