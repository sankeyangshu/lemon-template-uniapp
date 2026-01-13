<template>
  <!-- 内容区域 -->
  <slot />

  <!-- 底部导航栏 -->
  <wd-tabbar
    :model-value="activeTabbar.path"
    fixed
    :bordered="false"
    safe-area-inset-bottom
    placeholder
    @change="onChangeTabbar"
  >
    <wd-tabbar-item
      v-for="item in tabbarList"
      :key="item.path"
      :name="item.path"
      :title="item.title"
      :value="getTabbarItemValue(item.path)"
      :icon="item.icon"
    />
  </wd-tabbar>
</template>

<script lang="ts" setup>
import { useRoute } from '@wot-ui/router';
import { watch } from 'vue';
import { useTabbar } from '@/hooks/use-tabbar';

defineOptions({
  addGlobalClass: true,
  virtualHost: true,
  styleIsolation: 'shared',
});

const { tabbarList, activeTabbar, getTabbarItemValue, setTabbarActiveByPath } = useTabbar();

const route = useRoute();

// 监听路由变化，自动更新 tabbar 激活状态
watch(
  () => route.path,
  (newPath) => {
    if (newPath && newPath !== activeTabbar.value.path) {
      setTabbarActiveByPath(newPath);
    }
  },
  { immediate: true },
);

/**
 * 切换 tabbar
 */
function onChangeTabbar({ value }: { value: string }) {
  uni.switchTab({
    url: value,
  });
}
</script>
