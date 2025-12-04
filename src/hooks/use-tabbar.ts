import { computed, ref } from 'vue';
import { i18n } from '@/locale';

export interface TabbarItem {
  name: string;
  value?: number;
  active: boolean;
  title: string;
  icon: string;
}

const tabbarItems = ref<TabbarItem[]>([
  {
    icon: 'home',
    title: '首页',
    name: 'home',
    active: true,
  },
  {
    icon: 'a-controlplatform',
    title: '示例',
    name: 'example',
    active: false,
  },
  {
    icon: 'user',
    title: '我的',
    name: 'mine',
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
      title: i18n.global.t(`route.${item.name}`),
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
   * @param name 唯一标识符
   * @returns
   */
  const getTabbarItemValue = (name: string) => {
    const tabbarItem = tabbarItems.value.find((item) => item.name === name);
    return tabbarItem && tabbarItem.value ? tabbarItem.value : null;
  };

  /**
   * 设置tabbar item
   * @param name 唯一标识符
   * @param value 值
   */
  const setTabbarItem = (name: string, value: number) => {
    const tabbarItem = tabbarItems.value.find((item) => item.name === name);
    if (tabbarItem) {
      tabbarItem.value = value;
    }
  };

  /**
   * 设置tabbar item 激活状态
   * @param name 唯一标识符
   */
  const setTabbarItemActive = (name: string) => {
    tabbarItems.value.forEach((item) => {
      if (item.name === name) {
        item.active = true;
      } else {
        item.active = false;
      }
    });
  };

  return {
    tabbarList,
    activeTabbar,
    getTabbarItemValue,
    setTabbarItem,
    setTabbarItemActive,
  };
}
