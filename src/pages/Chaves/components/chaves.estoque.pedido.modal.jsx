import React from 'react';
import { Modal, Button } from 'antd';
import { messages } from '../../../common/Messages/messages';
import { toast } from 'react-toastify';

import moment from 'moment';
import chaveService from '../service/chave.service';

import { AiOutlinePrinter } from "react-icons/ai";

const ChavesEstoquePedidoModal = ({ title, visible, onClose, listaPedidos, quantidadeTotal }) => {

    const handlePrint = () => {
        toast.warning(messages.funcionalidadeIndisponivel)
    }

    const submitForm = () => {
        let lista = [];
        
        listaPedidos.forEach((x) => {
            lista.push({
                Id: x.Id,
                QuantidadeSolicitada: x.QuantidadeSolicitada
            })
        });

        chaveService.postPedidoEstoque(lista, quantidadeTotal)
            .then(() => {
                toast.success(messages.cadastradoSucesso('Pedido de estoque'));
                listaPedidos.splice(0, listaPedidos.length);
                onClose();
            })
            .catch(() => {
                toast.error(messages.cadastradoErro('Pedido de estoque'));
            });
    }

    return (
        <>
            <Modal
                title={title}
                visible={visible}
                footer={(
                    <>
                        <Button onClick={onClose}>
                            Cancelar
                        </Button>

                        <Button onClick={handlePrint}>
                            <AiOutlinePrinter className="mr-3" />
                            Imprimir
                        </Button>
                        <Button
                            onClick={() => submitForm()}
                            type="primary"
                        >
                            Salvar
                        </Button>
                    </>
                )}
            >
                {
                    listaPedidos.map((x) => {
                        return (
                            <ul key={x.Id}>
                                <h2>Marca: {x.Marca}</h2>
                                <li>Número de Série: <strong>{x.NumeroSerie}</strong></li>
                                <li>Tipo: <strong>{x.Tipo}</strong></li>
                                <li>Quantidade em Estoque: <strong>{x.Quantidade}</strong></li>
                                <li>Quantidade solicitada: <strong>{x.QuantidadeSolicitada}</strong></li>
                                <hr />
                            </ul>
                        );
                    })
                }
                <ul
                    key='ul'
                    style={{
                        textAlign: 'right',
                        listStyleType: 'none'
                    }}>
                    <li>
                        Quantidade Total:
                            <strong className="ml-1">
                            {quantidadeTotal}
                        </strong>
                    </li>
                    <li>
                        Data:
                            <strong className="ml-1">
                            {moment().format('DD/MM/yyyy')}
                        </strong>
                    </li>
                </ul>
            </Modal>
        </>
    );
}

export default ChavesEstoquePedidoModal;
