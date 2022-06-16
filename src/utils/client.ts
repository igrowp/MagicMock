/**
 * @file 接口请求
 * @author wutong (wutong25@baidu.com)
 */

import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
export type {AxiosResponse};

const request = axios.create({
  baseURL: '/api',
  timeout: 60000
});
// 请求拦截器
const requestInterceptor = (req: AxiosRequestConfig) => {
  return req;
};

// 响应拦截器
const responseInterceptor = (res: AxiosResponse<any>): any => {
  return res.data;
};

// 响应异常拦截器
const responseErrorInterceptor = (error: any) => {
  return Promise.reject(error);
};

request.interceptors.request.use(requestInterceptor);
request.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

export default request;
