/**
 * @file 接口请求
 * @author wutong (wutong25@baidu.com)
 */

import {notification} from 'antd';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {get} from 'lodash';
export type {AxiosResponse};

const request = axios.create({
  baseURL: '/api',
  timeout: 60000
});
// 请求拦截器
const requestInterceptor = (req: AxiosRequestConfig) => {
  const token = localStorage.getItem('__token');
  (req.headers?.common as any)['Authorization'] = `Bearer ${token}`;
  return req;
};

// 响应拦截器
const responseInterceptor = (res: AxiosResponse<any>): any => {
  return res.data.data;
};

// 响应异常拦截器
const responseErrorInterceptor = (error: any) => {
  const res = error.response;
  if (res) {
    switch (res.status) {
      case 401:
        location.href = '/login';
        break;
      default:
        notification.error({message: get(res, 'data.message') || '服务端异常'});
        break;
    }
  }
  return Promise.reject(error);
};

request.interceptors.request.use(requestInterceptor);
request.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

export default request;
