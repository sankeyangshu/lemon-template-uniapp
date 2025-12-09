import type { Ref } from 'vue';
import { ref } from 'vue';

/** API 函数类型 */
type ApiFun = (params?: any) => Promise<any>;

/** API 返回类型 */
type ApiReturn<F extends ApiFun> = Awaited<ReturnType<F>>;

/** API 参数类型 */
type ApiParams<F extends ApiFun> = Parameters<F>[0];

/** API 错误类型 */
type ApiError = {
  message: string;
  code?: string | number;
  response?: Response;
  data?: unknown;
} | Error;

/** 请求选项配置 */
interface UseRequestOption<F extends ApiFun, D = ApiReturn<F>, P = ApiParams<F>> {
  /** 初始化数据 */
  initialData?: D;
  /** 默认参数 */
  defaultParams?: P;
  /** 是否立即执行 */
  immediate?: boolean;
  /** 数据格式化 */
  formatter?: (data: ApiReturn<F>) => D;
  /** 请求前回调 */
  beforeRequest?: (params?: P) => boolean | void;
  /** 请求成功回调 */
  onSuccess?: (data: ApiReturn<F>, formattedData: D) => void;
  /** 请求错误回调 */
  onError?: (error: ApiError) => void;
  /** 请求完成回调 */
  onFinally?: () => void;
}

/** 请求返回类型 */
interface UseRequestReturn<D, P> {
  data: Ref<D>;
  loading: Ref<boolean>;
  error: Ref<ApiError | null>;
  run: (params?: P) => Promise<void>;
}

/**
 * 处理异步请求和响应
 * @param requestFun 异步请求的函数
 * @param options 请求选项配置
 */
export function useRequest<F extends ApiFun, D = ApiReturn<F>, P extends ApiParams<F> = ApiParams<F>>(
  requestFun: F,
  options: UseRequestOption<F, D, P> = {},
): UseRequestReturn<D, P> {
  const {
    initialData,
    immediate = false,
    defaultParams,
    formatter,
    beforeRequest,
    onSuccess,
    onError,
    onFinally,
  } = options;

  const data = ref(initialData) as Ref<D>;
  const loading = ref(false);
  const error = ref<ApiError | null>(null);
  const currentRequestId = ref(0);

  const run = async (params?: P) => {
    const requestId = ++currentRequestId.value;

    // 重置错误状态
    error.value = null;
    // 设置加载状态
    loading.value = true;

    // 执行请求前钩子
    const isContinueRequest = beforeRequest?.(params) ?? true;
    if (!isContinueRequest) {
      loading.value = false;
      return;
    }

    try {
      // 请求函数
      const result = await requestFun(params);

      // 检查是否是最新的请求
      if (requestId !== currentRequestId.value) {
        return; // 忽略过期的请求，避免竞态问题
      }

      // 请求结果赋值 - 格式化数据
      if (formatter) {
        data.value = formatter(result);
      } else {
        data.value = result as unknown as D;
      }

      error.value = null;

      // 请求成功回调
      onSuccess?.(result, data.value);
    } catch (err) {
      if (requestId !== currentRequestId.value) {
        return;
      }

      const apiError: ApiError = err instanceof Error
        ? err
        : err != null
          ? { message: String(err), data: err }
          : { message: 'Unknown error' };

      error.value = apiError;
      onError?.(apiError);
    } finally {
      if (requestId === currentRequestId.value) {
        loading.value = false;
        onFinally?.();
      }
    }
  };

  if (immediate) {
    run(defaultParams);
  }

  return { loading, error, data, run };
}
