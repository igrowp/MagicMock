import Router from 'koa-router';

import AuthController from '../controllers/auth';
import UserController from '../controllers/user';

// 需要鉴权的路由
const unprotectedRouter = new Router();
unprotectedRouter.post('/auth/login', AuthController.login);
unprotectedRouter.post('/auth/register', AuthController.register);
  
// 鉴权路由
const protectedRouter = new Router();

// users相关
protectedRouter.get('/users', UserController.listUsers);
protectedRouter.get('/users/:id', UserController.listUsers);
protectedRouter.put('/users/:id', UserController.listUsers);
protectedRouter.delete('/users/:id', UserController.listUsers);

export {unprotectedRouter, protectedRouter};