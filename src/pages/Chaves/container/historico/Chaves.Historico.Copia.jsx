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
        { title: 'Data da Cópia', dataIndex: 'Data', key: 'Data', width: '10%' },
        { title: 'Marca', dataIndex: 'Marca', key: 'Marca', width: '30%' },
        { title: 'Número de Série', dataIndex: 'NumeroSerie', key: 'NumeroSerie', width: '30%' },
        { title: 'Quantidade', dataIndex: 'Quantidade', key: 'Quantidade', width: '20%' },
        { title: 'Valor (R$)', dataIndex: 'Valor', key: 'Valor', width: '10%' },
    ];

    useEffect(() => {
        let copia = [];
        service.app.ref(tabelas.CopiasChave).once('value', snap => {
            snap.forEach((copiaChave) => {
                service.app.ref(tabelas.Chave).child(copiaChave.val().IdChave).on('value', chave => {
                    copia.push({
                        Id: copiaChave.key,
                        key: copiaChave.key,
                        Marca: chave.val().Marca,
                        NumeroSerie: chave.val().NumeroSerie,
                        Data: copiaChave.val().Data,
                        Quantidade: copiaChave.val().Quantidade,
                        Valor: copiaChave.val().Valor
                    });
                    setChaves([]);
                    setChaves(copia);
                })
            })
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