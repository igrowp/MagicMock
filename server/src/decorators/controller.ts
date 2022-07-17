/**
 * @file Controller 装饰器
 */

import {ParameterizedContext, Next as KoaNext} from 'koa';
import {IRouterParamContext} from 'koa-router';

export const METHOD_MATEDATA = 'method';
export const PARAM_MATEDATA = 'param';
export const CONTROLLER_MATEDATA = 'controller';

export type IMethod =
  | 'get'
  | 'post'
  | 'put'
  | 'link'
  | 'unlink'
  | 'delete'
  | 'del'
  | 'head'
  | 'options'
  | 'patch'
  | 'all';

export type IContext<StateT = any, CustomT = {}> = ParameterizedContext<
  StateT,
  CustomT & IRouterParamContext<StateT, CustomT>,
  any
>;

export type INext = KoaNext;

// 定义controller 装饰器
export const Controller =
  (url?: string): ClassDecorator =>
  target => {
    Reflect.defineMetadata(CONTROLLER_MATEDATA, url || '$auto$', target);
  };

// 定义请求的装饰器
const createMethodDecorator =
  (method: string) =>
  (url?: string): MethodDecorator =>
  (target, name) => {
    Reflect.defineMetadata(METHOD_MATEDATA, {method, url}, target, name);
  };

export const Get = createMethodDecorator('get');
export const Post = createMethodDecorator('post');
export const Put = createMethodDecorator('put');
export const Delete = createMethodDecorator('delete');

// 定义参数装饰器
const createParamsDecorator =
  (type: string, required = false) =>
  (key?: string): ParameterDecorator =>
  (target, propertyKey, propertyIndex) => {
    Reflect.defineMetadata(PARAM_MATEDATA, {type, key, required}, target, `${propertyKey.toString()}-${propertyIndex}`);
  };

const createParamsDecoratorRequire = (type: string) => {
  const base = createParamsDecorator(type);
  const required = createParamsDecorator(type, true);
  const temp: any = base;
  temp.required = required;
  return temp as typeof base & {requried: typeof required};
};

export const Query = createParamsDecorator('query');
export const Params = createParamsDecorator('params');
export const Body = createParamsDecorator('body')();
export const Ctx = createParamsDecorator('ctx')();
export const Next = createParamsDecorator('next')();
