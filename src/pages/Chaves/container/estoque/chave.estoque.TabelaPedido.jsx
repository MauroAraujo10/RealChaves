import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Tooltip } from 'antd';
import { Rotas } from '../../../../Routes/rotas';
import { toast } from 'react-toastify';
import { messages } from '../../../../common/Enum/messages';

import Grid from '../../../../common/components/Grid/Grid';
import service from '../../../../service';
import tabelas from '../../../../common/Enum/tabelas';

import ChaveEstoqueViewPedidoModal from '../../components/chave.estoque.viewPedido.modal';
import ChaveEstoqueBaixaPedidoModal from '../../components/chaves.estoque.baixaPedido.modal';
import YesOrNoModal from '../../../../common/components/yesOrNoModal/yesOrNoModal';

import { AiOutlineHome, AiOutlineLike, AiOutlineEye, AiOutlineDelete } from "react-icons/ai";

const ChaveEstoqueTabelaPedido = () => {
    const [pedidoSelecionado, setPedidoSelecionado] = useState([]);
    const [pedidosEstoque, setPedidosEstoque] = useState([]);
    const [viewProdutoModalVisible, setViewProdutoModalVisible] = useState(false);
    const [baixaProdutoModalVisible, setBaixaProdutoModalVisible] = useState(false);
    const [yesOrNoModalVisible, setYesOrNoModalVisible] = useState(false);

    useEffect(() => {
        //REFATORA: Arrumar quais colunas vão aparecer na grid
        service.app.ref(tabelas.PedidoEstoque).on('value', (snapshot) => {
            let pedido = [];
            snapshot.forEach((x) => {
                pedido.push({
                    Id: x?.key,
                    key: x?.key,
                    Chaves: x.val()?.Chaves,
                    Modelos: x.val()?.Chaves.length ? x.val().Chaves.length : 0,
                    DataPedido: x.val()?.DataPedido,
                    QuantidadePedidaTotal: x.val()?.QuantidadePedidaTotal
                })
            })
            setPedidosEstoque(pedido);
        })
    }, []);


    const funcaoAbrirModal = (pedido, funcioalidade) => {

        setPedidoSelecionado(pedido);

        switch (funcioalidade) {
            case 'Visualizar': setViewProdutoModalVisible(true); break;
            case 'Baixar': setBaixaProdutoModalVisible(true); break;
            case 'Deletar': setYesOrNoModalVisible(true); break;
            default: break;
        }
    }

    const deletarPedidoEstoque = (id) => {
        service.app.ref(tabelas.PedidoEstoque).child(id).remove()
            .then(() => {
                toast.success(messages.exclusaoSucesso);
                setYesOrNoModalVisible(false);
            })
            .catch(() => {
                toast.error(messages.exclusaoErro('pedido de estoque'));
            })
    }

    const columns = [
        { title: 'Data do Pedido', dataIndex: 'DataPedido', key: 'DataPedido', width: '10%' },
        { title: 'Modelos', dataIndex: 'Modelos', key: 'Modelos', width: '10%' },
        { title: 'Quantidade Total', dataIndex: 'QuantidadePedidaTotal', key: 'QuantidadePedidaTotal', width: '10%' },
        {
            title: 'Ações', key: 'acoes', width: '10%', render: (status, pedido) => (
                <div style={{ display: 'flex' }}>
                    <Tooltip title="Visualizar">
                        <AiOutlineEye
                            className="mr-2"
                            size={20}
                            onClick={() => funcaoAbrirModal(pedido, 'Visualizar')}
                        />
                    </Tooltip>
                    <Tooltip title="Baixa em Pedido">
                        <AiOutlineLike
                            className="mr-2 iconVendaChave"
                            size={20}
                            onClick={() => funcaoAbrirModal(pedido, 'Baixar')}
                        />
                    </Tooltip>
                    <Tooltip title="Deletar">
                        <AiOutlineDelete
                            className="iconExcluir"
                            size={20}
                            onClick={() => funcaoAbrirModal(pedido, 'Deletar')}
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
            {/* Refatora: Grid Perfeita */}
            <Grid
                dataSource={pedidosEstoque}
                columns={columns}
            />

            <ChaveEstoqueViewPedidoModal
                visible={viewProdutoModalVisible}
                onClose={() => setViewProdutoModalVisible(false)}
                pedidoSelecionado={pedidoSelecionado}
            />

            <ChaveEstoqueBaixaPedidoModal
                visible={baixaProdutoModalVisible}
                onClose={() => setBaixaProdutoModalVisible(false)}
                pedidoSelecionado={pedidoSelecionado}
            />

            <YesOrNoModal
                title={'Exclusão de Pedido de estoque'}
                text={'Deseja realmente excluir este pedido de estoque ?'}
                visible={yesOrNoModalVisible}
                onClose={() => setYesOrNoModalVisible(false)}
                onOk={() => deletarPedidoEstoque(pedidoSelecionado.Id)}
            />

        </div>
    );
}

export default ChaveEstoqueTabelaPedido;