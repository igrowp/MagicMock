/**
 * @file 工具集
 */

// 统一管理返回格式
export const responseBody = function (data: any, status = 0, message = '') {
  return {status, message, data};
};
