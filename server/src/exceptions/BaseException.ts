export default class BaseException extends Error {
  // 状态码
  status: number;
  // 提示信息
  message: string;
}
