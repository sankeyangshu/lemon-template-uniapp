<template>
  <view class="box-border flex size-full flex-col items-center justify-center px-6 pt-safe">
    <view class="mx-auto mt-25 size-50">
      <image class="block size-full" alt="logo" src="/static/images/logo.png" />
    </view>

    <view class="my-2.5 box-border w-full rounded-xl px-5 py-3 text-base">
      <view class="flex items-center justify-center leading-8" @click="onClickOpenGithub">
        <view
          class="
            mr-2 font-bold text-black
            dark:text-white
          "
        >
          Lemon-Template-UniApp
        </view>
        <wd-icon
          name="github-filled" size="22px" class="
            text-black
            dark:text-white
          "
        />
      </view>
      <view class="mt-3 mb-1.5 text-sm leading-6 text-text">
        {{ $t('home.info') }}
      </view>
    </view>

    <view class="mt-4 grid w-full gap-3 pb-6 text-center text-sm">
      <view
        v-for="item in contentList"
        :key="item"
        class="
          box-border w-full truncate rounded-xl border border-solid border-[#424242] p-3 text-text
        "
      >
        {{ item }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

defineOptions({
  name: 'Home',
});

definePage({
  type: 'home',
  style: {
    navigationBarTitleText: '首页',
  },
});

const { t } = useI18n();

const contentList = computed(() => [
  `⚡ ${t('home.vue')}`,
  `🍕 ${t('home.typescript')}`,
  `🍍 ${t('home.pinia')}`,
  `🌀 ${t('home.tailwindcss')}`,
  `🌠 ${t('home.setup')}`,
  `🎉 ${t('home.utils')}`,
  `📡 ${t('home.axios')}`,
  `👏 ${t('home.icons')}`,
  `🔧 ${t('home.eslint')}`,
  `🎨 ${t('home.git')}`,
  `🌓 ${t('home.theme')}`,
  `🔒 ${t('home.auth')}`,
]);

function onClickOpenGithub() {
  uni.setClipboardData({
    data: 'https://github.com/sankeyangshu/lemon-template-uniapp',
    success: () => {
      uni.showToast({
        title: '链接已复制',
        icon: 'none',
      });
    },
  });
}
</script>
