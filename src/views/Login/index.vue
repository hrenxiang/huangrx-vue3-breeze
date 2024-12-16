<script setup lang="ts">
import Logo from '@/assets/logo/logo-text.png';
import { reactive } from 'vue';

defineOptions({
  name: 'Login',
});

let loginForm = reactive({
  username: '',
  password: '',
  loginType: '',
});
</script>

<template>
  <div class="login-wrapper">
    <el-card class="login-card">
      <div class="login-card-header">
        <div class="login-card-header__logo">
          <el-image :src="Logo" mode="aspectFill" />
        </div>
        <span class="login-card-title">Welcome</span>
      </div>
      <div class="login-card-form">
        <el-form :model="loginForm">
          <el-form-item label="" prop="email">
            <el-input
              class="login-card-form__input"
              v-model="loginForm.username"
              placeholder="请输入用户名"
            />
          </el-form-item>
          <el-form-item label="" prop="email">
            <el-input
              class="login-card-form__input"
              v-model="loginForm.password"
              placeholder="请输入密码"
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="login-card-btn__wrapper">
        <button class="login-card-btn">Let`s go →</button>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:map';

.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: map.get($gradient-light-blue, color);
  background-image: map.get($gradient-light-blue, gradient);

  .login-card {
    width: 28rem;
    height: 36rem;
    border: 2px solid $bg-color-dark;
    border-radius: 5px;
    box-shadow: 4px 4px $bg-color-dark;

    :deep(.el-card__body) {
      display: grid;
      align-items: center;
      height: 100%;
      grid-template-rows: 1fr auto 1fr;
    }

    .login-card-header {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;

      .login-card-header__logo {
        width: 6rem;
      }

      .login-card-title {
        font-size: 1.8rem;
        font-family: pingfang-sc-medium, sans-serif;
        text-shadow: 1px 1px $bg-color-dark;
      }
    }

    .login-card-form {
      display: flex;
      justify-content: center;
      width: 100%;

      :deep(.el-form-item) {
        margin-bottom: 4rem;
      }

      .login-card-form__input {
        width: 24rem;
        height: 3rem;
        border-radius: 5px;

        :deep(.el-input__wrapper) {
          border: 2px solid $bg-color-dark;
          box-shadow: 4px 4px $bg-color-dark;
        }

        :deep(.el-input__wrapper.is-focus) {
          border: 2px solid $primary-color;
        }
      }
    }

    .login-card-btn__wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      flex-direction: row;

      .login-card-btn {
        position: relative;
        z-index: 1;
        width: 12rem;
        height: 3rem;
        font-size: 18px;
        font-family: pingfang-sc-medium, sans-serif;
        background: transparent;
        border-radius: 5px;
        box-shadow: 4px 4px $bg-color-dark;
        cursor: pointer;
      }

      .login-card-btn::before {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background-color: $primary-color;
        transition: 0.5s ease;
        content: '';
      }

      .login-card-btn:hover {
        color: $bg-color-dark;
        transition-delay: 0.5s;
      }

      .login-card-btn:hover::before {
        width: 100%;
      }

      .login-card-btn::after {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 0;
        background-color: $primary-color;
        transition: 0.4s ease;
        content: '';
      }

      .login-card-btn:hover::after {
        height: 100%;
        transition-delay: 0.4s;
        color: $bg-color-light;
      }
    }
  }
}
</style>
