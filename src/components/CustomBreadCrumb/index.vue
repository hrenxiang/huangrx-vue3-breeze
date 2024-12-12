<script lang="ts" setup>
import { BreadCrumbData } from '@/types/base';

defineOptions({
  name: 'CustomBreadCrumb',
});

let props = defineProps<{
  breadcrumbItems: BreadCrumbData[];
}>();
</script>

<template>
  <div class="bread-container">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item
        v-for="item in props.breadcrumbItems"
        :key="item.path"
        v-bind="item.path ? { to: { path: item.path } } : {}"
        class="breadcrumb-item"
      >
        <template v-if="item.method">
          <span class="bread-item-title" @click="item.method">
            {{ item.title }}
          </span>
        </template>
        <template v-else>
          <span>
            {{ item.title }}
          </span>
        </template>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style lang="scss">
.bread-container {
  padding: 10px 0 0;

  .bread-item-title {
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .bread-item-title:hover {
    color: #1a77ff;
  }
}
</style>
