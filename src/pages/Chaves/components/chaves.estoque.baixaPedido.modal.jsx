import React from 'react';

import { Modal, Button, Form } from 'antd';
import { messages } from '../../../common/Messages/messages';
import { toast } from 'react-toastify';

import moment from 'moment';
import chaveService from '../service/chave.service';

import TituloModal from '../../../common/components/TituloModal/TituloModal';
import BotaoCadastrar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';

import { AiOutlinePrinter } from "react-icons/ai";

const ChavesEstoquePedidoModal = ({ title, visible, onClose, listaPedidos, quantidadeTotal }) => {

    const submitForm = (form) => {

        //Lembrar de deletar da Tabela PedidoEstoque
    }

    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            footer={null}
            destroyOnClose
        >

            <TituloModal
                titulo={'Baixa de Lista de Pedidos'}
                subTitulo={''}
            />

            <Form onFinish={submitForm} layout='vertical'>

                <BotaoCadastrar
                    possuiCancelar
                    funcaoCancelar={onClose}
                />

            </Form>

        </Modal>
    );
}

export default ChavesEstoquePedidoModal;
