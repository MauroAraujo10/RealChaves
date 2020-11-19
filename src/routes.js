import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';

import GridChaves from './pages/Chaves/grid';
import NewChaves from './pages/Chaves/new';

import Alicates from './pages/Alicates/grid';
import NewAlicate from './pages/Alicates/new';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />

                <Route path="/Chaves" exact component={GridChaves} />
                <Route path="/Chaves/new" exact component={NewChaves} />

                <Route path="/Alicates" exact component={Alicates} />
                <Route path="/Alicates/new" exact component={NewAlicate} />
            </Switch>
        </BrowserRouter>
    );
}