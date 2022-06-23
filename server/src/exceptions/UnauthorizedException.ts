import BaseException from "./BaseException";

export default class UnauthorizedException extends BaseException {
  status = 401;

  constructor(msg?: string) {
    super();
    this.message = msg || '尚未登录';
  }
}