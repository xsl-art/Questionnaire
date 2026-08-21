import axios from 'axios';
export type ResType = {
  errno: number;
  data?: ResDataType;
  msg?: string;
};
import { message } from 'antd';

export type ResDataType = {
  [key: string]: any;
};

const API_HOST = import.meta.env.VITE_API_HOST || 'http://localhost:3005';

const httpInstance = axios.create({
  baseURL: API_HOST,
  timeout: 5000,
});

httpInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

httpInstance.interceptors.response.use(res => {
  const resData = (res.data || {}) as ResType;
  console.log(resData);
  const { errno, data, msg } = resData;

  if (errno !== 0) {
    if (msg) {
      message.error(msg);
    }
    throw new Error(msg || '请求失败');
  }
  return data as any;
});

export default httpInstance;
