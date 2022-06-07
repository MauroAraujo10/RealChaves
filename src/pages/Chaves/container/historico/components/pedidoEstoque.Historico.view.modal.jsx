import React, { useEffect, useState } from 'react';
import { Modal, List, Badge, Tag } from 'antd';
import { TagStatusEnum } from '../../../../../common/Enum/TagStatusEnum';

import TituloModal from '../../../../../common/components/TituloModal/TituloModal';
import BotaoCadastrar from '../../../../../common/components/BotaoCadastrar/BotaoCadastrar';

const PedidoEstoqueHistoricoViewModal = ({ visible, onClose, pedidoSelecionado }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        let listaPedidos = [];
        if (pedidoSelecionado && pedidoSelecionado.ListaChaves) {
            pedidoSelecionado.ListaChaves.forEach((x, index) => {
                listaPedidos.push(
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div className="mr-2">
                            <Badge count={index + 1} />
                        </div>
                        <div>
                            Marca: <b>{x.Marca}</b> - Número de Série: <b>{x.NumeroSerie}</b>
                            <br />
                            Quantidade Solicitada: <b>{x.QuantidadeSolicitada}</b>
                            <br />
                            Quantidade Recebida: <b>{x.QuantidadeRecebida}</b>
                            <br />
                            Status: {getStatus(x.QuantidadeSolicitada, x.QuantidadeRecebida)}

                        </div>
                    </div>
                )
            });
            setData(listaPedidos);
        }
    }, [pedidoSelecionado])

    const getStatus = (quantidadeSolicitada, quantidadeRecebida) => {
        if (quantidadeSolicitada > quantidadeRecebida)
            return (<Tag color={'red'}> {TagStatusEnum.Incompleto} </Tag>);

        if (quantidadeSolicitada === quantidadeRecebida)
            return (<Tag color={'green'}> {TagStatusEnum.Completo} </Tag>);

        if (quantidadeSolicitada < quantidadeRecebida)
            return (<Tag color={'blue'}> {TagStatusEnum.Excedente} </Tag>);
    }

    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            footer={null}
            destroyOnClose
        >
            <TituloModal titulo={'Visualizar detalhe sobre baixa'} />

            <List
                // Refatora: Alterar o Header
                header={<div>Header</div>}
                footer={<div>Quantidade total de chaves: <b>{pedidoSelecionado?.QuantidadePedidaTotal}</b></div>}
                bordered
                dataSource={data}
                renderItem={(item) => <List.Item>{item}</List.Item>}
            />

            <BotaoCadastrar
                isView
                funcaoCancelar={onClose}
            />
        </Modal>
    )
}

export default PedidoEstoqueHistoricoViewModal;