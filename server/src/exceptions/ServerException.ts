import BaseException from './BaseException';

export default class ServerException extends BaseException {
  status = 500;

  constructor(msg?: string) {
    super();
    this.message = msg || '服务端错误';
  }
}
