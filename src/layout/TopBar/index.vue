<script setup lang="ts">
import logo from '@/assets/logo/logo.png';
import { ElMessageBox } from 'element-plus';
import { stores } from '@/store';
import { getToken } from '@/utils/auth.ts';
import { Down } from '@icon-park/vue-next';
import { onMounted } from 'vue';
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from '@/types/base';

defineOptions({
  name: 'TopBar',
});

const userStore = stores.user();

const logout = async () => {
  // 弹出确认框
  ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      // 跳转到首页或自定义页面
      // login
      //   .doLogout()
      //   .then(() => {
      //     removeToken();
      //     location.href = '/login';
      //   })
      //   .catch(() => {
      //     ElMessage({
      //       message: '注销失败',
      //       grouping: true,
      //       type: 'error',
      //     });
      //   });
    })
    .catch(() => {
      console.log('取消注销');
    });
};

onMounted(() => {
  if (!userStore.userName || userStore.userName === '') {
    let token = getToken();
    if (token) {
      let tokenPayload = jwtDecode(token) as TokenPayload;
      userStore.updateUser(tokenPayload);
    }
  }
});
</script>

<template>
  <div class="navbar">
    <div class="left-menu">
      <el-image class="logo" :src="logo"></el-image>
    </div>
    <div class="right-menu">
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <span class="nick">{{ userStore.userName }}</span>
          <Down />
        </div>
        <template v-slot:dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">
              <span>退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="scss">
.navbar {
  position: fixed;
  z-index: 2001;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  padding: 0 $sidebar-padding-lr;
  width: 100%;
  height: $top-bar-height;
  flex-direction: row;
  background-color: $bg-color-light;
  border-bottom: 1px solid $shadow-color;

  .left-menu {
    display: flex;
    align-items: center;
    padding: 0 8px;
    font-size: 20px;
    font-family: PingFang-SC-Medium, sans-serif;
    color: #000c19;
    font-weight: 500;
    flex-direction: row;
    gap: 12px;

    .logo {
      height: $top-bar-height;
    }
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgb(0 0 0 / 2.5%);
        }
      }
    }

    .avatar-container {
      .avatar-wrapper {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 0;
        height: 100%;
        font-size: 14px;
        font-family: PingFang, sans-serif;
        text-align: right;
        color: #000c19;
        flex-direction: row;
        gap: 4px;
        letter-spacing: 0;
        line-height: 14px;
        font-weight: 400;
        cursor: pointer;
      }
    }
  }
}
</style>
