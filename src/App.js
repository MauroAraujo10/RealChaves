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

    service.app.ref(tabelas.Configuracoes).once('value', snapshot => {

      if (snapshot.val() === null) {
        service.app.ref(tabelas.Configuracoes).set({
          DarkTheme: true,
          Paginacao: false
        })
      }
      else {
        const congiguracao = {
          DarkTheme: snapshot.val()?.DarkTheme ?? true,
          Paginacao: snapshot.val()?.Paginacao ?? false
        }
        setConfiguracoes(congiguracao);
      }

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