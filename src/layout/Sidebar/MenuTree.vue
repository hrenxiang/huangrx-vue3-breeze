// MenuTree 组件 script 部分
<script setup lang="ts">
import type { PropType } from 'vue';
import { MenuItem } from '@/types/base';
import IconPackComponent from '@/components/IconPack/index.vue';

defineOptions({
  name: 'MenuTree',
});

// 修正 menu 和 defaultActive 的类型定义
defineProps({
  menu: {
    type: Array as PropType<MenuItem[]>, // 更明确的类型定义
    required: true,
    default: () => [],
  },
  defaultActive: {
    type: String,
    required: true,
    default: '',
  },
});

const emit = defineEmits(['clickItem']);

const whiteSpace = '　';

// 返回的空格字符串 用于显示菜单层级
const generateSpaces = (level: string) => {
  let str = '';
  level
    .split('')
    .filter((it) => it != '-')
    .forEach(() => {
      str += '　';
    });
  return str;
};

// 点击当前菜单项
const clickItemHandle = (item: MenuItem) => {
  console.log('clickItem', item);
  emit('clickItem', item);
};
</script>

<template>
  <el-menu
    :default-active="defaultActive"
    :unique-opened="true"
    class="siderbar-el-menu"
  >
    <template v-for="item in menu">
      <!-- 如果有子集 -->
      <template v-if="item.child && item.child.length > 0">
        <el-sub-menu
          :key="item.id"
          :index="item.id"
          :disabled="item.meta?.disabled"
          :popper-append-to-body="false"
        >
          <template #title>
            <!-- 添加空格 表示下级-->
            <span> {{ generateSpaces(item.level) }} </span>
            <icon-pack-component :icon="item.meta?.icon" />
            <span> {{ whiteSpace }} </span>
            <span style="user-select: none"> {{ item.name }}</span>
          </template>
          <MenuTree
            :menu="item.child"
            :defaultActive="defaultActive"
            @clickItem="clickItemHandle"
          />
        </el-sub-menu>
      </template>
      <!-- 如果没有子集 -->
      <template v-else>
        <el-menu-item
          :key="item.id"
          :index="item.id"
          :disabled="item.meta?.disabled"
          :popper-append-to-body="false"
          @click="clickItemHandle(item)"
        >
          <!-- 添加空格 表示下级-->
          <span> {{ generateSpaces(item.level) }} </span>
          <icon-pack-component :icon="item.meta?.icon" />
          <span> {{ whiteSpace }} </span>
          <template v-slot:title>
            <span style="user-select: none">{{ item.name }}</span>
          </template>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<style scoped lang="scss">
.el-menu {
  border-right: none !important;
  min-width: $sidebar-width;
  max-width: $sidebar-width;

  &-item {
    z-index: 2 !important;
    display: flex;
    align-items: center;
    overflow: hidden;
    margin: 10px 0;
  }

  &-item::before {
    position: absolute;
    top: 0;
    left: -40px;
    z-index: -1;
    width: 0;
    height: 100%;
    background-color: var(--el-menu-hover-bg-color);
    transition: all 1s;
    content: '';
    transform: skewX(45deg);
  }

  &-item:not(.is-active):hover {
    background-color: transparent;
  }

  &-item:not(.is-active):hover::before {
    width: 160% !important;
  }

  .is-active {
    /* /animation: circle-in-center 1.5s ease-in-out forwards; */
    position: relative;
    overflow: hidden;
    color: #fff !important;
    background: #1a77ff !important;
    border-radius: 4px;
    transition:
      background 1s ease,
      font-weight 1s ease,
      color 0.5s ease;
    font-weight: 500;
  }
}

@keyframes circle-in-center {
  0% {
    clip-path: $circle-center-center-out;
  }

  100% {
    clip-path: $circle-center-center-in;
  }
}

@keyframes circle-out-center {
  0% {
    clip-path: $circle-center-center-in;
  }

  100% {
    clip-path: $circle-center-center-out;
  }
}
</style>
