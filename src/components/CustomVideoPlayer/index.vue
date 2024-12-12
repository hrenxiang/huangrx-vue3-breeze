<template>
  <div id="vs"></div>
</template>
<script setup>
import Player from 'xgplayer';
import 'xgplayer/dist/index.min.css';
import { nextTick, onMounted, ref, watch } from 'vue';

defineOptions({
  name: 'CustomVideoPlayer',
});

const props = defineProps({
  videoPath: {
    type: String,
    default: '',
  },
  posterPath: {
    type: String,
    default: '',
  },
});

const currentVideoPath = ref(props.videoPath);

// 监听 originalList 的变化
watch(
  () => props.videoPath,
  (newVideoPath) => {
    currentVideoPath.value = newVideoPath;
  },
  { immediate: true, deep: true },
);

onMounted(() => {
  nextTick(() => {
    new Player({
      id: 'vs',
      url:
        import.meta.env.VITE_APP_BASE_FILE_FRAGMENT_DOWNLOAD_URL +
        currentVideoPath.value,
      lang: 'zh-cn',
      autoplay: true,
      controls: true,
      width: 1200,
      height: 675,
      fluid: true,
      videoFillMode: 'auto',
      volume: 0.3,
      poster: props.posterPath
        ? import.meta.env.VITE_APP_BASE_FILE_DOWNLOAD_URL + props.posterPath
        : '',
      playbackRate: [0.5, 1, 2],
    });
  });
});
</script>
<style lang="scss" scoped>
#vs {
  margin-top: 10px;
}
</style>
