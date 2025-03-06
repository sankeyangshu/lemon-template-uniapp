<route lang="json5">
{
  style: {
    navigationBarTitleText: '登录',
  },
}
</route>

<template>
  <view class="box-border wh-full flex-y-center flex-col p-40rpx">
    <view class="mb-60rpx mt-40rpx">
      <wd-img :width="100" :height="100" src="/static/images/logo.png" />
    </view>

    <wd-form ref="loginFormRef" :model="loginForm" custom-class="w-full">
      <view
        class="mb-40rpx overflow-hidden rounded-40rpx shadow-[0_0_60rpx_0_#2B56701A] dark:shadow-[0_0_60rpx_0_#18181c1A]"
      >
        <wd-input
          v-model="loginForm.username"
          prop="username"
          no-border
          :placeholder="$t('login.usernameError')"
          :rules="[{ required: true, message: $t('login.usernameError') }]"
          custom-class="login-input"
        />
      </view>
      <view
        class="mb-40rpx overflow-hidden rounded-40rpx shadow-[0_0_60rpx_0_#2B56701A] dark:shadow-[0_0_60rpx_0_#18181c1A]"
      >
        <wd-input
          v-model="loginForm.password"
          prop="password"
          show-password
          no-border
          :placeholder="$t('login.passwordError')"
          :rules="[{ required: true, message: $t('login.passwordError') }]"
          custom-class="login-input"
        />
      </view>

      <wd-button type="primary" size="large" :loading="loading" round block @click="onClickSubmit">
        {{ $t('login.login') }}
      </wd-button>
    </wd-form>

    <view class="mt-200rpx flex-center">
      <view class="i-mdi-wechat mx-120rpx text-64rpx color-[#83DC42]" />
      <view class="i-mdi-sina-weibo text-64rpx color-[#F9221D]" />
      <view class="i-mdi-github mx-120rpx text-64rpx" />
    </view>

    <view
      class="mt-64rpx h-40rpx flex-center text-28rpx color-[var(--wot-color-theme)] leading-40rpx"
    >
      <view>{{ $t('login.forgotPassword') }}</view>
      <view class="mx-30rpx">|</view>
      <view>{{ $t('login.registerAccount') }}</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useUserStore } from '@/store/modules/user';

// 表单数据
const loginForm = reactive({
  username: 'admin', // 用户名
  password: '123456', // 密码
});

// 按钮加载状态
const loading = ref(false);

// 表单实例
const loginFormRef = ref();

// 用户信息
const userStore = useUserStore();

const onClickSubmit = () => {
  loginFormRef.value.validate().then(async ({ valid }) => {
    if (valid) {
      try {
        loading.value = true; // 按钮进入加载状态
        // 登录
        await userStore.login(loginForm);
        uni.navigateBack();
      } finally {
        loading.value = false; // 关闭按钮加载状态
      }
    }
  });
};
</script>

<style lang="scss" scoped>
:deep(.login-input) {
  padding: 20rpx 40rpx;
  box-sizing: border-box;
}
</style>
