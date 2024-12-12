<script setup lang="ts">
import { DefineComponent } from 'vue';
import { IIconProps, Theme } from '@icon-park/vue-next/lib/runtime';

defineOptions({
  name: 'IconPackComponent',
});

const { icon, size, fill, theme, strokeWidth } = defineProps<{
  icon?: DefineComponent<IIconProps>;
  theme?: Theme;
  size?: number | string;
  fill?: string | string[];
  strokeWidth?: number;
}>();
</script>

<template>
  <div>
    <component
      :is="icon"
      :theme="theme"
      :size="size"
      :fill="fill"
      :stroke-width="strokeWidth"
      class="custom-icon"
    />
  </div>
</template>

<style lang="scss" scoped>
.custom-icon {
  display: flex;
}
</style>
