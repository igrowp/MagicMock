import BaseException from './BaseException';

export default class NotFoundException extends BaseException {
  status = 404;

  constructor(msg?: string) {
    super();
    this.message = msg || '无此内容';
  }
}