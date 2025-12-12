<template>
  <view class="size-full text-text">
    <wd-img
      width="100%"
      mode="widthFix"
      src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
    />

    <view
      class="
        relative mx-4 -mt-10 mb-2.5 flex items-center rounded-lg bg-white p-4
        dark:bg-[#1C1C1E]
      "
    >
      <wd-img
        :width="50"
        :height="50"
        round
        :src="isLogin ? userInfo?.avatar : 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'"
      />
      <view v-if="!isLogin" class="ml-2.5 flex-1">
        <view class="ml-2.5 flex-1 text-xl" @click="onClickLogin">
          {{ $t('login.login') }}
        </view>
      </view>
      <view v-else class="ml-2.5 flex-1">
        <view class="mb-0.5 text-xl">
          {{ userInfo?.nickname }}
        </view>
        <view class="truncate text-sm">
          {{ userInfo?.sign }}
        </view>
      </view>
    </view>

    <view class="box-border px-4">
      <wd-cell-group border>
        <wd-cell :title="$t('route.themeSetting')" is-link to="/pages/mine/settings">
          <template #icon>
            <view class="mr-2.5 i-mdi-palette text-xl" />
          </template>
        </wd-cell>
        <wd-cell :title="$t('mine.projectDocs')" is-link @click="onClickOpenDocs">
          <template #icon>
            <view class="mr-2.5 i-mdi-book-open-variant text-xl" />
          </template>
        </wd-cell>
        <wd-cell v-if="isLogin" :title="$t('mine.logout')" is-link @click="onClickLogout">
          <template #icon>
            <view class="mr-2.5 i-mdi-logout text-xl" />
          </template>
        </wd-cell>
      </wd-cell-group>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useMessage } from 'wot-design-uni';
import { useUserStore } from '@/store/modules/user';

defineOptions({
  name: 'Mine',
});

definePage({
  name: 'mine',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '我的',
    navigationStyle: 'custom',
  },
});

const userStore = useUserStore();
const { isLogin, userInfo } = storeToRefs(userStore);

const { t } = useI18n();

function onClickLogin() {
  uni.navigateTo({
    url: '/pages/auth/login',
  });
}

function onClickOpenDocs() {
  uni.setClipboardData({
    data: 'https://sankeyangshu.github.io/lemon-template-docs/uniapp/',
    success: () => {
      uni.showToast({
        title: t('mine.linkCopied'),
        icon: 'none',
      });
    },
  });
}

const message = useMessage();

function onClickLogout() {
  message
    .confirm({
      msg: t('mine.logoutTips'),
      title: t('settings.tips'),
    })
    .then(() => {
      userStore.logout();
    })
    .catch(() => {
    });
}
</script>
