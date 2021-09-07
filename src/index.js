import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "antd/dist/antd.css";

import { ConfigProvider } from 'antd';
import language from 'antd/lib/locale/pt_BR';

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={language}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
