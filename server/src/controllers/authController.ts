/**
 * @file 登录、注册鉴权
 */
import {JWT_SECRET} from '../utils/constants';
import * as argon2 from 'argon2';
import {getManager} from 'typeorm';
import jwt from 'jsonwebtoken';
import {User} from '../entitys/user';
import {UnauthorizedException} from '../exceptions';
import {Body, Controller, Ctx, Post} from '../decorators/controller';
import {responseBody} from './../utils/index';
import {IContext} from '../decorators/controller';

@Controller('/auth')
export default class AuthController {
  @Post('/login')
  async login(@Body body: {name: string; password: string}, @Ctx ctx: IContext) {
    const userRepository = getManager().getRepository(User);

    const user = await userRepository.createQueryBuilder().where({name: body.name}).addSelect('User.password').getOne();

    if (!user) {
      throw new UnauthorizedException('用户不存在');
    } else if (await argon2.verify(user.password, body.password)) {
      return responseBody({token: jwt.sign({id: user.id}, JWT_SECRET)});
    } else {
      throw new UnauthorizedException('密码错误');
    }
  }

  @Post('/register')
  async register(@Body body: {name: string; password: string; email: string}, @Ctx ctx: IContext) {
    const userRepository = getManager().getRepository(User);

    const newUser = new User();
    newUser.name = body.name;
    newUser.email = body.email;
    newUser.password = await argon2.hash(body.password);

    // 保存到数据库
    const user = await userRepository.save(newUser);

    return responseBody(user);
  }
}
