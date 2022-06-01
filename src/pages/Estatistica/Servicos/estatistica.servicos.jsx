import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { Rotas } from '../../../Routes/rotas';

import { AiOutlineHome } from "react-icons/ai";

const EstatisticaServicos = () => {

    return (
        <>
            <div className="t-center mb-2">
                <h1>Estatísticas Serviços</h1>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to={Rotas.Home}>
                            <AiOutlineHome className="mr-1" />
                            Início
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >Estatísticas</Breadcrumb.Item>
                    <Breadcrumb.Item >Serviços</Breadcrumb.Item>
                </Breadcrumb>
            </div>
        </>
    );
}

export default EstatisticaServicos;