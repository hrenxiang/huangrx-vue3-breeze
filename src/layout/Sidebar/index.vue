<script setup lang="ts">
import MenuTree from '@/layout/Sidebar/MenuTree.vue';
import menuData from '@/layout/menu-data.ts';
import { MenuItem } from '@/types/base';
import { onMounted, ref } from 'vue';
import router from '@/router';
import { useRoute } from 'vue-router';

defineOptions({
  name: 'Sidebar',
});

let route = useRoute();

const menuList = ref(menuData);
const defaultActive = ref<string>('1');

const handleMenuClick = (item: MenuItem) => {
  defaultActive.value = item.id;

  if (item.path) {
    router.push(item.path);
  }
};

// 遍历 menuData 查找匹配的项
const findMenuItemByPath = (path: string, menuList: MenuItem[]): string => {
  for (let item of menuList) {
    if (item.path && item.path.length > 0 && path.includes(item.path)) {
      return item.id;
    }

    if (item.child && item.child.length > 0) {
      // 如果有子菜单，递归查找
      const childId = findMenuItemByPath(path, item.child);
      if (childId && childId !== '1') {
        return childId;
      }
    }
  }
  // 如果没有找到
  return '1';
};

onMounted(() => {
  defaultActive.value = findMenuItemByPath(route.path, menuList.value);
});
</script>

<template>
  <MenuTree
    :menu="menuList"
    :defaultActive="defaultActive"
    @clickItem="handleMenuClick"
  />
</template>
