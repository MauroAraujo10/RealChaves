import React from 'react';
import Menu from './menu';
import { Switch, Route } from 'react-router-dom';
import { Rotas } from './rotas';

import Home from '../pages/Home';
import Erro from '../pages/Erro';

import ChavesGrid from '../pages/Chaves/container/chave.grid';
import ChavesNew from '../pages/Chaves/container/chave.new';

import ChaveEstoqueTabelaPedido from '../pages/Chaves/container/estoque/chave.estoque.TabelaPedido';
import ChaveEstoquePedido from '../pages/Chaves/container/estoque/chave.estoque.Pedido';

import ChavesHistoricoCopias from '../pages/Chaves/container/historico/container/Chaves.Historico.Copia';
import ChavesHistoricoDescarte from '../pages/Chaves/container/historico/container/Chaves.Historico.Descarte';
import ChavesHistoricoPedidoEstoque from '../pages/Chaves/container/historico/container/Chaves.Historico.PedidoEstoque';

import AmolacaoCadastro from '../pages/Amolacao/container/amolacao.cadastro';
import AmolacaoTabela from '../pages/Amolacao/container/amolacao.tabela';
import AmolacaoHistoricoAmolacoes from '../pages/Amolacao/container/historico/amolacao.Historico.Amolacoes';

import ServicosGrid from '../pages/Servicos/container/servicos.grid';
import ServicosNew from '../pages/Servicos/container/servicos.new';

import EstatisticasChaves from '../pages/Estatistica/Chaves/estatistica.chave';
import EstatisticasAmolacoes from '../pages/Estatistica/Amolacoes/estatistica.Amolacoes';
import EstatisticasServicos from '../pages/Estatistica/Servicos/estatistica.servicos';

export default function Routes({ configuracoes }) {
    return (
        <div style={{ display: 'flex', height: '1200px' }}>
            <Menu configuracoes={configuracoes} />
            <div style={{ width: '100%' }}>
                <Switch>
                    <Route path="/" exact component={Home} />

                    <Route exact path={Rotas.Chaves} component={ChavesGrid} />
                    <Route exact path={Rotas.ChavesCadastro} component={ChavesNew} />

                    <Route exact path={Rotas.ChavesEstoqueTabelaPedido} component={ChaveEstoqueTabelaPedido} />
                    <Route exact path={Rotas.ChavesEstoquePedido} component={ChaveEstoquePedido} />

                    <Route exact path={Rotas.ChavesHistoricoCopias} component={ChavesHistoricoCopias} />
                    <Route exact path={Rotas.ChavesHistoricoDescarte} component={ChavesHistoricoDescarte} />
                    <Route exact path={Rotas.ChavesHistoricoPedidoEstoque} component={ChavesHistoricoPedidoEstoque} />

                    <Route exact path={Rotas.AmolacaoCadastro} component={AmolacaoCadastro} />
                    <Route exact path={Rotas.AmolacaoEstoque} component={AmolacaoTabela} />
                    <Route exact path={Rotas.AmolacaoHistoricoAmolacoes} component={AmolacaoHistoricoAmolacoes} />

                    <Route exact path={Rotas.Servico} component={ServicosGrid} />
                    <Route exact path={Rotas.ServicoNew} component={ServicosNew} />

                    <Route exact path={Rotas.EstatisticasChave} component={EstatisticasChaves} />
                    <Route exact path={Rotas.EstatisticasAmolacoes} component={EstatisticasAmolacoes} />
                    <Route exact path={Rotas.EstatisticasServicos} component={EstatisticasServicos} />

                    <Route path="*" component={Erro} />
                </Switch>
            </div>
        </div>
    );
}