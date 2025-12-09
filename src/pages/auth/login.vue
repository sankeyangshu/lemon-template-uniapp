<template>
  <view class="box-border flex size-full flex-col items-center px-5 text-text">
    <view class="mt-5 mb-7.5">
      <wd-img :width="100" :height="100" src="/static/images/logo.png" />
    </view>

    <wd-form ref="loginFormRef" :model="loginForm" custom-class="grid w-full gap-y-4">
      <view
        class="
          box-border flex h-12.5 w-full rounded-2xl bg-white px-4 py-3
          dark:bg-[#1f1f1f]
        "
      >
        <wd-input
          v-model="loginForm.username"
          prop="username"
          no-border
          :placeholder="$t('login.usernameError')"
          :rules="[{ required: true, message: $t('login.usernameError') }]"
          class="
            flex-1 bg-transparent! text-base
            focus:outline-none
          "
        />
      </view>
      <view
        class="
          box-border flex h-12.5 w-full rounded-2xl bg-white px-4 py-3
          dark:bg-[#1f1f1f]
        "
      >
        <wd-input
          v-model="loginForm.password"
          prop="password"
          show-password
          no-border
          :placeholder="$t('login.passwordError')"
          :rules="[{ required: true, message: $t('login.passwordError') }]"
          class="
            flex-1 bg-transparent! text-base
            focus:outline-none
          "
        />
      </view>

      <wd-button type="primary" size="large" round block :loading="loading" @click="onSubmit">
        {{ $t('login.login') }}
      </wd-button>
    </wd-form>

    <view class="mt-25 flex items-center justify-center">
      <view class="mx-15 i-mdi-wechat text-3xl text-[#83DC42]" />
      <view class="i-mdi-sina-weibo text-3xl text-[#F9221D]" />
      <view class="mx-15 i-mdi-github text-3xl" />
    </view>

    <view
      class="mt-8 flex h-5 items-center justify-center text-sm/5 text-primary"
    >
      <view>{{ $t('login.forgotPassword') }}</view>
      <wd-divider vertical />
      <view>{{ $t('login.registerAccount') }}</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'wot-design-uni/components/wd-form/types';
import { reactive, ref } from 'vue';
import { useToast } from 'wot-design-uni';
import { useRequest } from '@/hooks/use-request';
import { useUserStore } from '@/store/modules/user';

defineOptions({
  name: 'Login',
});

definePage({
  name: 'login',
  style: {
    navigationBarTitleText: '登录',
  },
});

const userStore = useUserStore();

// 表单数据
const loginForm = reactive({
  username: 'admin', // 用户名
  password: '123456', // 密码
});

// 表单实例
const loginFormRef = ref<FormInstance>();

const { run, loading, error } = useRequest(userStore.login);

const toast = useToast();

// 提交表单
function onSubmit() {
  loginFormRef.value!.validate().then(async ({ valid }) => {
    if (valid) {
      await run(loginForm);

      if (error.value) {
        toast.error(error.value.message);
        return;
      }

      // 登录成功,跳转
      uni.navigateBack();
    }
  });
}
</script>
