/**
 * 创建组件class类名
 * @param prefixs 类名前缀
 * @param suffix 类名后缀
 * @param CLASSNAME_PREFIX 全局类名前缀
 * @returns
 */
import {PREFIX_CLS} from './constants';

export const classCreator = (prefixs: string | string[], suffix?: string, CLASSNAME_PREFIX = PREFIX_CLS): string => {
  prefixs = Array.isArray(prefixs) ? [...prefixs] : [prefixs];
  return prefixs.map(prefix => `${CLASSNAME_PREFIX}-${prefix}${suffix ? '-' + suffix : ''}`).join(' ');
};
