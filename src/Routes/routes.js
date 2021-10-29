import React from 'react';
import Menu from './menu';
import { Switch, Route } from 'react-router-dom';
import { Rotas } from './rotas';

import Home from '../pages/Home'; 
import Erro from '../pages/Erro';

import ChavesGrid from '../pages/Chaves/container/chave.grid';
import ChavesNew from '../pages/Chaves/container/chave.new';
import ChavesVenda from '../pages/Chaves/container/chave.venda';
import ChavesHistorico from '../pages/Chaves/container/chave.historico';

import AlicatesGrid from '../pages/Alicates/container/alicates.grid';
import AlicatesNew from '../pages/Alicates/container/alicates.new';
import AlicatesHistorico from '../pages/Alicates/container/alicates.historico';

import ServicosGrid from '../pages/Servicos/container/servicos.grid';
import ServicosNew from '../pages/Servicos/container/servicos.new';
import ServicosHistorico from '../pages/Servicos/container/servicos.historico';

// import Estatisticas from '../Estatistica/container/page1';
// import EstatisticasVendas from '../Estatistica/container/Vendas';
// import EstatisticasLucros from '../Estatistica/container/Lucros';

export default function Routes() {
    return (
        <div style={{ display: 'flex', height: '1000px' }}>
            <Menu />
            <div style={{width: '100%'}}>
                <Switch>
                    <Route path="/" exact component={Home} />

                    <Route exact path={Rotas.Chaves} component={ChavesGrid} />
                    <Route exact path={Rotas.ChavesNew} component={ChavesNew} />
                    <Route exact path={Rotas.ChavesVenda} component={ChavesVenda} />
                    <Route exact path={Rotas.ChavesHistorico} component={ChavesHistorico} />
                    
                    <Route exact path={Rotas.Alicates} component={AlicatesGrid} />
                    <Route exact path={Rotas.AlicatesNew} component={AlicatesNew} />
                    <Route exact path={Rotas.AlicatesHistorico} component={AlicatesHistorico} />

                    <Route exact path={Rotas.Servicos} component={ServicosGrid} />
                    <Route exact path={Rotas.ServicoNew} component={ServicosNew} />
                    <Route exact path={Rotas.ServicoHistorico} component={ServicosHistorico} />

                    <Route path="*" component={Erro} />
                </Switch>
            </div>
        </div>
    );
}