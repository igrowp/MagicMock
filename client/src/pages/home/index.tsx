import {useStores} from '@/hooks';
import {observer} from 'mobx-react';
import React, {useState} from 'react';
import {Button} from 'antd';
import apis from '@/apis';
import './index.less';
import {useEffect} from 'react';

const Home: React.FC = () => {
  const [info, setInfo] = useState<any>({name: 'test'});
  const getInfo = async () => {
    const res = await apis.getUserInfo();
    if (res.data) {
      setInfo(res.data as any);
    }
  };
  useEffect(() => {
    getInfo();
  }, []);
  const systemStore = useStores('systemStore');
  return (
    <div>
      <Button onClick={() => getInfo()}>请求</Button>
      {info.name && <span>{info.name}</span>}
      <Button className="home-page" onClick={() => systemStore.setCount()}>
        {systemStore.count}
      </Button>
    </div>
  );
};

export default observer(Home);
