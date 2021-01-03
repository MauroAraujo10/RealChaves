import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';

import GridChaves from './pages/Chaves/pages/chave.grid';
import NewChaves from './pages/Chaves/pages/chave.new';
import EditChaves from './pages/Chaves/pages/chave.edit';

import Alicates from './pages/Alicates/pages/alicates.grid';
import NewAlicate from './pages/Alicates/pages/alicates.new';
import EditAlicate from './pages/Alicates/pages/alicates.edit';

// import Servicos from './pages/Servicos/pages/servicos.grid';
import NewServicos from './pages/Servicos/pages/servicos.new';
import EditServicos from './pages/Servicos/pages/servicos.edit';

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

                <Route path="/Servicos" exact component={Alicates} />
                <Route path="/Servicos/new" exact component={NewServicos} />
                <Route path="/Servicos/edit/:id" exact component={EditServicos} />
            </Switch>
        </BrowserRouter>
    );
}