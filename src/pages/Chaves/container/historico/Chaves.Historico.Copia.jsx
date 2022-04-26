import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { Rotas } from '../../../../Routes/rotas';

import tabelas from '../../../../common/Messages/tabelas';
import service from '../../../../service';

import Grid from '../../../../common/components/Grid/Grid';

import { AiOutlineHome } from "react-icons/ai";

const ChavesHistoricoCopia = () => {
    const [chaves, setChaves] = useState([]);
    const columns = [
        { title: 'IdProduto', dataIndex: 'IdProduto', key: 'IdProduto', width: '30%' },
        { title: 'Quantidade', dataIndex: 'Quantidade', key: 'Quantidade', width: '20%' },
        { title: 'Valor (R$)', dataIndex: 'Valor', key: 'Valor', width: '10%' },
        { title: 'Data da Cópia', dataIndex: 'Data', key: 'Data', width: '10%' },
    ];

    useEffect(() => {
        service.app.ref(tabelas.CopiasChave).on('value', (snapshot) => {
            let chaves = [];
            snapshot.forEach((x) => {
                chaves.push({
                    Id: x.key,
                    IdProduto: x.val().IdProduto,
                    Quantidade: x.val().Quantidade,
                    Valor: x.val().Valor,
                    Data: x.val().Data,

                })
            })
            setChaves(chaves);
        });
    }, []);

    return (
        <div className="mt-2">
            <div className="t-center">
                <h1>Histórico de Cópia de Chaves</h1>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to={Rotas.Home}>
                            <AiOutlineHome className="mr-1" />
                            Início
                            </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to={Rotas.Chaves}>
                            Chaves
                            </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        Cópia de Chaves
                        </Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <Grid
                dataSource={chaves}
                columns={columns}
            />

        </div>
    );

}

export default ChavesHistoricoCopia;