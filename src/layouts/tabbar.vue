<template>
  <wd-config-provider :theme="darkMode">
    <view
      class="min-h-screen min-w-screen"
      :class="darkMode === 'dark' ? 'layout-dark' : 'layout-light'"
    >
      <!-- 内容区域 -->
      <slot></slot>

      <!-- 底部导航栏 -->
      <wd-tabbar
        :model-value="activeTabbar.name"
        inactive-color="#999999"
        active-color="#4D80F0"
        fixed
        bordered
        safe-area-inset-bottom
        placeholder
        @change="onChangeTabbar"
      >
        <template v-for="item in tabbarList" :key="item.name">
          <wd-tabbar-item
            :name="item.name"
            :title="item.title"
            :value="getTabbarItemValue(item.name)"
          >
            <template #icon="{ active: iconActive }">
              <wd-icon v-if="iconActive" :name="item.selectedIcon" size="20px" />
              <wd-icon v-else :name="item.icon" size="20px" />
            </template>
          </wd-tabbar-item>
        </template>
      </wd-tabbar>

      <!-- 通知组件 -->
      <wd-toast />
      <wd-message-box />
    </view>
  </wd-config-provider>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'uni-mini-router';
import { nextTick, onMounted } from 'vue';
import { useTabbar } from '@/hooks/useTabbar';
import { useSettingStore } from '@/store/modules/setting';

const settingStore = useSettingStore();
const { darkMode } = storeToRefs(settingStore);

const router = useRouter();
const route = useRoute();

const { activeTabbar, getTabbarItemValue, setTabbarItemActive, tabbarList } = useTabbar();

onMounted(() => {
  nextTick(() => {
    if (route.name && route.name !== activeTabbar.value.name) {
      setTabbarItemActive(route.name);
    }
  });
});

const onChangeTabbar = ({ value }: { value: string }) => {
  setTabbarItemActive(value);
  router.pushTab({ name: value });
};
</script>

<style lang="scss">
.layout-light {
  --color-text: #323233;
  --color-background: #f0f2f5;
  --color-background-2: #ffffff;
  --color-block-background: #ffffff;
  --color-border: #ebedf0;

  color: var(--color-text);
  background-color: var(--color-background);
}

.layout-dark {
  --color-text: #f5f5f5;
  --color-background: #222222;
  --color-background-2: #1c1c1e;
  --color-block-background: #3a3a3c;
  --color-border: #3a3a3c;

  color: var(--color-text);
  background-color: var(--color-background);
}
</style>
