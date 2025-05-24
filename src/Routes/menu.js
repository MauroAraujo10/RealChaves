import React, { useEffect } from 'react';
import { Menu, Switch } from "antd";
import { Rotas } from './rotas';
import service from './service/config.service';
import {
    AiOutlineHome,
    AiOutlineLineChart,
    AiOutlineFork,
    AiOutlineTable,
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

export default function Routes({ configuracoes }) {
    const history = useHistory();
    const [theme, setTheme] = useState('');
    const [outOfAir, setOutOfAir] = useState();

    useEffect(() => {
        setTheme(configuracoes?.DarkTheme ? 'dark' : 'light');
        setOutOfAir(configuracoes?.OutOfAir);
    }, [configuracoes]);

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
        const dto = {
            DarkTheme: value,
            Paginacao: false
        };

        service.post(dto);
        setTheme(value ? 'dark' : 'light');
        window.location.reload();
    }

    return (
        <Menu
         mode="horizontal"
         theme={theme}>
        </Menu>
    );
}