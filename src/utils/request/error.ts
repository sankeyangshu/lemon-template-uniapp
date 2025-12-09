import type { UnError } from '@uni-helper/uni-network';
import { un } from '@uni-helper/uni-network';
import { i18n } from '@/locale';
import { ApiStatus } from './status';

/**
 * 错误响应接口
 */
export interface ErrorResponse {
  /**
   * 错误状态码
   */
  code: number;
  /**
   * 错误消息
   */
  message: string;
  /**
   * 错误附加数据
   */
  data?: unknown;
}

/**
 * 错误日志数据接口
 */
export interface ErrorLogData {
  /**
   * 错误状态码
   */
  code: number;
  /**
   * 错误消息
   */
  message: string;
  /**
   * 错误附加数据
   */
  data?: unknown;
  /**
   * 错误发生时间戳
   */
  timestamp: string;
  /**
   * 请求 URL
   */
  url?: string;
  /**
   * 请求方法
   */
  method?: string;
  /**
   * 错误堆栈信息
   */
  stack?: string;
}

/**
 * 自定义 HttpError 类
 */
export class HttpError extends Error {
  public readonly code: number;
  public readonly data?: unknown;
  public readonly timestamp: string;
  public readonly url?: string;
  public readonly method?: string;

  /**
   * 创建 HTTP 错误实例
   * @param message 消息
   * @param code 状态码
   * @param options 配置项
   * @param options.data 错误数据
   * @param options.url 请求 URL
   * @param options.method 请求方法
   */
  constructor(
    message: string,
    code: number,
    options?: {
      data?: unknown;
      url?: string;
      method?: string;
    },
  ) {
    super(message);
    this.name = 'HTTP Error';
    this.code = code;
    this.data = options?.data;
    this.timestamp = new Date().toISOString();
    this.url = options?.url;
    this.method = options?.method;
  }

  /**
   * 转换为错误日志数据
   * @returns 错误日志数据
   */
  public toLogData(): ErrorLogData {
    return {
      code: this.code,
      message: this.message,
      data: this.data,
      timestamp: this.timestamp,
      url: this.url,
      method: this.method,
      stack: this.stack,
    };
  }
}

/**
 * 获取错误消息
 * @param status 错误状态码
 * @returns 错误消息
 */
function getErrorMessage(status: number) {
  const errorMap: Record<number, string> = {
    [ApiStatus.unauthorized]: 'api.errMsg401',
    [ApiStatus.forbidden]: 'api.errMsg403',
    [ApiStatus.notFound]: 'api.errMsg404',
    [ApiStatus.methodNotAllowed]: 'api.errMsg405',
    [ApiStatus.requestTimeout]: 'api.errMsg408',
    [ApiStatus.internalServerError]: 'api.errMsg500',
    [ApiStatus.notImplemented]: 'api.errMsg501',
    [ApiStatus.badGateway]: 'api.errMsg502',
    [ApiStatus.serviceUnavailable]: 'api.errMsg503',
    [ApiStatus.gatewayTimeout]: 'api.errMsg504',
    [ApiStatus.httpVersionNotSupported]: 'api.errMsg505',
  };

  return i18n.global.t(errorMap[status] || 'api.errMsgDefault');
}

/**
 * 处理错误
 * @param error 错误对象
 */
export function handleError(error: UnError<ErrorResponse>): HttpError {
  // 处理取消的请求
  if (un.isCancel(error)) {
    console.warn('Request cancelled:', error.message);
    throw new HttpError(i18n.global.t('api.requestCancelled'), ApiStatus.error);
  }

  const statusCode = error.response?.status;
  const errorMessage = error.response?.data?.message ?? error.message;
  const requestConfig = error.config;

  // 处理网络错误
  if (!error.response) {
    throw new HttpError(i18n.global.t('api.networkError'), ApiStatus.error, {
      url: requestConfig?.url,
      method: requestConfig?.method?.toUpperCase(),
    });
  }

  // 处理 HTTP 状态码错误
  const message = statusCode !== undefined ? getErrorMessage(statusCode) : errorMessage || i18n.global.t('api.errMsgDefault');

  throw new HttpError(message, statusCode ?? ApiStatus.error, {
    data: error.response.data,
    url: requestConfig?.url,
    method: requestConfig?.method?.toUpperCase(),
  });
}

/**
 * 显示错误消息
 * @param error 错误对象
 * @param showMessage 是否显示错误消息
 */
export function showError(error: HttpError, showMessage: boolean = true) {
  if (showMessage) {
    // 添加错误消息显示
    uni.showToast({
      icon: 'none',
      title: error.message,
    });
  }
  // 记录错误日志
  console.error('[HTTP Error]', error.toLogData());
}

/**
 * 显示成功消息
 * @param message 成功消息
 * @param showMessage 是否显示消息
 */
export function showSuccess(message: string, showMessage: boolean = true) {
  if (showMessage) {
    // 添加成功消息显示
    uni.showToast({
      icon: 'success',
      title: message,
    });
  }
}

/**
 * 判断是否为 HttpError 类型
 * @param error 错误对象
 * @returns 是否为 HttpError 类型
 */
export function isHttpError(error: unknown): error is HttpError {
  return error instanceof HttpError;
}
