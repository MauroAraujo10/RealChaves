import React, { useEffect, useState } from "react";
import { HashRouter } from 'react-router-dom';
import { ToastContainer } from "react-toastify";

import service from './service';
import tabelas from './common/Messages/tabelas';
import "react-toastify/dist/ReactToastify.css";

import Header from './header';
import Routes from './Routes/routes';

function App() {
  const [configuracoes, setConfiguracoes] = useState({});

  useEffect(() => {
    service.app.ref(tabelas.Configuracoes).on('value', (snapshot) => {
      const congiguracao = {
        DarkTheme: snapshot.val().DarkTheme,
        Paginacao: snapshot.val().Paginacao
      }
      setConfiguracoes(congiguracao);
    })
  }, []);

  return (
    <HashRouter>
      <Header />
      <Routes configuracoes={configuracoes} />
      <ToastContainer autoClose={5000} />
    </HashRouter>
  )
}

export default App;