import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import {createConnection} from 'typeorm';
import path from 'path';
import jwt from 'koa-jwt';
import {logger as customLogger} from './logger';
import router from './routes';
import {JWT_SECRET} from './utils/constants';
import 'reflect-metadata';

createConnection()
  .then(() => {
    // 初始化 koa 实例
    const app = new Koa();

    // middlewares
    app.use(
      bodyparser({
        enableTypes: ['json', 'form', 'text']
      })
    );
    let staticPath = path.join(__dirname, '../public'); // 静态地址
    app.use(require('koa-static')(staticPath));

    // logger
    app.use(customLogger());

    // 鉴权
    app.use(
      jwt({secret: JWT_SECRET}).unless({
        // 配置白名单
        path: [/\/register/, /\/login/]
      })
    );

    // error-handling
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        // 只返回 JSON 格式的响应
        ctx.status = err.status || 500;
        ctx.body = {
          status: 1,
          message: err.message
        };
      }
    });

    // routes
    app.use(router.routes()).use(router.allowedMethods());

    app.listen(8700);
  })
  .catch((err: string) => console.log('TypeORM connection error:', err));
