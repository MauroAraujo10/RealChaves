import React, { useEffect, useState } from 'react';
import { Modal, List, Badge } from 'antd'

import TituloModal from '../../../common/components/TituloModal/TituloModal';
import BotaoCadastrar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';

const ChaveEstoqueViewPedidoModal = ({ visible, onClose, pedidoSelecionado }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        let listaPedidos = [];
        if (pedidoSelecionado && pedidoSelecionado.Chaves) {
            pedidoSelecionado.Chaves.forEach((x, index) => {
                listaPedidos.push(
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div className="mr-2">
                            <Badge count={index + 1} />
                        </div>
                        <div>
                            Marca: <b>{x.Marca}</b> - Número de Série: <b>{x.NumeroSerie}</b>
                            <br />
                            Quantidade solicitada: <b>{x.QuantidadeSolicitada}</b>
                        </div>
                    </div>
                )
            });
            setData(listaPedidos);
        }
    }, [pedidoSelecionado]);

    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            footer={null}
            destroyOnClose
        >

            <TituloModal titulo={'Visualizar detalhes de pedido'} />

            <List
                header={<div>Chaves</div>}
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
    );
}

export default ChaveEstoqueViewPedidoModal;