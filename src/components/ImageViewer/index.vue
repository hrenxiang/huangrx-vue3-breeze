<script setup lang="ts">
import IconPackComponent from '@/components/IconPack/index.vue';
import { ErrorPicture } from '@icon-park/vue-next';
import { ref, watch } from 'vue';

defineOptions({
  name: 'ImageViewer',
});

const props = defineProps<{
  imageUrl: string | undefined;
  iconSize?: number | undefined;
}>();

const resultPath = ref<string>(
  import.meta.env.VITE_APP_BASE_FILE_DOWNLOAD_URL + props.imageUrl,
);

// 监听 originalList 的变化
watch(
  () => props.imageUrl,
  (newImageUrl) => {
    resultPath.value =
      import.meta.env.VITE_APP_BASE_FILE_DOWNLOAD_URL + newImageUrl;
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <div class="image-viewer">
    <el-image
      :src="resultPath"
      :preview-src-list="[resultPath]"
      :preview-teleported="true"
      fit="cover"
      lazy
    >
      <template #error>
        <div class="image-slot">
          <icon-pack-component :icon="ErrorPicture" :size="iconSize" />
        </div>
      </template>
    </el-image>
  </div>
</template>

<style lang="scss" scoped>
.image-viewer {
  display: flex;
}
</style>
