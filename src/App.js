import React from "react";
import { HashRouter } from 'react-router-dom';

import Header from './header';
import Routes from './Routes/routes';

export default function App() {
  return (
    <HashRouter>
      <Header />
      <Routes />
    </HashRouter>
  )
}