import React from 'react';
import {MobXProviderContext} from 'mobx-react';
import systemStore from './system';
import userStore from './user';

const stores = {
  systemStore,
  userStore
};

export type StoreType = typeof stores;

export default stores;
