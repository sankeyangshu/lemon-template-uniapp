<template>
  <!-- 内容区域 -->
  <slot />

  <!-- 底部导航栏 -->
  <wd-tabbar
    :model-value="activeTabbar.name"
    fixed
    :bordered="false"
    safe-area-inset-bottom
    placeholder
    @change="onChangeTabbar"
  >
    <wd-tabbar-item
      v-for="item in tabbarList" :key="item.name"
      :name="item.name"
      :title="item.title"
      :value="getTabbarItemValue(item.name)"
      :icon="item.icon"
    />
  </wd-tabbar>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'uni-mini-router';
import { nextTick, onMounted } from 'vue';
import { useTabbar } from '@/hooks/use-tabbar';

defineOptions({
  addGlobalClass: true,
  virtualHost: true,
  styleIsolation: 'shared',
});

const router = useRouter();
const route = useRoute();

const { tabbarList, activeTabbar, getTabbarItemValue, setTabbarItemActive } = useTabbar();

onMounted(() => {
  nextTick(() => {
    if (route.name && route.name !== activeTabbar.value.name) {
      setTabbarItemActive(route.name);
    }
  });
});

function onChangeTabbar({ value }: { value: string }) {
  setTabbarItemActive(value);
  router.pushTab({ name: value });
}
</script>
