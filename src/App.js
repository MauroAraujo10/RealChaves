import React, { useEffect, useState } from "react";
import { HashRouter } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import Loading from './common/components/Loading/Loading';

import service from './service';
import tabelas from './common/Enum/tabelas';
import "react-toastify/dist/ReactToastify.css";

import Header from './header';
import Routes from './Routes/routes';

function App() {
  const [configuracoes, setConfiguracoes] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    service.app.ref(tabelas.Configuracoes).on('value', (snapshot) => {
      const congiguracao = {
        DarkTheme: snapshot.val().DarkTheme,
        Paginacao: snapshot.val().Paginacao
      }
      setConfiguracoes(congiguracao);
      setLoading(false);
    })
  }, []);

  return (
    <HashRouter>
      <Header />
      {
        loading ? <Loading /> :
          <>
            <Routes configuracoes={configuracoes} />
            <ToastContainer autoClose={5000} />
          </>
      }
    </HashRouter>
  )
}

export default App;