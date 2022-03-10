import React from 'react';
import Menu from './menu';
import { Switch, Route } from 'react-router-dom';
import { Rotas } from './rotas';

import Home from '../pages/Home'; 
import Erro from '../pages/Erro';

import ChavesGrid from '../pages/Chaves/container/chave.grid';
import ChavesNew from '../pages/Chaves/container/chave.new';
import ChavesCopia from '../pages/Chaves/container/chave.copia';
import ChavesDescarte from '../pages/Chaves/container/chave.descarte';

import ChaveEstoqueAtualizar from '../pages/Chaves/container/estoque/chave.estoque.atualizar';
import ChaveEstoquePedido from '../pages/Chaves/container/estoque/chave.estoque.pedido';
import ChaveEstoqueHistorico from '../pages/Chaves/container/estoque/chave.estoque.historico';

import AlicatesGrid from '../pages/Alicates/container/alicates.grid';
import AlicatesNew from '../pages/Alicates/container/alicates.new';
import AlicatesHistorico from '../pages/Alicates/container/alicates.historico';

import ServicosGrid from '../pages/Servicos/container/servicos.grid';
import ServicosNew from '../pages/Servicos/container/servicos.new';
import ServicosHistorico from '../pages/Servicos/container/servicos.historico';

import EstatisticasChaves from '../pages/Estatistica/Chaves';
import EstatisticasAlicates from '../pages/Estatistica/Alicates';
import EstatisticasServicos from '../pages/Estatistica/Servicos';

export default function Routes() {
    return (
        <div style={{ display: 'flex', height: '1200px' }}>
            <Menu />
            <div style={{width: '100%'}}>
                <Switch>
                    <Route path="/" exact component={Home} />

                    <Route exact path={Rotas.Chaves} component={ChavesGrid} />
                    <Route exact path={Rotas.ChavesNew} component={ChavesNew} />
                    <Route exact path={Rotas.ChavesCopia} component={ChavesCopia} />
                    <Route exact path={Rotas.ChavesDescarte} component={ChavesDescarte} />

                    <Route exact path={Rotas.ChavesEstoqueAtualizar} component={ChaveEstoqueAtualizar} />
                    <Route exact path={Rotas.ChavesEstoquePedido} component={ChaveEstoquePedido} />
                    <Route exact path={Rotas.ChavesEstoqueHistorico} component={ChaveEstoqueHistorico} />
                    
                    <Route exact path={Rotas.Alicates} component={AlicatesGrid} />
                    <Route exact path={Rotas.AlicatesNew} component={AlicatesNew} />
                    <Route exact path={Rotas.AlicatesHistorico} component={AlicatesHistorico} />

                    <Route exact path={Rotas.Servico} component={ServicosGrid} />
                    <Route exact path={Rotas.ServicoNew} component={ServicosNew} />
                    <Route exact path={Rotas.ServicoHistorico} component={ServicosHistorico} />

                    <Route exact path={Rotas.EstatisticasChave} component={EstatisticasChaves} />
                    <Route exact path={Rotas.EstatisticasAlicates} component={EstatisticasAlicates} />
                    <Route exact path={Rotas.EstatisticasServicos} component={EstatisticasServicos} />

                    <Route path="*" component={Erro} />
                </Switch>
            </div>
        </div>
    );
}