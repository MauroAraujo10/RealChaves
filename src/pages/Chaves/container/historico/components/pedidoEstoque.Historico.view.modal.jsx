import React, { useEffect } from 'react';
import { Modal, Divider } from 'antd';

import TituloModal from '../../../../../common/components/TituloModal/TituloModal';
import BotaoCadastrar from '../../../../../common/components/BotaoCadastrar/BotaoCadastrar';

const PedidoEstoqueHistoricoViewModal = ({ visible, onClose, pedidoSelecionado }) => {

    useEffect(() => {
        console.log(pedidoSelecionado);
    }, [pedidoSelecionado])

    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            footer={null}
            destroyOnClose
        >
            <TituloModal titulo={'Visualizar detalhe sobre baixa'} />

            {/* Refatora: Adicionar os campos que irão ser mostrados */}
            {/* {Refatora: Mostrar as chaves pedidas por marca, numero serie etc...} */}
            Chaves Solicitadas: <br />
            {pedidoSelecionado?.ListaChaves?.map((x) => (
                <>
                    <ul key={x.key}>
                        <li>{`Quantidade Solicitada: ${x.QuantidadeSolicitada}`}</li>
                        <li>{`Quantidade Recebida: ${x.QuantidadeRecebida}`}</li>
                    </ul>
                    <Divider />
                </>
            ))}

            <BotaoCadastrar
                isView
                funcaoCancelar={onClose}
            />
        </Modal>
    )
}

export default PedidoEstoqueHistoricoViewModal;