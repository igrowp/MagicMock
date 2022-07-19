/**
 * @file 路由
 */
import React, {lazy, Suspense, ReactNode} from 'react';
import Home from '@/pages/home';
import {useRoutes} from 'react-router-dom';
import AppLayout from './layouts';

const Login = lazy(() => import('./pages/login'));

const lazyLoad = (children: ReactNode): ReactNode => {
  return <Suspense fallback={<h1>Loading...</h1>}>{children}</Suspense>;
};

const Router = () =>
  useRoutes([
    {
      path: '/',
      element: <AppLayout />,
      // 路由嵌套，子路由的元素需使用<OutLet />
      children: [
        {
          index: true,
          element: lazyLoad(<Home />)
        }
      ]
    },
    {
      path: 'login',
      element: <Login />
    }
  ]);

export default Router;
