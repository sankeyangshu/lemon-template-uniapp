/**
 * Namespace Env
 * 声明 import.meta 对象的类型
 */
declare namespace Env {
  /**
   * 声明 import.meta 对象的类型
   */
  interface ImportMeta extends ImportMetaEnv {
    /**
     * 应用标题
     */
    readonly VITE_APP_TITLE: string;
    /**
     * 开发或生产时，服务的基础公共路径
     */
    readonly VITE_BASE_URL: string;
    /**
     * 是否删除 console
     */
    readonly VITE_DROP_CONSOLE: boolean;
    /**
     * 应用基础路径 - h5 端使用
     */
    readonly VITE_APP_PUBLIC_BASE: string;
    /**
     * 应用端口
     */
    readonly VITE_PORT: number;
    /**
     * 国际化默认语言
     */
    readonly VITE_FALLBACK_LOCALE: string;
    /**
     * 微信小程序 appid
     */
    readonly VITE_WX_APPID: string;
    /**
     * uni-app appid
     */
    readonly VITE_UNI_APPID: string;
    /**
     * 跨域代理配置
     */
    readonly VITE_PROXY: [string, string][];
    /**
     * 后端服务基础 URL
     */
    readonly VITE_SERVICE_BASE_URL: string;
    /**
     * 用于区分不同域的存储
     */
    readonly VITE_STORAGE_PREFIX?: string;
  }
}

interface ImportMeta {
  readonly env: Env.ImportMeta;
}
