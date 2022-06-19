import React from 'react'
import { MobXProviderContext } from 'mobx-react'
import systemStore from './system'

const stores = {
  systemStore
}

export type StoreType = typeof stores

export default stores
