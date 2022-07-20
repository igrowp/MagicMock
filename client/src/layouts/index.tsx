/**
 * @file 布局
 */
import React, {ReactNode} from 'react';
import AppHeader from './header';
import {Layout} from 'antd';
import {Outlet} from 'react-router';
const {Header, Content} = Layout;

const AppLayout = (children: any) => {
  return (
    <Layout>
      <Header>
        <AppHeader />
      </Header>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default AppLayout;
