import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import { Rotas } from './rotas';

import Home from '../pages/Home';
import Erro from '../pages/Erro';
import OutofAir from '../pages/Erro/outOfAir';

import ChavesGrid from '../pages/Chaves/container/chave.grid';
import ChavesNew from '../pages/Chaves/container/chave.new';

import ChavePedidoEstoque from '../pages/Chaves/container/estoque/Chave.PedidoEstoque.Grid';
import ChavePedidoEstoqueCadastro from '../pages/Chaves/container/estoque/Chave.PedidoEstoque.New';

import AmolacaoGrid from '../pages/Amolacao/container/amolacao.grid';
import AmolacaoNew from '../pages/Amolacao/container/amolacao.new';

import ServicosGrid from '../pages/Servicos/container/servicos.grid';
import ServicosNew from '../pages/Servicos/container/servicos.new';

import Historicos from '../pages/Historico/Historico.Index';

import EstatisticasChaves from '../pages/Estatistica/Chaves/estatistica.chave';
import EstatisticasAmolacoes from '../pages/Estatistica/Amolacoes/estatistica.Amolacoes';
import EstatisticasServicos from '../pages/Estatistica/Servicos/estatistica.servicos';

import Configuracoes from '../pages/Configuracao/configuracao';

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

                     <Route exact path={Rotas.ChavePedidoEstoque} component={ChavePedidoEstoque} />
                     <Route exact path={Rotas.ChavePedidoEstoqueCadastro} component={ChavePedidoEstoqueCadastro} />


                     <Route exact path={Rotas.AmolacaoEstoque} component={AmolacaoGrid} />
                     <Route exact path={Rotas.AmolacaoCadastro} component={AmolacaoNew} />

                     <Route exact path={Rotas.Servico} component={ServicosGrid} />
                     <Route exact path={Rotas.ServicoNew} component={ServicosNew} />

                     <Route exact path={Rotas.Historicos} component={Historicos} />

                     <Route exact path={Rotas.EstatisticasChave} component={EstatisticasChaves} />
                     <Route exact path={Rotas.EstatisticasAmolacoes} component={EstatisticasAmolacoes} />
                     <Route exact path={Rotas.EstatisticasServicos} component={EstatisticasServicos} />

                     <Route exact path={Rotas.Configuracoes} component={Configuracoes} />
                     
                     <Route path="*" component={Erro} />
                 </Switch>
            }
        </>
    );
}

export default Routes;