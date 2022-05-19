import React, { useState, useEffect } from 'react';

import { Row, Col, Modal, Form, DatePicker, Input, Table } from 'antd';
import { messages } from '../../../common/Messages/messages';
import { toast } from 'react-toastify';

import chaveService from '../service/chave.service';

import TituloModal from '../../../common/components/TituloModal/TituloModal';
import BotaoCadastrar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';

const ChavesEstoquePedidoModal = ({ visible, onClose, pedidoSelecionado }) => {
    const [listaQuantidadesEntregues, setListaQuantidadesEntregues] = useState([]);
    const [data, setData] = useState();
    const { Column } = Table;

    useEffect(() => {
        setListaQuantidadesEntregues([]);
    }, [pedidoSelecionado]);

    const submitForm = (form) => {
        let quantidadeTotalRecebida = 0;

        const dto = {
            Id: pedidoSelecionado?.Id,
            key: pedidoSelecionado?.Id,
            DataPedido: pedidoSelecionado?.DataPedido,
            DataBaixa: data,
            QuantidadePedidaTotal: pedidoSelecionado?.QuantidadePedidaTotal,
            Valor: parseFloat(form.Valor),
            Empresa: form.Empresa,
            Status: 'Completo',
            ListaChaves: [],
            Chaves: pedidoSelecionado?.Chaves,
        };

        listaQuantidadesEntregues.forEach((quantidadeRecebida, index) => {
            let quantidadeSolicitada = pedidoSelecionado?.Chaves[index].QuantidadeSolicitada;
            quantidadeTotalRecebida = quantidadeTotalRecebida + quantidadeRecebida;

            dto.ListaChaves.push({
                key: Date.now(),
                QuantidadeSolicitada: quantidadeSolicitada,
                QuantidadeRecebida: quantidadeRecebida
            });

            if (quantidadeSolicitada > quantidadeRecebida)
                dto.Status = 'Incompleto'

        })

        dto.QuantidadeTotalRecebida = quantidadeTotalRecebida;

        chaveService.postBaixaPedidos(dto)
            .then(() => {
                toast.success(messages.cadastradoSucesso('Baixa de Pedido'));
                onClose();
            })
            .catch(() => {
                toast.error(messages.cadastradoErro('Baixa de Pedido'));
            })
    }

    const changeQuantidade = (status, dto, index, event, aa) => {
        let quantidadesEntregues = listaQuantidadesEntregues;
        quantidadesEntregues[index] = Number(event.target.value);
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
                <Row gutter={4}>
                    <Col md={8} xs={24}>
                        <Form.Item
                            name="DataBaixa"
                            label="Data da Baixa"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}
                        >
                            <DatePicker
                                format="DD/MM/YYYY"
                                onChange={(date, dateString) => setData(dateString)}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={8} xs={24}>
                        <Form.Item
                            label="Valor"
                            name="Valor"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}
                        >
                            <Input
                                type="number"
                                placeholder="0,00"
                                min={0}
                                max={1000}
                                step="0.10"
                            />
                        </Form.Item>
                    </Col>
                    <Col md={8} xs={24}>
                        <Form.Item
                            label="Empresa"
                            name="Empresa"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}
                        >
                            <Input
                                type="text"
                                placeholder="Empresa"
                                maxLength={20}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Table
                    className="Tabela-Lista-Pedidos mb-2"
                    dataSource={pedidoSelecionado?.Chaves}
                    pagination={false}
                >
                    {/* Refatora width */}
                    <Column title="Marca" dataIndex="Marca" key="Marca" />
                    <Column title="Número de Série" dataIndex="NumeroSerie" key="NumeroSerie" />
                    <Column title="Quantidade Solicitada" dataIndex="QuantidadeSolicitada" key="QuantidadeSolicitada" />
                    <Column title="Quantidade Entregue" render={(status, dto, index) => (
                        <Input
                            type="number"
                            min={1}
                            max={100}
                            required
                            onChange={(event) => changeQuantidade(status, dto, index, event)}
                        />
                    )}
                    />

                </Table>

                <BotaoCadastrar
                    funcaoCancelar={onClose}
                />

            </Form>

        </Modal>
    );
}

export default ChavesEstoquePedidoModal;
