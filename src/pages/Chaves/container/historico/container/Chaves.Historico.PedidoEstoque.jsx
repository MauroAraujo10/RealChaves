import React, { useEffect, useState } from 'react';
import { Tooltip, Tag } from 'antd';
import { TagStatusEnum } from '../../../../../common/Enum/TagStatusEnum';
import HeaderForm from '../../../../../common/components/HeaderForm/HeaderForm';
import Loading from '../../../../../common/components/Loading/Loading';
import Grid from '../../../../../common/components/Grid/Grid';
import service from '../../../../../service';
import tabelas from '../../../../../common/Enum/tabelas';

import PedidoEstoqueHistoricoViewModal from '../components/pedidoEstoque.Historico.view.modal';
import { AiOutlineEye } from "react-icons/ai";

const ChavesHistoricoPedidoEstoque = () => {
    const [estoque, setEstoque] = useState([]);
    const [quantidadeTotal, setQuantidadeTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [pedidoSelecionado, setPedidoSelecionado] = useState([]);
    const [pedidoEstoqueViewModal, setPedidoEstoqueViewModal] = useState(false);

    useEffect(() => {
        setLoading(true);
        service.app.ref(tabelas.BaixaPedidoChaves).on('value', snap => {
            let estoque = [];
            let quantidadeTotal = 0;
            snap.forEach((x) => {
                estoque.push({
                    key: x.key,
                    DataPedido: x.val().DataPedido,
                    DataBaixa: x.val().DataBaixa,
                    QuantidadeSolicitada: x.val().QuantidadePedidaTotal,
                    QuantidadeRecebida: x.val().QuantidadeRecebidaTotal,
                    Empresa: x.val().Empresa,
                    Valor: x.val()?.Valor?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                    ListaChaves: x.val().ListaChaves ? x.val().ListaChaves : [],
                    Status:
                        x.val().Status ===
                            TagStatusEnum.Completo ? <Tag color={'green'}> {TagStatusEnum.Completo} </Tag> :
                            TagStatusEnum.Incompleto ? <Tag color={'red'}> {TagStatusEnum.Incompleto} </Tag> :
                                TagStatusEnum.Excedente ? <Tag color={'blue'}> {TagStatusEnum.Excedente} </Tag> : ''
                })
                quantidadeTotal += x.val().QuantidadeRecebidaTotal;
                setEstoque([]);
                setEstoque(estoque);
            })
            setQuantidadeTotal(quantidadeTotal);
            setLoading(false);
        });
    }, []);

    const columns = [
        { title: 'Data do Pedido', dataIndex: 'DataPedido', key: 'DataPedido', width: '10%' },
        { title: 'Data da Baixa', dataIndex: 'DataBaixa', key: 'DataBaixa', width: '10%' },
        { title: 'Quantidade Solicitada', dataIndex: 'QuantidadeSolicitada', key: 'QuantidadeSolicitada', width: '10%' },
        { title: 'Quantidade Entregue', dataIndex: 'QuantidadeRecebida', key: 'QuantidadeRecebida', width: '10%' },
        { title: 'Empresa', dataIndex: 'Empresa', key: 'Empresa', width: '10%' },
        { title: 'Valor', dataIndex: 'Valor', key: 'Valor', width: '10%' },
        { title: 'Status', dataIndex: 'Status', key: 'Status', width: '10%' },
        {
            title: 'Ações', key: 'acoes', width: '10%', render: (status, dto) => (
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

    const handleVisualizar = (dto) => {
        setPedidoSelecionado(dto);
        setPedidoEstoqueViewModal(true);
    }

    return (
        <div className="t-center mt-2">
            <HeaderForm
                titulo={'Histórico de Baixas em pedidos de estoque'}
                listaCaminhos={['Chaves', 'Histórico', 'Pedidos de Estoque']}
            />
            {
                loading ?
                    <Loading /> :
                    <Grid
                        dataSource={estoque}
                        columns={columns}
                        QuantidadeTotal={quantidadeTotal}
                    />
            }
            <PedidoEstoqueHistoricoViewModal
                visible={pedidoEstoqueViewModal}
                onClose={() => setPedidoEstoqueViewModal(false)}
                pedidoSelecionado={pedidoSelecionado}
            />
        </div>
    );
}

export default ChavesHistoricoPedidoEstoque;