import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import vitePluginImp from 'vite-plugin-imp';
import {svgBuilder} from './src/plugins/svgBuilder';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
        additionalData: '@import "./src/styles/var.less";',
        modifyVars: {'ant-prefix': 'mlib'}
      }
    },
    modules: {
      // 样式小驼峰转化,
      //css: goods-list => tsx: goodsList
      localsConvention: 'camelCase'
    }
  },
  plugins: [
    react(),
    svgBuilder('./src/assets/icons/'),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: name => `antd/es/${name}/style`
        }
      ]
    })
  ],
  server: {
    port: 8088, //指定端口号
    proxy: {
      '/api': {
        target: 'http://localhost:8700',
        changeOrigin: true,
        rewrite: (path: any) => path.replace(/^\/api/, '')
      }
    }
  }
});
