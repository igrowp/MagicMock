/**
 * @file 登录、注册鉴权
 */
import {JWT_SECRET, REGULARS} from '../utils/constants';
import * as argon2 from 'argon2';
import {getManager} from 'typeorm';
import jwt from 'jsonwebtoken';
import {User} from '../entitys/user';
import {ParamsException, UnauthorizedException} from '../exceptions';
import {Body, Controller, Ctx, Post} from '../decorators/controller';
import {responseBody} from './../utils/index';
import {IContext} from '../decorators/controller';

@Controller()
export default class AuthController {
  @Post('/login')
  async login(@Body body: {name: string; password: string}) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.createQueryBuilder().where({name: body.name}).addSelect('User.password').getOne();
    console.log('user', user);

    if (!user) {
      throw new UnauthorizedException('用户不存在');
    } else if (await argon2.verify(user.password, body.password)) {
      return responseBody({token: jwt.sign({id: user.id}, JWT_SECRET)});
    } else {
      throw new UnauthorizedException('密码错误');
    }
  }

  @Post('/register')
  async register(@Body body: {name: string; password: string; email: string}) {
    const {name, password, email} = body;
    if (!REGULARS.email.test(email)) {
      throw new ParamsException('邮箱格式错误');
    }
    const userRepository = getManager().getRepository(User);

    const newUser = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.password = await argon2.hash(password);

    // 保存到数据库
    const user = await userRepository.save(newUser);
    return responseBody(user);
  }
}
