/**
 * @file mock接口
 */
import {Context} from 'koa';
import {Controller, Ctx, Get} from '../decorators/controller';
import MockService from '../services/mockService';
import {responseBody} from './../utils/index';

@Controller('/mock')
export default class MockController {
  @Get()
  async getMockData(@Ctx ctx: Context) {
    const data = MockService.mockData({
      'list|1-10': [
        {
          'id|+1': 1
        }
      ]
    });
    return responseBody(data);
  }
}
