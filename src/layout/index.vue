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

  .app-sidebar {
    position: fixed;
    overflow: auto;
    padding: $top-bar-height $sidebar-padding-lr 0 $sidebar-padding-lr;
    height: 100vh;

    /* 针对 Firefox 浏览器滚动条 */
    scrollbar-width: none;
  }

  /* 针对 WebKit 浏览器（如 Chrome, Safari, Edge） */
  .app-sidebar::-webkit-scrollbar {
    display: none;
  }

  .app-body {
    display: flex;
    padding-top: $top-bar-height;
    padding-left: calc($sidebar-width + 2 * $sidebar-padding-lr);
    min-height: 100vh;
  }
}
</style>
