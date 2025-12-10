import type { ResponseData } from '@/utils/request';
import { ref } from 'vue';
import { i18n } from '@/locale';
import { HttpError } from '@/utils/request/error';
import { ApiStatus } from '@/utils/request/status';

/**
 * 上传文件的base url
 */
const VITE_UPLOAD_BASEURL = import.meta.env.VITE_SERVICE_BASE_URL;

type Media = 'image' | 'file';
type Image = 'png' | 'jpg' | 'jpeg' | 'webp' | '*';
type File = 'doc' | 'docx' | 'ppt' | 'zip' | 'xls' | 'xlsx' | 'txt' | Image;

/**
 * 上传结果数据类型
 * 根据实际业务需要调整此类型
 */
export interface UploadResultData {
  /** 文件URL */
  url: string;
  /** 文件名 */
  name?: string;
  /** 文件大小 */
  size?: number;
  /** 其他自定义字段 */
  [key: string]: any;
}

/** 文件信息 */
interface FileInfo {
  /** 临时文件路径 */
  tempFilePath: string;
  /** 文件大小 */
  size: number;
  /** 文件名称 */
  name?: string;
  /** 文件类型 */
  type?: string;
}

/** 上传选项 */
interface UseUploadOptions<T extends Media> {
  /** 上传接口地址 */
  url?: string;
  /** 额外的表单数据 */
  formData?: Record<string, any>;
  /** 最大文件大小，单位字节 */
  maxSize?: number;
  /** 允许的文件类型 */
  accept?: T extends 'image' ? Image[] : File[];
  /** 最多选择文件数量 */
  count?: number;
  /** 文件类型 */
  fileType?: T;
  /** 文件扩展名过滤 */
  extension?: string[];
  /** 请求成功回调 */
  onSuccess?: (data: any) => void;
  /** 请求错误回调 */
  onError?: (err: HttpError) => void;
  /** 进度回调 */
  onProgress?: (progress: number) => void;
  /** 完成回调 */
  onComplete?: () => void;
}

