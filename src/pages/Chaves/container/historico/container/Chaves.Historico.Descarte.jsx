import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { Rotas } from '../../../../../Routes/rotas';

import tabelas from '../../../../../common/Enum/tabelas';
import service from '../../../../../service';
import Grid from '../../../../../common/components/Grid/Grid';

import { AiOutlineHome } from "react-icons/ai";

const ChavesHistoricoDescarte = () => {
    const [descartados, setDescartados] = useState([]);

    const columns = [
        { title: 'Data do Descarte', dataIndex: 'Data', key: 'Data', width: '10%' },
        { title: 'Marca', dataIndex: 'Marca', key: 'Marca', width: '30%' },
        { title: 'Número de Série', dataIndex: 'NumeroSerie', key: 'NumeroSerie', width: '20%' },
        { title: 'Motivo', dataIndex: 'Motivo', key: 'Motivo', width: '30%' },
        { title: 'Quantidade Descartada', dataIndex: 'QuantidadeDescartada', key: 'QuantidadeDescartada', width: '10%' },
    ];

    useEffect(() => {
        let descartados = [];
        service.app.ref(tabelas.Descarte).once('value', snap => {
            snap.forEach((descarte) => {
                service.app.ref(tabelas.Chave).child(descarte.val().IdChave).on('value', chave => {
                    descartados.push({
                        Id: descarte?.key,
                        key: descarte?.key,
                        Data: descarte.val()?.Data,
                        Marca: chave.val()?.Marca,
                        NumeroSerie: chave.val()?.NumeroSerie,
                        Motivo: descarte.val()?.Motivo,
                        QuantidadeDescartada: descarte.val()?.Quantidade,
                    });
                    setDescartados([]);
                    setDescartados(descartados);
                })
            })
        });
    }, []);

    return (
        <div className="mt-2">
            <div className="t-center">
                <h1>Histórico de Chaves Descartadas</h1>
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

export default ChavesHistoricoDescarte;