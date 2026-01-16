import { computed, ref } from 'vue';
import { i18n } from '@/locale';

export interface TabbarItem {
  path: string;
  i18nKey: string;
  value?: number;
  active: boolean;
  title: string;
  icon: string;
}

const tabbarItems = ref<TabbarItem[]>([
  {
    icon: 'home',
    title: '首页',
    i18nKey: 'home',
    path: '/pages/home/index',
    active: true,
  },
  {
    icon: 'a-controlplatform',
    title: '示例',
    i18nKey: 'example',
    path: '/pages/example/index',
    active: false,
  },
  {
    icon: 'user',
    title: '我的',
    i18nKey: 'mine',
    path: '/pages/mine/index',
    active: false,
  },
]);

export function useTabbar() {
  /**
   * tabbar列表
   */
  const tabbarList = computed(() => {
    return tabbarItems.value.map((item) => ({
      ...item,
      title: i18n.global.t(`route.${item.i18nKey}`),
    }));
  });

  /**
   * 当前激活的tabbar
   */
  const activeTabbar = computed(() => {
    const activeItem = tabbarItems.value.find((item) => item.active);
    return activeItem || tabbarItems.value[0];
  });

  /**
   * 获取tabbar item.value
   * @param path 路径标识符
   */
  const getTabbarItemValue = (path: string) => {
    const tabbarItem = tabbarItems.value.find((item) => item.path === path);
    return tabbarItem && tabbarItem.value ? tabbarItem.value : null;
  };

  /**
   * 设置tabbar item
   * @param path 路径标识符
   * @param value 值
   */
  const setTabbarItem = (path: string, value: number) => {
    const tabbarItem = tabbarItems.value.find((item) => item.path === path);
    if (tabbarItem) {
      tabbarItem.value = value;
    }
  };

  /**
   * 根据路径设置 tabbar 激活状态
   * @param path 页面路径
   */
  const setTabbarActiveByPath = (path: string) => {
    tabbarItems.value.forEach((item) => {
      item.active = item.path === path;
    });
  };

  return {
    tabbarList,
    activeTabbar,
    getTabbarItemValue,
    setTabbarItem,
    setTabbarActiveByPath,
  };
}
