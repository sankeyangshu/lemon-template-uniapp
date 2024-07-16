// 全局类型

/**
 * 网络请求响应格式，T 是具体的接口返回类型数据
 */
interface CustomSuccessData<T> {
  code?: number;
  msg?: string;
  message?: string;
  data: T;
  [keys: string]: any;
}

declare type Recordable<T = any> = Record<string, T>;
