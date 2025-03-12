<route lang="json5">
{
  layout: 'tabbar',
  name: 'mine',
  style: {
    navigationBarTitleText: '我的',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view class="wh-full">
    <wd-img
      width="100%"
      mode="widthFix"
      src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
    />

    <view
      class="relative mx-32rpx mb-20rpx flex-y-center rounded-20rpx bg-[--color-background-2] p-30rpx -mt-90rpx"
    >
      <wd-img
        :width="50"
        :height="50"
        round
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      />
      <view v-if="!isLogin" class="ml-20rpx flex-1" @click="onClickLogin">
        <view class="mb-4rpx text-40rpx">{{ $t('login.login') }}/{{ $t('login.register') }}</view>
      </view>
      <view v-else class="ml-20rpx flex-1">
        <view class="mb-4rpx text-40rpx">三棵杨树</view>
        <view class="truncate text-28rpx color-[--color-text]">
          从来没有真正的绝境，只有心灵的迷途
        </view>
      </view>
    </view>

    <view class="my-32rpx px-32rpx">
      <wd-cell-group border>
        <wd-cell :title="$t('route.themeSetting')" is-link to="/pages/themeSetting/index">
          <template #icon>
            <view class="leading-48rpx">
              <view class="i-mdi-palette mr-10rpx text-36rpx"></view>
            </view>
          </template>
        </wd-cell>
        <wd-cell :title="$t('mine.projectDocs')" is-link @click="onClickOpenDocs">
          <template #icon>
            <view class="leading-48rpx">
              <view class="i-mdi-book-open-variant mr-10rpx text-36rpx"></view>
            </view>
          </template>
        </wd-cell>
        <wd-cell v-if="isLogin" :title="$t('mine.logout')" is-link @click="onClickLogout">
          <template #icon>
            <view class="leading-48rpx">
              <view class="i-mdi-logout mr-10rpx text-36rpx"></view>
            </view>
          </template>
        </wd-cell>
      </wd-cell-group>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useRouter } from 'uni-mini-router';
import { computed } from 'vue';
import { useUserStore } from '@/store/modules/user';

const userStore = useUserStore();
const isLogin = computed(() => !!userStore.userState.token);

const router = useRouter();

const onClickLogin = () => {
  router.push('/pages/login/index');
};

const onClickOpenDocs = () => {
  uni.setClipboardData({
    data: 'https://sankeyangshu.github.io/lemon-template-docs/uniapp/',
    success: () => {
      uni.showToast({
        title: '链接已复制到剪贴板',
        icon: 'none',
      });
    },
  });
};

const onClickLogout = () => {
  uni.showModal({
    title: '提示',
    content: '确定退出登录吗？',
    success(res) {
      if (res.confirm) {
        userStore.logout();
      }
    },
  });
};
</script>

<style lang="scss" scoped></style>
