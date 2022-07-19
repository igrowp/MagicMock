import {useStores} from '@/hooks';
import {observer} from 'mobx-react';
import React, {useState} from 'react';
import {Button} from 'antd';
import './index.less';

const Home: React.FC = () => {
  const [info, setInfo] = useState<any>({name: 'test'});
  const systemStore = useStores('systemStore');
  const userStore = useStores('userStore');

  return (
    <div>
      <Button onClick={() => userStore.getUserInfo()}>请求</Button>
      {info.name && <span>{info.name}</span>}
      {userStore.user?.name}
      <Button className="home-page" onClick={() => systemStore.setCount()}>
        {systemStore.count}
      </Button>
    </div>
  );
};

export default observer(Home);
