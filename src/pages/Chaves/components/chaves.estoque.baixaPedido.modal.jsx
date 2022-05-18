import React, { useState, useRef, useEffect } from 'react';

import { Row, Col, Modal, Form, DatePicker, Input, Table } from 'antd';
import { messages } from '../../../common/Messages/messages';
import { toast } from 'react-toastify';

import moment from 'moment';
import chaveService from '../service/chave.service';

import TituloModal from '../../../common/components/TituloModal/TituloModal';
import BotaoCadastrar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';

import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

import Cofre from '../../Chaves/assets/Cofre.jpg';
import Column from 'antd/lib/table/Column';

const ChavesEstoquePedidoModal = ({ visible, onClose, pedidoSelecionado }) => {
    const [listaChaves, setListaChaves] = useState([]);
    const [listaQuantidadesEntregues, setListaQuantidadesEntregues] = useState([]);
    const [data, setData] = useState();
    const inputRef = useRef();

    useEffect(() => {
        setListaChaves(pedidoSelecionado?.Chaves);
    }, [pedidoSelecionado]);

    const submitForm = (form) => {

        let listaQuantidades = [];

        const dto = {
            IdPedido: pedidoSelecionado.Id,
            Data: data,
            QuantidadeTotal: pedidoSelecionado?.QuantidadeTotal,
            Valor: parseFloat(form.Valor),
            Empresa: form.Empresa,
            Chaves: pedidoSelecionado?.Chaves
        };
        console.log(pedidoSelecionado);
        console.log(form);

        

        // chaveService.postBaixaPedidos(dto)
        //     .then(() => {
        //         toast.success(messages.cadastradoSucesso('Baixa de Pedido'));
        //         onClose();
        //     })
        //     .catch(() => {
        //         toast.error(messages.cadastradoSucesso('Baixa de Pedido'));
        //     })
    }

    const changeQuantidade = (status, dto, index, value,aa) => {
        console.log(inputRef.current);
        console.log(dto);
        console.log(index);
        console.log(value);
        console.log(aa);
        //const listaChavesPedidoSelecionado = 
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
                    <Column title="Marca" dataIndex="Marca" key="Marca" />
                    <Column title="Quantidade Solicitada" dataIndex="QuantidadeSolicitada" key="QuantidadeSolicitada" />
                    <Column title="Quantidade Entregue" render={(status, dto, index, value) => (
                        <>
                            <Form.Item
                                name={`Quantidade-${index}`}
                            >
                                <Input
                                    ref={inputRef}
                                    type="number"
                                    min={1}
                                    max={100}
                                    onChange={(value, aa) => changeQuantidade(status, dto, index, value,aa )}
                                />
                            </Form.Item>
                        </>
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
