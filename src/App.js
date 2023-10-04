import React, { useEffect, useState } from "react";
import { HashRouter } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import Loading from './common/components/Loading/Loading';

import service from './services/index';
import tabelas from './common/Enum/tabelas';
import "react-toastify/dist/ReactToastify.css";

import NavBar from './common/components/NavBar/NavBar';
import Routes from './Routes/routes';

function App() {
  const [configuracoes, setConfiguracoes] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    service.app.ref(tabelas.Configuracoes).on('value', snapshot => {

      if (snapshot.val() === null) {
        service.app.ref(tabelas.Configuracoes).set({
          DarkTheme: true,
          Paginacao: false,
          OutOfAir: false
        })
      }
      else {
        const congiguracao = {
          DarkTheme: snapshot.val()?.DarkTheme ?? true,
          Paginacao: snapshot.val()?.Paginacao ?? false,
          OutOfAir: snapshot.val()?.OutOfAir ?? false
        }
        setConfiguracoes(congiguracao);
      }

      setLoading(false);
    })

  }, []);

  return (
    <HashRouter>
      <NavBar />
      {
        loading ? <Loading /> :
          <>
            <Routes configuracoes={configuracoes} />
            <ToastContainer autoClose={5000}/>
          </>
      }
    </HashRouter>
  )
}

export default App;