export function useUpload<T extends Media>(options: UseUploadOptions<T> = {}) {
  const {
    url = VITE_UPLOAD_BASEURL,
    formData = {},
    maxSize = 5 * 1024 * 1024,
    accept = [],
    count = 9,
    fileType = 'image',
    extension = [],
    onSuccess,
    onError,
    onProgress,
    onComplete,
  } = options;

  const loading = ref(false);
  const error = ref<HttpError | null>(null);
  const data = ref<UploadResultData[] | null>(null);
  const progress = ref(0);
  const uploadTask = ref<UniApp.UploadTask | null>(null); // 上传任务

  /**
   * 文件验证
   * @param file 文件
   * @returns 验证结果
   */
  const validateFile = (file: FileInfo) => {
    if (file.size > maxSize) {
      const errorMsg = i18n.global.t('upload.fileSizeExceeded', { size: (maxSize / 1024 / 1024).toFixed(2) });
      uni.showToast({
        title: errorMsg,
        icon: 'none',
      });
      throw new HttpError(errorMsg, ApiStatus.error);
    }

    if (accept.length > 0 && !accept.includes('*')) {
      // 文件后缀
      const ext = file.name?.split('.').pop()?.toLowerCase()
        || file.tempFilePath.split('.').pop()?.toLowerCase();

      const isValid = accept.some((type) =>
        type === '*' || type.toLowerCase() === ext,
      );

      if (!isValid) {
        const errorMsg = i18n.global.t('upload.fileFormatNotSupported', { formats: accept.join(', ') });
        uni.showToast({ title: errorMsg, icon: 'none' });
        throw new HttpError(errorMsg, ApiStatus.error);
      }
    }

    return true;
  };

  /**
   * 选择文件
   */
  const chooseFiles = () => {
    return new Promise<FileInfo[]>((resolve, reject) => {
      if (fileType === 'image') {
        uni.chooseMedia({
          count,
          mediaType: ['image'],
          success: (res) => {
            const files: FileInfo[] = res.tempFiles.map((item) => ({
              tempFilePath: item.tempFilePath,
              size: item.size,
              type: item.fileType,
            }));
            resolve(files);
          },
          fail: (err) => {
            const error = new HttpError(err.errMsg || i18n.global.t('upload.selectImageFailed'), ApiStatus.error);
            reject(error);
          },
        });
      } else {
        uni.chooseFile({
          count,
          extension,
          success: (res) => {
            const files: FileInfo[] = Array.isArray(res.tempFiles)
              ? res.tempFiles.map((item: any) => ({
                  tempFilePath: item.path,
                  size: item.size,
                  name: item.name,
                  type: item.type,
                }))
              : [];
            resolve(files);
          },
          fail: (err) => {
            const error = new HttpError(err.errMsg || i18n.global.t('upload.selectFileFailed'), ApiStatus.error);
            reject(error);
          },
        });
      }
    });
  };

  /**
   * 上传单个文件
   */
  const uploadSingleFile = (file: FileInfo) => {
    return new Promise<UploadResultData>((resolve, reject) => {
      uploadTask.value = uni.uploadFile({
        url,
        filePath: file.tempFilePath,
        name: 'file',
        formData: {
          ...formData,
          fileName: file.name,
          fileSize: file.size.toString(),
          fileType: file.type,
        },
        success: (res) => {
          try {
            // 检查 HTTP 状态码
            if (res.statusCode !== 200) {
              const error = new HttpError(
                i18n.global.t('upload.uploadFailedWithStatus', { status: res.statusCode }),
                res.statusCode,
                { url, method: 'UPLOAD' },
              );
              reject(error);
              return;
            }

            // 解析响应数据 - res.data 的结构是 { code, message, data }
            const responseData: ResponseData<UploadResultData> = typeof res.data === 'string'
              ? JSON.parse(res.data)
              : res.data;

            // 检查业务状态码
            if (responseData.code !== ApiStatus.success) {
              const error = new HttpError(
                responseData.message || i18n.global.t('upload.uploadFailed'),
                responseData.code,
                { data: responseData, url, method: 'UPLOAD' },
              );
              reject(error);
              return;
            }

            // 返回实际的业务数据
            resolve(responseData.data as UploadResultData);
          } catch (err) {
            const error = new HttpError(
              err instanceof Error ? err.message : i18n.global.t('upload.dataParseError'),
              ApiStatus.error,
              { url, method: 'UPLOAD' },
            );
            reject(error);
          }
        },
        fail: (err) => {
          const error = new HttpError(
            err.errMsg || i18n.global.t('upload.uploadFailed'),
            ApiStatus.error,
            { url, method: 'UPLOAD' },
          );
          reject(error);
        },
      });

      uploadTask.value.onProgressUpdate((res) => {
        progress.value = res.progress;
        onProgress?.(res.progress);
      });
    });
  };

  /**
   * 批量上传
   */
  const uploadFiles = async (files: FileInfo[]): Promise<UploadResultData[]> => {
    const uploadResults: UploadResultData[] = [];
    const errors: HttpError[] = [];

    for (let i = 0; i < files.length; i++) {
      try {
        const result = await uploadSingleFile(files[i]);
        // result 已经是解析后的业务数据
        uploadResults.push(result);

        // 更新整体进度
        const overallProgress = Math.round(((i + 1) / files.length) * 100);
        progress.value = overallProgress;
        onProgress?.(overallProgress);
      } catch (err) {
        const error = err instanceof HttpError
          ? err
          : new HttpError(
              err instanceof Error ? err.message : i18n.global.t('upload.uploadFailed'),
              ApiStatus.error,
            );
        errors.push(error);
        console.error(`文件 ${i + 1} 上传失败:`, error.toLogData());
      }
    }

    // 如果有错误，抛出第一个错误
    if (errors.length > 0 && uploadResults.length === 0) {
      throw errors[0];
    }

    // 如果部分失败，在控制台警告
    if (errors.length > 0) {
      console.warn(`${errors.length}/${files.length} 个文件上传失败`);
    }

    // 返回业务数据数组
    return uploadResults;
  };

  const run = async () => {
    try {
      loading.value = true;
      error.value = null;
      progress.value = 0;

      const files = await chooseFiles();

      // 验证所有文件
      const validFiles: FileInfo[] = [];
      for (const file of files) {
        try {
          if (validateFile(file)) {
            validFiles.push(file);
          }
        } catch (err) {
          // 验证失败，记录错误但继续处理其他文件
          if (err instanceof HttpError) {
            console.error('文件验证失败:', err.toLogData());
          }
        }
      }

      if (validFiles.length === 0) {
        loading.value = false;
        const noValidFilesError = new HttpError(i18n.global.t('upload.noValidFiles'), ApiStatus.error);
        error.value = noValidFilesError;
        onError?.(noValidFilesError);
        return;
      }

      const results = await uploadFiles(validFiles);
      data.value = results;

      onSuccess?.(results);
    } catch (err) {
      const currentError = err instanceof HttpError
        ? err
        : new HttpError(
            err instanceof Error ? err.message : i18n.global.t('upload.uploadFailed'),
            ApiStatus.error,
          );
      error.value = currentError;
      onError?.(currentError);
    } finally {
      loading.value = false;
      uploadTask.value = null;
      onComplete?.();
    }
  };

  /**
   * 重置
   */
  const reset = () => {
    loading.value = false;
    error.value = null;
    data.value = null;
    progress.value = 0;
    if (uploadTask.value) {
      uploadTask.value.abort();
      uploadTask.value = null;
    }
  };

  /**
   * 取消
   */
  const abort = () => {
    if (uploadTask.value) {
      uploadTask.value.abort();
      uploadTask.value = null;
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    data,
    progress,
    run,
    reset,
    abort,
  };
}
