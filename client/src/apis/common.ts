/**
 * @file 公共部分接口请求
 */
import client from '@/utils/client';

export default {
  login(params: {name: string; password: string}) {
    return client.post('/login', params);
  },
  getUserInfo() {
    return client.get('/user/list');
  }
};
