import React, { useState, useEffect } from 'react';
import { Modal, Button, List, Badge } from 'antd';
import { messages } from '../../../common/Enum/messages';
import { toast } from 'react-toastify';

import chaveService from '../service/chave.service';
import { AiOutlinePrinter } from "react-icons/ai";

const ChavesEstoquePedidoModal = ({ visible, onClose, closeDrawer, quantidadeTotal, listaPedidos }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        let pedidos = [];
        if (listaPedidos) {
            listaPedidos.forEach((x, index) => {
                pedidos.push(
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div className="mr-2">
                            <Badge count={index + 1} />
                        </div>
                        <div>
                            Marca: <b>{x.Marca}</b> - Número de Série: <b>{x.NumeroSerie}</b>
                            <br />
                            Quantidade em estoque: <b>{x.Quantidade}</b>
                            <br />
                            Quantidade Solicitada: <b>{x.QuantidadeSolicitada}</b>
                        </div>
                    </div>
                )
            })
        }
        setData(pedidos);
    }, [quantidadeTotal]);

    const submitForm = () => {
        let lista = [];

        listaPedidos.forEach((x) => {
            lista.push({
                IdChave: x.Id,
                Marca: x.Marca,
                NumeroSerie: x.NumeroSerie,
                key: x.Id,
                Data: x.Data,
                QuantidadeSolicitada: x.QuantidadeSolicitada
            })
        });

        chaveService.postPedidoEstoque(lista, quantidadeTotal)
            .then(() => {
                toast.success(messages.cadastradoSucesso('Pedido de estoque'));
                listaPedidos.splice(0, listaPedidos.length);
                onClose();
                closeDrawer();
            })
            .catch(() => {
                toast.error(messages.cadastradoErro('Pedido de estoque'));
            });
    }

    const handlePrint = () => {
        toast.warning(messages.funcionalidadeIndisponivel)
    }

    return (
        <>
            <Modal
                title={'Revise o seu pedido'}
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
                <List
                    header={<div><b>Lista Pedido de chaves</b></div>}
                    footer={<div>Quantidade Total: <b>{quantidadeTotal}</b></div>}
                    bordered
                    dataSource={data}
                    renderItem={(item) => <List.Item>{item}</List.Item>}
                />
            </Modal>
        </>
    );
}

export default ChavesEstoquePedidoModal;
