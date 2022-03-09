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
    AiOutlineDollar,
    AiOutlineFileDone,
    AiOutlineDownSquare
} from 'react-icons/ai';

import { VscKey } from "react-icons/vsc";

import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Routes() {
    const history = useHistory();
    const [theme, setTheme] = useState('light');

    function HandleClickLink(e, route) {
        history.push(route);
    }

    function changeTheme(value) {
        setTheme(value ? 'dark' : 'light')
    }

    const { SubMenu } = Menu;
    const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
    const [openKeys, setOpenKeys] = React.useState(['sub1']);

    const onOpenChange = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    return (
        <>
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
                    <Menu.Item key="Chaves.New" onClick={(e) => HandleClickLink(e, Rotas.ChavesNew)} icon={<AiOutlinePlusCircle />}>
                        Cadastro
                    </Menu.Item>
                    <Menu.Item key="Chaves.Copia" onClick={(e) => HandleClickLink(e, Rotas.ChavesCopia)} icon={<AiOutlineDollar />}>
                        Cópias de Chaves
                    </Menu.Item>
                    <Menu.Item key="Chaves.Descarte" onClick={(e) => HandleClickLink(e, Rotas.ChavesDescarte)} icon={<AiOutlineDownSquare />}>
                        Descarte de Chaves
                    </Menu.Item>
                    <SubMenu key="Estoque" icon={<AiOutlineFileDone />} title="Estoque">
                        <Menu.Item key="Estoque.Atualizar" onClick={(e) => HandleClickLink(e, Rotas.ChavesEstoqueAtualizar)} >
                            Atualizar Estoque
                        </Menu.Item>
                        <Menu.Item key="Estoque.Pedido" onClick={(e) => HandleClickLink(e, Rotas.ChavesEstoquePedido)} >
                            Pedido de Chave
                        </Menu.Item>
                        <Menu.Item key="Estoque.Historico" onClick={(e) => HandleClickLink(e, Rotas.ChavesEstoqueHistorico)} >
                            Histórico
                        </Menu.Item>
                    </SubMenu>
                </SubMenu>
                <SubMenu key="Alicates" icon={<AiOutlineFork />} title="Alicates">
                    <Menu.Item key="Alicates.Grid" onClick={(e) => HandleClickLink(e, Rotas.Alicates)} icon={<AiOutlineInsertRowBelow />}>
                        Tabela
                    </Menu.Item>
                    <Menu.Item key="Alicates.New" onClick={(e) => HandleClickLink(e, Rotas.AlicatesNew)} icon={<AiOutlinePlusSquare />}>
                        Cadastro
                    </Menu.Item>
                    <Menu.Item key="Alicates.Historico" onClick={(e) => HandleClickLink(e, Rotas.AlicatesHistorico)} icon={<AiOutlineFileDone />}>
                        Histórico
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="Servicos" icon={<AiOutlineTool />} title="Serviços">
                    <Menu.Item key="Servicos.Grid" onClick={(e) => HandleClickLink(e, Rotas.Servico)} icon={<AiOutlineInsertRowBelow />}>
                        Tabela
                    </Menu.Item>
                    <Menu.Item key="Servicos.New" onClick={(e) => HandleClickLink(e, Rotas.ServicoNew)} icon={<AiOutlinePlusSquare />}>
                        Cadastro
                    </Menu.Item>
                    <Menu.Item key="Servicos.Historico" onClick={(e) => HandleClickLink(e, Rotas.ServicoHistorico)} icon={<AiOutlineFileDone />}>
                        Histórico
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="Estatisticas" icon={<AiOutlineLineChart />} title="Estatisticas">
                    <Menu.Item key="1" onClick={(e) => HandleClickLink(e, Rotas.EstatisticasChave)}>
                        Chaves
                    </Menu.Item>
                    <Menu.Item key="2" onClick={(e) => HandleClickLink(e, Rotas.EstatisticasAlicates)}>
                        Alicates
                    </Menu.Item>
                    <Menu.Item key="3" onClick={(e) => HandleClickLink(e, Rotas.EstatisticasServicos)}>
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
                </SubMenu>
            </Menu>
        </>
    );
}