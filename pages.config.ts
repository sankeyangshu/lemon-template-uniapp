import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages';

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: 'Lemon-Mobile-UniApp',
    navigationBarBackgroundColor: '@navBgColor',
    navigationBarTextStyle: '@navTxtStyle',
    backgroundColor: '@bgColor',
    backgroundTextStyle: '@bgTxtStyle',
    backgroundColorTop: '@bgColorTop',
    backgroundColorBottom: '@bgColorBottom',
    h5: {
      navigationStyle: 'custom',
    },
  },
  tabBar: {
    color: '@tabColor',
    selectedColor: '@tabSelectedColor',
    backgroundColor: '@tabBgColor',
    borderStyle: '@tabBorderStyle',
    height: '50px',
    custom: true,
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
      },
      {
        pagePath: 'pages/example/index',
        text: '示例',
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
      },
    ],
  },
});
