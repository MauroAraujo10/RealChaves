import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { Rotas } from '../../../Routes/rotas';

import tabelas from '../../../common/Messages/tabelas';
import service from '../../../service';
import Grid from '../../../common/components/Grid/Grid';

import { AiOutlineHome } from "react-icons/ai";

const RelatorioChaveDescarte = () => {
    const [descartados, setDescartados] = useState([]);

    const columns = [
        { title: 'Data do Descarte', dataIndex: 'Data', key: 'Data', width: '25%' },
        { title: 'Motivo', dataIndex: 'Motivo', key: 'Motivo', width: '35%' },
        { title: 'Quantidade Descartada', dataIndex: 'QuantidadeDescartada', key: 'QuantidadeDescartada', width: '20%' },
        {
            title: 'Ações', width: '10%', render: (status, x) => (
                <>
                </>
            )
        }
    ];

    useEffect(() => {
        service.app.ref(tabelas.Descarte).on('value', (snapshot) => {
            let descartados = [];
            snapshot.forEach((x) => {
                descartados.push({
                    Id: x.key,
                    key: x.key,
                    IdChave: x.val().IdChave,
                    QuantidadeDescartada: x.val().QuantidadeDescartada,
                    Motivo: x.val().Motivo,
                    Data: x.val().Data
                })
            })
            setDescartados(descartados);
        });
    }, []);

    return (
        <div className="mt-2">
            <div className="t-center">
                <h1>Chaves Descartadas</h1>
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
                        Chaves Descartadas
                        </Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <Grid
                dataSource={descartados}
                columns={columns}
            />
        </div>
    );
}

export default RelatorioChaveDescarte;