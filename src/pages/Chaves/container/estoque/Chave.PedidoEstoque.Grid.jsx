import React, { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import { toast } from 'react-toastify';
import { messages } from '../../../../common/Enum/messages';
import {Rotas} from '../../../../Routes/rotas';

import Grid from '../../../../common/components/Grid/Grid';
import Service from '../../../../services';
import PedidoEstoqueService from '../../../../services/pedido.estoque.service';
import ButtonNovoRegistro from '../../../../common/components/ButtonNovoRegistro/ButtonNovoRegistro';
import tabelas from '../../../../common/Enum/tabelas';
import Loading from '../../../../common/components/Loading/Loading';
import HeaderForm from '../../../../common/components/HeaderForm/HeaderForm';

import ChavePedidoEstoqueViewModal from './Chave.PedidoEstoque.View.Modal';
import ChavePedidoEstoqueBaixaModal from '../../components/Chave.PedidoEstoque.Baixa.Modal';
import YesOrNoModal from '../../../../common/components/yesOrNoModal/yesOrNoModal';

import { AiOutlineLike, AiOutlineEye, AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";

const ChaveEstoqueTabelaPedido = () => {
    const [pedidoSelecionado, setPedidoSelecionado] = useState([]);
    const [quantidadeTotal, setQuantidadeTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [pedidosEstoque, setPedidosEstoque] = useState([]);
    const [viewProdutoModalVisible, setViewProdutoModalVisible] = useState(false);
    const [baixaProdutoModalVisible, setBaixaProdutoModalVisible] = useState(false);
    const [yesOrNoModalVisible, setYesOrNoModalVisible] = useState(false);

    useEffect(() => {
        Service.app.ref(tabelas.PedidoEstoque).on('value', (snapshot) => {
            setLoading(true);
            let pedido = [];
            let quantidadeTotal = 0;
            snapshot.forEach((x) => {

                if (!x.val().Entregue) {

                    pedido.push({
                        Id: x?.key,
                        Chaves: x.val()?.Chaves,
                        Modelos: x.val()?.Chaves.length ? x.val().Chaves.length : 0,
                        DataPedido: x.val()?.DataPedido,
                        QuantidadeTotal: x.val()?.QuantidadeTotal
                    })
                    quantidadeTotal = quantidadeTotal + x.val().QuantidadePedidaTotal

                }
            })
            setPedidosEstoque(pedido);
            setQuantidadeTotal(quantidadeTotal);
            setLoading(false);
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

    const deletarPedidoEstoque = async (id) => {
        await PedidoEstoqueService.HardDeletePedidoEstoque(id)
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
        { title: 'Quantidade Total', dataIndex: 'QuantidadeTotal', key: 'QuantidadeTotal', width: '10%' },
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

            <HeaderForm
                titulo={'Pedidos de Estoque'}
                listaCaminhos={['Chaves', 'Pedidos de Estoque']}
            />

            <ButtonNovoRegistro
                tooltipTitle={'Cadastrar um pedido de estoque'}
                route={Rotas.ChavePedidoEstoqueCadastro}
                icon={<AiOutlinePlus size={16} className='mr-1' />}
                buttonText={'Novo pedido de estoque'}
            />

            {
                loading ?
                    <Loading /> :
                    <Grid
                        dataSource={pedidosEstoque}
                        columns={columns}
                        QuantidadeTotal={quantidadeTotal}
                    />
            }

            <ChavePedidoEstoqueViewModal
                visible={viewProdutoModalVisible}
                onClose={() => setViewProdutoModalVisible(false)}
                pedidoSelecionado={pedidoSelecionado}
            />

            <ChavePedidoEstoqueBaixaModal
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