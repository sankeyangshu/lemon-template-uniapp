import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages';

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: 'Uniapp-Template',
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTextStyle: 'black',
    backgroundColor: '#FFFFFF',
    h5: {
      navigationStyle: 'custom',
    },
  },
});
