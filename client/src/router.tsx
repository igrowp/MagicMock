/**
 * @file 路由
 */
import React, {lazy, Suspense, ReactNode} from 'react';
import {BrowserRouter, useRoutes} from 'react-router-dom';
import AppLayout from './layouts';
import Login from './pages/login';
import Register from './pages/register';

const Home = lazy(() => import('./pages/home'));

const lazyLoad = (children: ReactNode): ReactNode => {
  return <Suspense fallback={<h1>Loading...</h1>}>{children}</Suspense>;
};

const AppRoutes = () =>
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
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    }
  ]);

const Router = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default Router;
