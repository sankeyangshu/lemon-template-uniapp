<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  layout: 'tabbar',
  name: 'home',
  style: {
    navigationBarTitleText: '首页',
  },
}
</route>

<template>
  <view class="box-border wh-full flex-center px-24rpx">
    <view class="wh-full">
      <view class="mx-auto mb-80rpx mt-200rpx h-200rpx w-200rpx">
        <image class="block wh-full" alt="logo" src="/static/images/logo.png" />
      </view>
      <view
        class="my-20rpx box-border w-full rounded-24rpx bg-[var(--color-block-background)] px-40rpx py-24rpx text-36rpx"
      >
        <view class="flex-center leading-70rpx" @click="onClickOpenGithub">
          <view class="mr-16rpx font-bold">Lemon-Template-Uniapp</view>
          <wd-icon name="github-filled" size="22px"></wd-icon>
        </view>
        <view class="mb-12rpx mt-24rpx text-28rpx leading-48rpx">
          {{ $t('home.info') }}
        </view>
      </view>

      <view class="grid mt-32rpx gap-24rpx pb-48rpx text-center text-28rpx">
        <view
          v-for="item in contentList"
          :key="item"
          class="box-border w-full truncate border border-[var(--color-border)] rounded-24rpx border-solid p-24rpx"
        >
          {{ item }}
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const contentList = computed(() => [
  `⚡ ${t('home.vue')}`,
  `🍕 ${t('home.typescript')}`,
  `🍍 ${t('home.pinia')}`,
  `🌀 ${t('home.unocss')}`,
  `🌠 ${t('home.setup')}`,
  `🎉 ${t('home.utils')}`,
  `📡 ${t('home.axios')}`,
  `👏 ${t('home.icons')}`,
  `🔧 ${t('home.eslint')}`,
  `🎨 ${t('home.git')}`,
  `🌓 ${t('home.theme')}`,
  `🔒 ${t('home.auth')}`,
]);

const onClickOpenGithub = () => {
  uni.setClipboardData({
    data: 'https://github.com/sankeyangshu/lemon-template-uniapp',
    success: () => {
      uni.showToast({
        title: '链接已复制',
        icon: 'none',
      });
    },
  });
};
</script>

<style lang="scss" scoped></style>
