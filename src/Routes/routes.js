import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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

import AmolacaoGrid from '../pages/Amolacao/container/amolacao.grid';
import AmolacaoNew from '../pages/Amolacao/container/amolacao.new';
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
        <>
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

                     <Route exact path={Rotas.AmolacaoEstoque} component={AmolacaoGrid} />
                     <Route exact path={Rotas.AmolacaoCadastro} component={AmolacaoNew} />
                     <Route exact path={Rotas.AmolacaoHistoricoAmolacoes} component={AmolacaoHistoricoAmolacoes} />

                     <Route exact path={Rotas.Servico} component={ServicosGrid} />
                     <Route exact path={Rotas.ServicoNew} component={ServicosNew} />

                     <Route exact path={Rotas.EstatisticasChave} component={EstatisticasChaves} />
                     <Route exact path={Rotas.EstatisticasAmolacoes} component={EstatisticasAmolacoes} />
                     <Route exact path={Rotas.EstatisticasServicos} component={EstatisticasServicos} />
                     
                     <Route path="*" component={Erro} />
                 </Switch>
            }
        </>
    );
}

export default Routes;