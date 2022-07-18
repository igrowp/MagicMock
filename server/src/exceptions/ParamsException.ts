import BaseException from './BaseException';

export default class ParamsException extends BaseException {
  status = 400;

  constructor(msg?: string) {
    super();
    this.message = msg || '参数错误';
  }
}
