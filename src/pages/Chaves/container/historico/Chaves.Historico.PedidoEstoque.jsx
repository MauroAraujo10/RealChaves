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
        { title: 'Quantidade Pedida', dataIndex: 'QuantidadePedida', key: 'QuantidadePedida', width: '10%' },
        { title: 'Quantidade Entregue', dataIndex: 'QuantidadeEntregue', key: 'QuantidadeEntregue', width: '10%' },
        { title: 'Valor (R$)', dataIndex: 'Valor', key: 'Valor', width: '10%' },
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
        let estoque = [];

        service.app.ref(tabelas.BaixaPedidoChaves).on('value', snap => {
            snap.forEach((baixaPedido) => {
                service.app.ref(tabelas.PedidoEstoque).child(baixaPedido.val().IdPedido).on('value', pedido => {
                    estoque.push({
                        Id: baixaPedido.key,
                        key: baixaPedido.key,
                        DataPedido: pedido.val()?.Data,
                        DataBaixa: baixaPedido.val().Data,
                        QuantidadePedida: pedido.val().QuantidadePedidaTotal,
                        QuantidadeEntregue: baixaPedido.val().QuantidadeEntregue,
                        // Valor: x.val().Valor,
                        // Chaves: x.val().Chaves
                    })
                    setEstoque([]);
                    setEstoque(estoque);
                })
            })
        });
    }, []);

    const handleVisualizar = () => {

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