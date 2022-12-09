/**
 * @file 布局
 */
import React, {ReactNode} from 'react';
import AppHeader from './header';
import {Layout} from 'antd';
import {Outlet} from 'react-router';
import AppFooter from './footer';
const {Header, Content, Footer} = Layout;

const AppLayout = (children: any) => {
  return (
    <Layout>
      <Header>
        <AppHeader />
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Footer>
        <AppFooter />
      </Footer>
    </Layout>
  );
};

export default AppLayout;
