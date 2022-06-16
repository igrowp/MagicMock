import {useStores} from '@/hooks';
import {observer} from 'mobx-react';
import React, {useState} from 'react';
import {Button} from 'antd';
import './index.less';

const Home: React.FC = () => {
  const systemStore = useStores('systemStore');
  return (
    <Button className="home-page" onClick={() => systemStore.setCount()}>
      {systemStore.count}
    </Button>
  );
};

export default observer(Home);
