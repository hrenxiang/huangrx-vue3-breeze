<script lang="ts" setup>
import AppMain from './AppMain.vue';
import TopBar from '@/layout/TopBar/index.vue';
import Sidebar from '@/layout/Sidebar/index.vue';

defineOptions({
  name: 'Layout',
});
</script>

<template>
  <div class="app-wrapper">
    <section class="app-header">
      <top-bar />
    </section>
    <section class="app-sidebar">
      <sidebar />
    </section>
    <section class="app-body">
      <app-main />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.app-wrapper {
  overflow: hidden;

  .app-body {
    display: flex;
    padding-top: $top-bar-height;
    padding-left: $sidebar-width;
    min-height: 100vh;
    background: $shadow-color;
  }
}
</style>
