import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages';

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: 'Lemon-Template-Uniapp',
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTextStyle: 'black',
    backgroundColor: '#FFFFFF',
    h5: {
      navigationStyle: 'custom',
    },
  },
  easycom: {
    autoscan: true,
    custom: {
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
    },
  },
  tabBar: {
    color: '#999999',
    selectedColor: '#4D80F0',
    backgroundColor: '#F8F8F8',
    borderStyle: 'black',
    height: '50px',
    fontSize: '10px',
    iconWidth: '24px',
    spacing: '3px',
    list: [
      {
        iconPath: 'static/tabbar/home.png',
        selectedIconPath: 'static/tabbar/home-active.png',
        pagePath: 'pages/home/index',
        text: '首页',
      },
      {
        iconPath: 'static/tabbar/example.png',
        selectedIconPath: 'static/tabbar/example-active.png',
        pagePath: 'pages/example/index',
        text: '示例',
      },
      {
        iconPath: 'static/tabbar/mine.png',
        selectedIconPath: 'static/tabbar/mine-active.png',
        pagePath: 'pages/mine/index',
        text: '我的',
      },
    ],
  },
});
