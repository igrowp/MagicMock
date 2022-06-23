import BaseException from "./BaseException";

export default class ForbiddenException extends BaseException {
  status = 403;

  constructor(msg?: string) {
    super();
    this.message = msg || '权限不足';
  }
}