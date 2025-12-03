// 扩展 @uni-helper/vite-plugin-uni-pages 的 definePage 参数类型
declare module '@uni-helper/vite-plugin-uni-pages' {
  interface UserPageMeta {
    /**
     * 使用 type: "home" 属性设置首页，其他页面不需要设置，默认为page
     */
    type?: 'home';
    /**
     * 页面布局类型, 模板默认只有 default, 如果在 src/layouts 下新增了 layout, 可以扩展当前属性
     * @default 'default'
     *
     * 当前属性供 https://github.com/uni-helper/vite-plugin-uni-layouts 插件使用
     */
    layout?: 'default';
  }
}

export {};
