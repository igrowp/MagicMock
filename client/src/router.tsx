/**
 * @file 路由
 */
import React from 'react';
import Home from '@/pages/home';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/login';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
