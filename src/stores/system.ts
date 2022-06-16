import { makeAutoObservable, observable } from 'mobx'
class SystemStore {
  title = ''
  theme = 'default'
  count = 0
  constructor() {
    makeAutoObservable(this)
  }

  setTheme(theme: string) {
    this.theme = theme
  }

  setTitle(title: string) {
    this.title = title
  }

  setCount() {
    this.count++
  }
}

export default new SystemStore()
