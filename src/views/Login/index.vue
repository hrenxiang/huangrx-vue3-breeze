<script setup lang="ts">
import { reactive, ref } from 'vue';
import { LoginDTO } from '@/types/base';
import { FormInstance, FormRules } from 'element-plus';
import { authApi } from '@/api/business/auth.ts';
import { successMsg } from '@/utils/message.ts';
import { setRefreshToken, setToken } from '@/utils/auth.ts';
import router from '@/router';
import { getEncryptString } from '@/utils/rsa.ts';

defineOptions({
  name: 'Login',
});

const loginFormRef = ref<FormInstance>();

let loginForm = reactive<LoginDTO>({
  username: '',
  password: '',
  loginType: 'normal',
});

const rules = reactive<FormRules>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});

const login = () => {
  loginFormRef.value?.validate((valid) => {
    if (valid) {
      authApi
        .doLogin({
          username: loginForm.username,
          password: getEncryptString(loginForm.password),
          loginType: loginForm.loginType,
        })
        .then((res) => {
          setToken(res.data.token.accessToken);
          setRefreshToken(res.data.token.refreshToken);
          successMsg('登录成功！');
          router.push({ path: '/index' });
        });
    }
  });
};
</script>

<template>
  <div class="login-wrapper">
    <el-card class="login-card">
      <div class="login-card-header">
        <span class="login-card-title">Welcome</span>
      </div>
      <div class="login-card-form">
        <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
          <el-form-item label="" prop="username">
            <el-input
              class="login-card-form__input"
              v-model="loginForm.username"
              placeholder="请输入用户名"
            />
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input
              class="login-card-form__input"
              type="password"
              v-model="loginForm.password"
              placeholder="请输入密码"
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="login-card-btn__wrapper">
        <button class="login-card-btn" @click="login">Let`s go →</button>
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
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background-image: map.get($gradient-heavy-rain, gradient);
  user-select: none; /* 禁止选择文本 */

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

      :deep(.el-form-item__error) {
        padding-top: 8px;
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
          background-color: rgba($morning-mist-blue, 0.3);
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
        box-shadow: 0 4px 0 $bg-color-dark;
        transition: transform 0.1s ease;
        transform: skew(-10deg);
        cursor: pointer;
      }

      .login-card-btn:active {
        letter-spacing: 0;
        transform: skew(-10deg) translateY(8px);
        box-shadow: 0 0 $bg-color-dark;
        transition: none;
      }
    }
  }
}
</style>
