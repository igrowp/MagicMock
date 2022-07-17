import Router from 'koa-router';
import path from 'path';
import fs from 'fs';
import {CONTROLLER_MATEDATA, METHOD_MATEDATA, PARAM_MATEDATA, IMethod, IContext, INext} from './decorators/controller';

const router = new Router();

// 获取 target 的所有属性（函数且非constructor）
function getProtos(value: any) {
  const protos = Object.getPrototypeOf(value);
  return Object.getOwnPropertyNames(protos).filter(key => key !== 'constructor' && typeof protos[key] === 'function');
}

// 获取需要注入的参数信息
function getParams(target: any, proto: string, length: number, ctx: IContext, next: INext) {
  // 判断函数需要的入参个数
  const args: any[] = Array.from({length});
  // 循环得到每个入参的值
  for (let i = 0; i < length; i += 1) {
    const metadata:
      | {
          type: 'body' | 'params' | 'query' | 'ctx' | 'next';
          key?: string;
          required: boolean;
          propertyKey: string;
        }
      | undefined = Reflect.getMetadata(PARAM_MATEDATA, target, `${proto}-${i}`);
    if (!metadata) {
      continue;
    }
    const {type, key, required} = metadata;
    if (required && !key) {
      throw new Error(`${type}.required('key') key is Required`);
    }
    switch (type) {
      case 'ctx':
        args[i] = ctx;
        break;
      case 'next':
        args[i] = next;
        break;
      case 'body':
        args[i] = ctx.request.body;
        break;
      default:
        args[i] = ctx[type];
        if (key) {
          args[i] = args[i][key];
          if (required && args[i]) {
            return {status: 400, message: `Parameter ${key} is required`};
          }
        }
        break;
    }
  }
  return {status: 200, args};
}

// 注册路由
function setRouter(target: any, proto: string, base: string) {
  const metadata: {method: IMethod; url?: string} | undefined = Reflect.getMetadata(METHOD_MATEDATA, target, proto);
  if (!metadata) return;
  const {method, url} = metadata;
  const cb = target[proto];
  // 注册路由
  router[method](base + (url || ''), async (ctx, next) => {
    // 获取需要注入的参数信息
    const {status, message, args} = getParams(target, proto, cb.length, ctx, next);
    if (status === 200) {
      // 使用apply 调用防止this指向错误
      const body = await cb.apply(target, args);
      if (body) {
        // 返回值直接就是请求的数据
        ctx.body = body;
      } else {
        await next();
      }
    } else {
      ctx.body = {
        statusCode: status,
        message
      };
    }
  });
}

// 获取controllers 文件下的所有文件
const dir = path.join(__dirname, './controllers');
fs.readdirSync(dir).forEach(filename => {
  // .js/.ts后缀
  if (!/^[^.]+?\.(t|j)s$/.test(filename)) return;
  const Controller = require(path.join(dir, filename)).default;
  // 必须export default 导出
  if (!Controller) return;
  let metadata = Reflect.getMetadata(CONTROLLER_MATEDATA, Controller);
  // 只识别@Controller装饰过的类信息
  if (!metadata) return;
  // 请求url 的前缀
  if (metadata === '$auto$') metadata = '';
  const target = new Controller();
  // 获取当前类的所有属性（函数并非constructor)
  const protos = getProtos(target);
  // 循环注册路由
  protos.forEach(proto => setRouter(target, proto, metadata));
});
export default router;
