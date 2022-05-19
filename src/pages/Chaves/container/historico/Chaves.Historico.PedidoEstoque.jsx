import React, { useEffect, useState } from 'react';
import { Breadcrumb, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { Rotas } from '../../../../Routes/rotas';

import Grid from '../../../../common/components/Grid/Grid';
import service from '../../../../service';
import tabelas from '../../../../common/Messages/tabelas';

import { AiOutlineHome, AiOutlineEye } from "react-icons/ai";

const ChavesHistoricoPedidoEstoque = () => {
    const [estoque, setEstoque] = useState([]);

    const columns = [
        { title: 'Data do Pedido', dataIndex: 'DataPedido', key: 'DataPedido', width: '10%' },
        { title: 'Data da Baixa', dataIndex: 'DataBaixa', key: 'DataBaixa', width: '10%' },
        { title: 'Quantidade Solicitada', dataIndex: 'QuantidadeSolicitada', key: 'QuantidadeSolicitada', width: '10%' },
        { title: 'Quantidade Entregue', dataIndex: 'QuantidadeRecebida', key: 'QuantidadeRecebida', width: '10%' },
        { title: 'Empresa', dataIndex: 'Empresa', key: 'Empresa', width: '10%' },
        { title: 'Valor (R$)', dataIndex: 'Valor', key: 'Valor', width: '10%' },
        { title: 'Status', dataIndex: 'Status', key: 'Status', width: '10%' },
        {
            title: 'Ações', width: '10%', render: (status, dto) => (
                <div style={{ display: 'flex' }}>
                    <Tooltip title="Visualizar">
                        <AiOutlineEye
                            className="mr-2"
                            size={20}
                            onClick={() => handleVisualizar(dto)}
                        />
                    </Tooltip>
                </div>
            )
        }
    ];

    useEffect(() => {
        service.app.ref(tabelas.BaixaPedidoChaves).on('value', snap => {
            let estoque = [];
            snap.forEach((x) => {
                estoque.push({
                    key: x.key,
                    DataPedido: x.val().DataPedido,
                    DataBaixa: x.val().DataBaixa,
                    QuantidadeSolicitada: x.val().QuantidadePedidaTotal,
                    QuantidadeRecebida: x.val().QuantidadeRecebidaTotal,
                    Empresa: x.val().Empresa,
                    Valor: x.val().Valor,
                    Status: x.val().Status,
                    ListaChaves: x.val().ListaChaves
                })
                setEstoque([]);
                setEstoque(estoque);
            })
        });
    }, []);

    const handleVisualizar = (dto) => {
        //Refatora: implemetar visualizar, talvez chamar de detalhes
        console.log(dto)
    }

    return (
        <>
            <div className="t-center mt-2">
                <h1>Histórico de Pedidos de estoque</h1>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to={Rotas.Home}>
                            <AiOutlineHome className="mr-1" />
                            Início
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Histórico de Estoque</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <Grid
                dataSource={estoque}
                columns={columns}
            />
        </>
    );
}

export default ChavesHistoricoPedidoEstoque;