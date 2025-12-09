import { http } from '@/utils/request';

/**
 * 登录请求参数类型
 */
export interface LoginData {
  username: string;
  password: string;
}

/**
 * 登录返回参数类型
 */
export interface LoginResponse {
  user: UserInfo;
  token: string;
}

/**
 * 用户信息类型
 */
export interface UserInfo {
  id: number;
  username: string;
  phone: string;
  nickname: string;
  avatar: string;
  sign?: string;
}

// api接口
const api = {
  example: '/example', // 示例接口
  login: '/auth/login', // 用户登录接口
};

/**
 * 获取示例数据
 * @returns 示例数据
 */
export function getExampleAPI() {
  return http.get<{ content: string; date: number }>(api.example);
}

/**
 * 用户登录
 * @param data 登录请求参数
 * @returns 登录结果
 */
export function postLoginAPI(data: LoginData) {
  return http.post<LoginResponse>(api.login, data);
}
