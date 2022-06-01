import React from 'react';
import { Modal, Divider } from 'antd'

import TituloModal from '../../../common/components/TituloModal/TituloModal';
import BotaoCadastrar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';

const ChaveEstoqueViewPedidoModal = ({ visible, onClose, pedidoSelecionado }) => {

    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            footer={null}
            destroyOnClose
        >

            <TituloModal titulo={'Visualizar detalhes de pedido'} />

            {/* Refatora: Adicionar os campos que irão ser mostrados, Usar Lista Antd */}
            {
                pedidoSelecionado?.Chaves?.map((x) => {
                    return (
                        <>
                            <ul key={x.key} >
                                <li>{`Marca: ${x.Marca}`}</li>
                                <li>{`Quantidade Solicitda: ${x.QuantidadeSolicitada}`}</li>
                                <Divider />
                            </ul>
                        </>
                    );
                })
            }

            <BotaoCadastrar
                isView
                funcaoCancelar={onClose}
            />
        </Modal>
    );
}

export default ChaveEstoqueViewPedidoModal;