/**
 * @file 公共部分接口请求
 */
import client from '@/utils/client';

export default {
  getUserInfo() {
    client.get('/user/info');
  }
};
