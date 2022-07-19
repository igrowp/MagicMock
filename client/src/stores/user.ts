import apis from '@/apis';
import {action, makeAutoObservable, observable, runInAction} from 'mobx';
class UserStore {
  user: IUser | null = null;
  constructor() {
    makeAutoObservable(this);
  }

  async getUserInfo() {
    try {
      const user = await apis.getUserInfo();
      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      console.error('获取用户信息异常');
    }
  }
}

export default new UserStore();
