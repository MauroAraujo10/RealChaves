import React from "react";
import { HashRouter } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from './header';
import Routes from './Routes/routes';

export default function App() {
  return (
    <HashRouter>
      <Header />
      <Routes />
      <ToastContainer autoClose={5000} />
    </HashRouter>
  )
}