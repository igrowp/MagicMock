/**
 * @file mock数据服务
 */

import Mock from 'mockjs';

export default class MockService {
  /**
   * mock数据
   * @param template
   */
  public static mockData(template: any) {
    return Mock.mock(template);
  }
}
