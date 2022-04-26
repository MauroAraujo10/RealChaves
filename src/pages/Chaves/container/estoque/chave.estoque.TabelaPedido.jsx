import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Tooltip } from 'antd';
import { Rotas } from '../../../../Routes/rotas';

import Grid from '../../../../common/components/Grid/Grid';
import service from '../../../../service';
import tabelas from '../../../../common/Messages/tabelas';

import ChaveEstoqueBaixaPedidoModal from '../../components/chaves.estoque.baixaPedido.modal';

import { AiOutlineHome, AiOutlineLike, AiOutlineDislike, AiOutlineSelect, AiOutlineEye } from "react-icons/ai";

const ChaveEstoqueTabelaPedido = () => {
    const [idProduto, setIdProduto] = useState([]);
    const [pedidosEstoque, setPedidosEstoque] = useState([]);
    const [baixaProdutoModalVisible, setBaixaProdutoModalVisible] = useState(false);

    useEffect(() => {
        service.app.ref(tabelas.PedidoEstoque).on('value', (snapshot) => {
            let pedido = [];
            snapshot.forEach((x) => {
                pedido.push({
                    Id: x.key,
                    Chaves: x.val().Chaves,
                    Data: x.val().Data,
                    QuantidadeTotal: x.val().QuantidadeTotal,
                    Status: x.val().Status ? <AiOutlineLike size={24} /> : <AiOutlineDislike size={20} />
                })
            })
            setPedidosEstoque(pedido);
        })

    }, []);

    const handleVisualizar = (id) => {

    }

    const handleBaixaPedido = (id) => {
        setIdProduto(id);
        setBaixaProdutoModalVisible(true);
    }

    const columns = [
        { title: 'Id', dataIndex: 'Id', key: 'Id', width: '10%' },
        { title: 'Data', dataIndex: 'Data', key: 'Data', width: '10%' },
        { title: 'QuantidadeTotal', dataIndex: 'QuantidadeTotal', key: 'QuantidadeTotal', width: '10%' },
        { title: 'Status', dataIndex: 'Status', key: 'Status', width: '5%' },
        {
            title: 'Ações', width: '10%', render: (status, pedido) => (
                <div style={{ display: 'flex' }}>
                    <Tooltip title="Visualizar">
                        <AiOutlineEye
                            className="mr-2"
                            size={20}
                            onClick={() => handleVisualizar(pedido.Id)}
                        />
                    </Tooltip>
                    <Tooltip title="Baixa em Pedido">
                        <AiOutlineSelect
                            className="mr-2 iconVendaChave"
                            size={20}
                            onClick={() => handleBaixaPedido(pedido.Id)}
                        />
                    </Tooltip>
                </div>
            )
        }
    ]


    return (
        <div className="mt-2">
            <div className="t-center">
                <h1>Tabela de Pedidos de Estoque</h1>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to={Rotas.Home}>
                            <AiOutlineHome className="mr-1" />
                            Início
                            </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Tabela de Pedidos de Estoque</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <Grid
                dataSource={pedidosEstoque}
                columns={columns}
            />

            <ChaveEstoqueBaixaPedidoModal
                visible={baixaProdutoModalVisible}
                onClose={() => setBaixaProdutoModalVisible(false)}
                pedidoSelecionado={idProduto}
            />

        </div>
    );
}

export default ChaveEstoqueTabelaPedido;