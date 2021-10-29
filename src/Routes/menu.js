import React from 'react';
import { Menu, Switch } from "antd";
import { Rotas } from './rotas';
import { 
    AiOutlineHome,
    AiOutlineLineChart,  
    AiOutlineFork,
    AiOutlineInsertRowBelow,
    AiOutlinePlusCircle,
    AiOutlinePlusSquare ,
    AiOutlineTool,
    AiOutlineSetting,
    AiOutlineDollar,
    AiOutlineFileDone
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
                    width: '256px',
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
                    <Menu.Item key="Chaves.Venda" onClick={(e) => HandleClickLink(e, Rotas.ChavesVenda)} icon={<AiOutlineDollar />}>
                        Vendas
                    </Menu.Item>
                    <Menu.Item key="Chaves.Historico" onClick={(e) => HandleClickLink(e, Rotas.ChavesHistorico)} icon={<AiOutlineFileDone />}>
                        Histórico
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="Alicates" icon={<AiOutlineFork />} title="Alicates">
                    <Menu.Item key="Alicates.Grid" onClick={(e) => HandleClickLink(e, Rotas.Alicates)} icon={<AiOutlineInsertRowBelow />}>
                        Tabela
                    </Menu.Item>
                    <Menu.Item key="Alicates.New" onClick={(e) => HandleClickLink(e, Rotas.AlicatesNew)} icon={<AiOutlinePlusSquare />}>
                        Cadastro
                    </Menu.Item>
                    <Menu.Item key="Alicates.Historico" onClick={(e) => HandleClickLink(e, Routes.AlicatesHistorico)} icon={<AiOutlineFileDone />}>
                        Histórico
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="Servicos" icon={<AiOutlineTool />} title="Serviços">
                    <Menu.Item key="4" onClick={(e) => HandleClickLink(e, Rotas.Alicates)} icon={<AiOutlineInsertRowBelow />}>
                        Tabela
                    </Menu.Item>
                    <Menu.Item key="5" onClick={(e) => HandleClickLink(e, Rotas.AlicatesNew)} icon={<AiOutlinePlusSquare />}>
                        Cadastro
                    </Menu.Item>
                    <Menu.Item key="6" onClick={(e) => HandleClickLink(e, Routes.AlicatesHistorico)} icon={<AiOutlineFileDone />}>
                        Histórico
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="Estatisticas" icon={<AiOutlineLineChart />} title="Estatisticas">
                    <Menu.Item key="1" onClick={(e) => HandleClickLink(e, Rotas.Alicates)}>
                        Chaves
                    </Menu.Item>
                    <Menu.Item key="2" onClick={(e) => HandleClickLink(e, Rotas.AlicatesNew)}>
                        Alicates
                    </Menu.Item>
                    <Menu.Item key="3" onClick={(e) => HandleClickLink(e, Routes.AlicatesHistorico)}>
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