import React from 'react';
import Menu from './menu';
import { Switch, Route } from 'react-router-dom';
import { Rotas } from './rotas';

import Home from '../pages/Home';
import Erro from '../pages/Erro';

import ChavesGrid from '../pages/Chaves/container/chave.grid';
import ChavesNew from '../pages/Chaves/container/chave.new';

import ChaveEstoqueAtualizar from '../pages/Chaves/container/estoque/chave.estoque.atualizar';
import ChaveEstoquePedido from '../pages/Chaves/container/estoque/chave.estoque.pedido';
import ChaveEstoqueHistorico from '../pages/Chaves/container/estoque/chave.estoque.historico';

import AmolacaoCadastro from '../pages/Amolacao/container/amolacao.cadastro';
import AmolacaoEstoque from '../pages/Amolacao/container/amolacao.estoque';

import ServicosGrid from '../pages/Servicos/container/servicos.grid';
import ServicosNew from '../pages/Servicos/container/servicos.new';

import Relatorios from '../pages/Relatorios/container/relatorio';

import EstatisticasChaves from '../pages/Estatistica/Chaves';
import EstatisticasAlicates from '../pages/Estatistica/Alicates';
import EstatisticasServicos from '../pages/Estatistica/Servicos';

export default function Routes() {
    return (
        <div style={{ display: 'flex', height: '1200px' }}>
            <Menu />
            <div style={{ width: '100%' }}>
                <Switch>
                    <Route path="/" exact component={Home} />

                    <Route exact path={Rotas.Chaves} component={ChavesGrid} />
                    <Route exact path={Rotas.ChavesCadastro} component={ChavesNew} />

                    <Route exact path={Rotas.ChavesEstoqueAtualizar} component={ChaveEstoqueAtualizar} />
                    <Route exact path={Rotas.ChavesEstoquePedido} component={ChaveEstoquePedido} />
                    <Route exact path={Rotas.ChavesEstoqueHistorico} component={ChaveEstoqueHistorico} />

                    <Route exact path={Rotas.AmolacaoCadastro} component={AmolacaoCadastro} />
                    <Route exact path={Rotas.AmolacaoEstoque} component={AmolacaoEstoque} />

                    <Route exact path={Rotas.Servico} component={ServicosGrid} />
                    <Route exact path={Rotas.ServicoNew} component={ServicosNew} />

                    <Route exact path={Rotas.Relatorios} component={Relatorios} />

                    <Route exact path={Rotas.EstatisticasChave} component={EstatisticasChaves} />
                    <Route exact path={Rotas.EstatisticasAlicates} component={EstatisticasAlicates} />
                    <Route exact path={Rotas.EstatisticasServicos} component={EstatisticasServicos} />

                    <Route path="*" component={Erro} />
                </Switch>
            </div>
        </div>
    );
}