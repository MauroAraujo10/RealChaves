import React from 'react';
import { Menu, Switch } from "antd";
import { Rotas } from './rotas';
import {
    AiOutlineHome,
    AiOutlineLineChart,
    AiOutlineFork,
    AiOutlineInsertRowBelow,
    AiOutlinePlusCircle,
    AiOutlinePlusSquare,
    AiOutlineTool,
    AiOutlineSetting,
    AiOutlineFileDone,
    AiOutlineRead,
    AiOutlineSnippets,
    AiOutlineDownSquare,
    AiOutlineHdd
} from 'react-icons/ai';

import { VscKey } from "react-icons/vsc";

import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Routes() {
    const history = useHistory();
    const [theme, setTheme] = useState('light');

    const { SubMenu } = Menu;
    const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
    const [openKeys, setOpenKeys] = React.useState(['sub1']);

    function HandleClickLink(e, route) {
        history.push(route);
    }
    const onOpenChange = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    function changeTheme(value) {
        setTheme(value ? 'dark' : 'light')
    }

    function changePagination(value) {

    }

    return (
        <Menu
            mode="inline"
            style={{
                width: '260px',
                boxShadow: '5px 2px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)'
            }}
            theme={theme}
            openKeys={openKeys}
            onOpenChange={onOpenChange}>
            <Menu.Item key="Home" onClick={(e) => HandleClickLink(e, Rotas.Home)} icon={<AiOutlineHome />}>
                Início
            </Menu.Item>
            <SubMenu key="Chaves" icon={<VscKey />} title="Chaves">
                <Menu.Item key="Chaves.Grid" onClick={(e) => HandleClickLink(e, Rotas.Chaves)} icon={<AiOutlineInsertRowBelow />}>
                    Tabela
                </Menu.Item>
                <Menu.Item key="Chaves.Cadastro" onClick={(e) => HandleClickLink(e, Rotas.ChavesCadastro)} icon={<AiOutlinePlusCircle />}>
                    Cadastro
                </Menu.Item>

                <SubMenu key="Chaves.Estoque" icon={<AiOutlineFileDone />} title="Estoque">
                    <Menu.Item key="Chaves.Estoque.TabelaPedido" onClick={(e) => HandleClickLink(e, Rotas.ChavesEstoqueTabelaPedido)} >
                        Tabela de Pedidos
                    </Menu.Item>
                    <Menu.Item key="Chaves.Estoque.Pedido" onClick={(e) => HandleClickLink(e, Rotas.ChavesEstoquePedido)} >
                        Fazer pedido
                    </Menu.Item>
                </SubMenu>

                <SubMenu key="Chaves.Historico" icon={<AiOutlineSetting />} title="Histórico">
                    <Menu.Item key="Chaves.Historico.Copia" onClick={(e) => HandleClickLink(e, Rotas.ChavesHistoricoCopias)} icon={<AiOutlineSnippets />}>
                        Cópias
                    </Menu.Item>
                    <Menu.Item key="Chaves.Historico.Descarte" onClick={(e) => HandleClickLink(e, Rotas.ChavesHistoricoDescarte)} icon={<AiOutlineDownSquare />}>
                        Descarte
                    </Menu.Item>
                    <Menu.Item key="Chaves.Historico.PedidoEstoque" onClick={(e) => HandleClickLink(e, Rotas.ChavesHistoricoPedidoEstoque)} icon={<AiOutlineHdd />}>
                        Pedido Estoque
                    </Menu.Item>
                </SubMenu>
            </SubMenu>

            <SubMenu key="Amolacao" icon={<AiOutlineFork />} title="Amolação">
                <Menu.Item key="Amolacao.Estoque" onClick={(e) => HandleClickLink(e, Rotas.AmolacaoEstoque)} icon={<AiOutlineInsertRowBelow />}>
                    Tabela
                </Menu.Item>
                <Menu.Item key="Amolacao.Cadastro" onClick={(e) => HandleClickLink(e, Rotas.AmolacaoCadastro)} icon={<AiOutlinePlusCircle />}>
                    Cadastro de Produto
                </Menu.Item>
                <SubMenu key="Amolacao.Historico" icon={<AiOutlineSetting />} title="Histórico">
                    <Menu.Item key="Amolacao.Historico.Amolacoes" onClick={(e) => HandleClickLink(e, Rotas.AmolacaoHistoricoAmolacoes)} icon={<AiOutlineSnippets />}>
                        Amolações
                    </Menu.Item>
                </SubMenu>
            </SubMenu>

            <SubMenu key="Servicos" icon={<AiOutlineTool />} title="Serviços">
                <Menu.Item key="Servicos.Grid" onClick={(e) => HandleClickLink(e, Rotas.Servico)} icon={<AiOutlineInsertRowBelow />}>
                    Tabela
                </Menu.Item>
                <Menu.Item key="Servicos.New" onClick={(e) => HandleClickLink(e, Rotas.ServicoNew)} icon={<AiOutlinePlusSquare />}>
                    Cadastro
                </Menu.Item>
            </SubMenu>

            <SubMenu key="Estatisticas" icon={<AiOutlineLineChart />} title="Estatisticas">
                <Menu.Item key="Estatisticas.Chave" onClick={(e) => HandleClickLink(e, Rotas.EstatisticasChave)}>
                    Chaves
                </Menu.Item>
                <Menu.Item key="Estatisticas.Alicate" onClick={(e) => HandleClickLink(e, Rotas.EstatisticasAlicates)}>
                    Alicates
                </Menu.Item>
                <Menu.Item key="Estatisticas.servico" onClick={(e) => HandleClickLink(e, Rotas.EstatisticasServicos)}>
                    Serviços
                </Menu.Item>
            </SubMenu>

            <SubMenu key="Configuracoes" icon={<AiOutlineSetting />} title={"Configurações"}>
                <Menu.Item key="Theme">
                    Tema
                        <div className="f-right">
                        <Switch
                            checkedChildren="Dark"
                            unCheckedChildren="Light"
                            onChange={changeTheme}>
                        </Switch>
                    </div>
                </Menu.Item>
                <Menu.Item>
                    Paginação
                    <div className="f-right">
                        <Switch
                            checkedChildren="Sim"
                            unCheckedChildren="Não"
                            onChange={changePagination}>
                        </Switch>
                    </div>
                </Menu.Item>
            </SubMenu>
        </Menu >
    );
}