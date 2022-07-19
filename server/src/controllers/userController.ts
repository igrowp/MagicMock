/**
 * @file 用户相关
 */
import {Context} from 'koa';
import {getManager} from 'typeorm';
import {NotFoundException, ForbiddenException} from '../exceptions';

import {responseBody} from './../utils/index';
import {User} from '../entitys/user';
import {Body, Controller, Ctx, Delete, Get, IContext, Params, Put} from '../decorators/controller';

@Controller('/user')
export default class UserController {
  @Get('/list')
  async listUsers(@Ctx ctx: Context) {
    const userRespository = getManager().getRepository(User);
    const users = userRespository.find();

    return responseBody(users);
  }
  @Get()
  async showUserDetail(@Params() id: string, @Ctx ctx: IContext) {
    console.log('id', ctx.state.user.id);

    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(id);

    if (user) {
      return responseBody(user);
    } else {
      throw new NotFoundException();
    }
  }

  @Put('/:id')
  async updateUser(@Body body: User, @Params() id: string, @Ctx ctx: IContext) {
    const userId = +id;

    if (userId !== +ctx.state.user.id) {
      throw new ForbiddenException();
    }

    const userRepository = getManager().getRepository(User);
    await userRepository.update(userId, body);
    const updatedUser = await userRepository.findOne(userId);

    if (updatedUser) {
      return responseBody(updatedUser);
    } else {
      ctx.status = 404;
    }
  }

  @Delete('/:id')
  async deleteUser(@Params() id: string, @Ctx ctx: IContext) {
    const userId = +id;

    if (userId !== +ctx.state.user.id) {
      throw new ForbiddenException();
    }
    const userRepository = getManager().getRepository(User);
    await userRepository.delete(userId);

    ctx.status = 204;
  }
}
