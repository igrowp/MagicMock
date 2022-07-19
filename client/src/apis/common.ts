/**
 * @file 公共部分接口请求
 */
import client from '@/utils/client';

export default {
  login(params: {name: string; password: string}): Promise<{token: string}> {
    return client.post('/login', params);
  },
  register(params: {name: string; password: string; email: string}): Promise<any> {
    return client.post('/register', params);
  },
  getUserInfo(): Promise<IUser> {
    return client.get('/user');
  }
};
