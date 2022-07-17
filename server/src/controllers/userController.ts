/**
 * @file 用户相关
 */
import {Context} from 'koa';
import {getManager} from 'typeorm';
import {NotFoundException, ForbiddenException} from '../exceptions';

import {responseBody} from './../utils/index';
import {User} from '../entitys/user';
import {Controller, Ctx, Get} from '../decorators/controller';

@Controller('/user')
export default class UserController {
  @Get('/list')
  async listUsers(@Ctx ctx: Context) {
    const userRespository = getManager().getRepository(User);
    const users = userRespository.find();

    ctx.status = 200;
    ctx.body = users;
  }
  public static async showUserDetail(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(+ctx.params.id);

    if (user) {
      return responseBody(user);
    } else {
      throw new NotFoundException();
    }
  }

  public static async updateUser(ctx: Context) {
    const userId = +ctx.params.id;

    if (userId !== +ctx.state.user.id) {
      throw new ForbiddenException();
    }

    const userRepository = getManager().getRepository(User);
    await userRepository.update(userId, ctx.request.body);
    const updatedUser = await userRepository.findOne(userId);

    if (updatedUser) {
      return responseBody(updatedUser);
    } else {
      ctx.status = 404;
    }
  }

  public static async deleteUser(ctx: Context) {
    const userId = +ctx.params.id;

    if (userId !== +ctx.state.user.id) {
      throw new ForbiddenException();
    }
    const userRepository = getManager().getRepository(User);
    await userRepository.delete(userId);

    ctx.status = 204;
  }
}
