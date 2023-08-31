import React, { useState, useEffect } from 'react';

import { Row, Col, Modal, Form, DatePicker, Input, Table } from 'antd';
import { messages } from '../../../common/Enum/messages';
import { toast } from 'react-toastify';
import { TagStatusEnum } from '../../../common/Enum/TagStatusEnum';
import Loading from '../../../common/components/Loading/Loading';

import ChaveService from '../../../services/chave.service';

import TituloModal from '../../../common/components/TituloModal/TituloModal';
import BotaoCadastrar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';

const ChavesEstoquePedidoModal = ({ visible, onClose, pedidoSelecionado }) => {
    const [listaQuantidadesEntregues, setListaQuantidadesEntregues] = useState([]);
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const { Column } = Table;

    useEffect(() => {
        setListaQuantidadesEntregues([]);
    }, [pedidoSelecionado]);

    const submitForm = (form) => {

        setLoading(true);
        let quantidadeTotalRecebida = 0;

        const dto = {
            Id: pedidoSelecionado?.Id,
            key: pedidoSelecionado?.Id,
            DataPedido: pedidoSelecionado?.DataPedido,
            DataBaixa: data,
            QuantidadePedidaTotal: pedidoSelecionado?.QuantidadePedidaTotal,
            Valor: parseFloat(form.Valor),
            Empresa: form.Empresa,
            Status: TagStatusEnum.Completo,
            ListaChaves: [],
            Chaves: pedidoSelecionado?.Chaves,
        };

        listaQuantidadesEntregues.forEach((quantidadeRecebida, index) => {
            let quantidadeSolicitada = pedidoSelecionado?.Chaves[index].QuantidadeSolicitada;
            quantidadeTotalRecebida = quantidadeTotalRecebida + quantidadeRecebida;

            dto.ListaChaves.push({
                key: Date.now(),
                Marca: pedidoSelecionado?.Chaves[index].Marca,
                NumeroSerie: pedidoSelecionado?.Chaves[index].NumeroSerie,
                QuantidadeSolicitada: quantidadeSolicitada,
                QuantidadeRecebida: quantidadeRecebida
            });

            if (quantidadeSolicitada > quantidadeRecebida)
                dto.Status = TagStatusEnum.Incompleto

        })

        dto.QuantidadeTotalRecebida = quantidadeTotalRecebida;

        ChaveService.postBaixaPedidos(dto)
            .then(() => {
                toast.success(messages.cadastradoSucesso('Baixa de Pedido'));
                setLoading(false);
                onClose();
            })
            .catch(() => {
                toast.error(messages.cadastradoErro('Baixa de Pedido'));
                setLoading(false);
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

            {
                loading ?
                    <Loading /> :
                    <Form onFinish={submitForm} layout='vertical'>
                        <Row gutter={4}>
                            <Col md={8} xs={8}>
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
                            <Col md={8} xs={8}>
                                <Form.Item
                                    label="Valor"
                                    name="Valor"
                                    rules={[{ required: true, message: messages.CampoObrigatorio }]}
                                >
                                    <Input
                                        type="number"
                                        placeholder={'Valor'}
                                        min={0}
                                        step="0.10"
                                    />
                                </Form.Item>
                            </Col>
                            <Col md={8} xs={8}>
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
                            <Column title="Marca" dataIndex="Marca" key="Marca" width={'10%'} />
                            <Column title="Número de Série" dataIndex="NumeroSerie" key="NumeroSerie" width={'20%'} />
                            <Column title="Quantidade Solicitada" dataIndex="QuantidadeSolicitada" key="QuantidadeSolicitada" width={'10%'} />
                            <Column title="Quantidade Entregue" width={'10%'} render={(status, dto, index) => (
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
            }
        </Modal>
    );
}

export default ChavesEstoquePedidoModal;
