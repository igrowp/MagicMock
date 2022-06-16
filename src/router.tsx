/**
 * @file 路由
 */
import React from 'react'
import Home from '@/pages/home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
)

export default Router
