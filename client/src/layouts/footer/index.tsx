/**
 * layout footer
 * @file src/layouts/footer/index.tsx
 */
import React from 'react';
import {classCreator} from '@/utils';
import './index.less';

const prefixCls = classCreator('footer');

const AppFooter = () => {
  return <div className={prefixCls}>footer</div>;
};

export default AppFooter;
