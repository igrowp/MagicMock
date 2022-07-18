/**
 * @file 存储方法
 */

import {isObject, clone} from 'lodash';

let storageKey = '_Default_';

export function getKey() {
  return storageKey;
}
export function setKey(key: string) {
  storageKey = key;
}

export default {
  dump() {
    try {
      let data: any = localStorage.getItem(getKey());
      data = data ? JSON.parse(data) : {};
      if (!isObject(data)) {
        data = {};
      }
      return clone(data);
    } catch (error) {
      return {};
    }
  },

  get(key: string) {
    const data = this.dump();
    return clone(data[key]);
  },

  set(key: string, value: string) {
    const data = this.dump();
    data[key] = value;
    localStorage.setItem(getKey(), JSON.stringify(data));
  },

  clear() {
    localStorage.removeItem(getKey());
  },

  remove(key: string) {
    let data: any = this.dump();
    if (data instanceof Object && data[key] !== undefined) {
      delete data[key];
    }
    localStorage.setItem(getKey(), JSON.stringify(data));
  }
};
