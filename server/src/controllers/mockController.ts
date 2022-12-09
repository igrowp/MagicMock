/**
 * @file mock接口
 */
import {Body, Controller, Post} from '../decorators/controller';
import MockService from '../services/mockService';
import {ParamsException} from '../exceptions';
import {responseBody} from './../utils/index';

@Controller('/mock')
export default class MockController {
  @Post()
  async getMockData(@Body body: {template: string}) {
    console.log('body', body, body.template);
    if (!body.template) {
      throw new ParamsException();
    }
    const data = MockService.mockData(body.template);
    return responseBody(data);
  }
}
