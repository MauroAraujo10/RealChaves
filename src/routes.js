import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Erro from './pages/Erro';

import GridChaves from './pages/Chaves/container/chave.grid';
import NewChaves from './pages/Chaves/container/chave.new';
import EditChaves from './pages/Chaves/container/chave.edit';

import Alicates from './pages/Alicates/container/alicates.grid';
import NewAlicate from './pages/Alicates/container/alicates.new';
import EditAlicate from './pages/Alicates/container/alicates.edit';

import Servicos from './pages/Servicos/container/servicos.grid';
import NewServicos from './pages/Servicos/container/servicos.new';
import EditServicos from './pages/Servicos/container/servicos.edit';

import Estatisticas from './pages/Estatistica/container/page1';
import EstatisticasVendas from './pages/Estatistica/container/Vendas';
import EstatisticasLucros from './pages/Estatistica/container/Lucros';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />

                <Route path="/Chaves" exact component={GridChaves} />
                <Route path="/Chaves/new" exact component={NewChaves} />
                <Route path="/Chaves/edit/:id" exact component={EditChaves} />

                <Route path="/Alicates" exact component={Alicates} />
                <Route path="/Alicates/new" exact component={NewAlicate} />
                <Route path="/Alicates/edit/:id" exact component={EditAlicate} />

                <Route path="/Servicos" exact component={Servicos} />
                <Route path="/Servicos/new" exact component={NewServicos} />
                <Route path="/Servicos/edit/:id" exact component={EditServicos} />

                <Route path="/Estatisticas" exact component={Estatisticas} />
                <Route path="/Estatisticas/vendas" exact component={EstatisticasVendas} />
                <Route path="/Estatisticas/lucros" exact component={EstatisticasLucros} />

                <Route path="*" component={Erro} />
            </Switch>
        </BrowserRouter>
    );
}