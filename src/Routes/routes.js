import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Menu from './menu';
import { Row, Col } from 'antd';
import { Switch, Route } from 'react-router-dom';
import { Rotas } from './rotas';

import Home from '../pages/Home';
import Erro from '../pages/Erro';
import OutofAir from '../pages/Erro/outOfAir';

import ChavesGrid from '../pages/Chaves/container/chave.grid';
import ChavesNew from '../pages/Chaves/container/chave.new';

import ChaveEstoqueFazerPedido from '../pages/Chaves/container/estoque/Chave.Estoque.FazerPedido';
import ChaveEstoqueTabelaPedido from '../pages/Chaves/container/estoque/chave.estoque.TabelaPedido';

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

const Routes = ({ configuracoes }) => {
    const [outOfAir, setOutOfAir] = useState();
    const history = useHistory();

    useEffect(() => {
        setOutOfAir(configuracoes?.OutOfAir);
    }, [configuracoes]);

    return (
        <Row>
            <Col xs={8} sm={8} md={6} lg={6} xl={4} xxl={3}
                style={{
                    background: configuracoes?.DarkTheme ? '#001529' : '#FFF',
                    height: '1500px',
                    boxShadow: '5px 2px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)'
                }}>
                <Menu configuracoes={configuracoes} />
            </Col>

            <Col xs={16} sm={16} md={18} lg={18} xl={20} xxl={21}>

                {
                    outOfAir ?
                        <Switch>
                            <Route path="/" exact component={OutofAir} />
                            {history.push(Rotas.Home)}
                        </Switch>
                        :
                        <Switch>
                            <Route path="/" exact component={Home} />

                            <Route exact path={Rotas.Chaves} component={ChavesGrid} />
                            <Route exact path={Rotas.ChavesCadastro} component={ChavesNew} />

                            <Route exact path={Rotas.ChavesEstoqueTabelaPedido} component={ChaveEstoqueTabelaPedido} />
                            <Route exact path={Rotas.ChavesEstoquePedido} component={ChaveEstoqueFazerPedido} />

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
                }
            </Col>
        </Row>
    );
}

export default Routes;