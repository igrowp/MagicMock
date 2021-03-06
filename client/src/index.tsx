import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'mobx-react';
import stores from './stores';
import Router from './router';
import {ConfigProvider, notification} from 'antd';
import {ANTD_PREFIX_CLS} from './utils/constants';

import locale from 'antd/lib/locale/zh_CN';
import '@/styles/global.less';

notification.config({
  prefixCls: `${ANTD_PREFIX_CLS}-notification`,
  duration: 3
});

// img 图片加载全局异常处理
document.addEventListener(
  'error',
  e => {
    let target: any = e.target;
    const tagName = target.tagName || '';
    if (tagName.toLowerCase() === 'img') {
      target.classList.remove('error');
      target.classList.add('error');
    }
    target = null;
  },
  true
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider prefixCls={ANTD_PREFIX_CLS} locale={locale}>
      <Provider stores={stores}>
        <Router />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);
