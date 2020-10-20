import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';

import GridChaves from './pages/Chaves/grid';
import NewChaves from './pages/Chaves/new';

export default function Routes(){
    return(
        <Switch>
            <Route path="/" exact component={Home}/>
            
            <Route path="/Chaves" exact component={GridChaves}/>
            <Route path="/Chaves/new" exact component={NewChaves}/>
        </Switch>
    );
}