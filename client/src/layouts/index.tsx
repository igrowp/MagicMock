/**
 * @file 布局
 */
import React, {ReactNode} from 'react';
import SysHeader from './header';
import {Layout} from 'antd';
import {Outlet} from 'react-router';
const {Header, Content} = Layout;

const SysLayout = (children: any) => {
  return (
    <Layout>
      <Header>
        <SysHeader />
      </Header>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default SysLayout;
