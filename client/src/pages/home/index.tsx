import {useStores} from '@/hooks';
import {observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {Button} from 'antd';
import './index.less';

const Home: React.FC = () => {
  const systemStore = useStores('systemStore');
  const userStore = useStores('userStore');

  return (
    <div>
      <Button className="home-page" onClick={() => systemStore.setCount()}>
        {systemStore.count}
      </Button>
    </div>
  );
};

export default observer(Home);
