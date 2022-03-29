import React, { useState } from 'react';
import { Modal, Form, Col, Row, Input, Select, DatePicker, Space, Switch } from 'antd';
import { toast } from 'react-toastify';
import { messages } from '../../../common/Messages/messages';
import moment from 'moment';

import service from '../service/amolacao.service';
import TituloModal from '../../../common/components/TituloModal/TituloModal';
import BotaoCadastrar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';

import { AiOutlineFork, AiOutlineScissor } from "react-icons/ai";
import { RiKnifeLine } from "react-icons/ri";
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

const AmolacaoEditModal = ({ visible, onClose, produtoSelecionado }) => {
    const [data, setData] = useState('');
    const [pago, setPago] = useState(false);
    const { Option } = Select;

    const submitForm = (form) => {

        const dto = {
            Id: produtoSelecionado.Id,
            Cliente: form.Cliente,
            Telefone: form.Telefone,
            Produto: form.Produto,
            Marca: form.Marca,
            Data: data,
            Quantidade: Number(form.Quantidade),
            Pago: pago === undefined ? (produtoSelecionado?.Pago === 'Sim') : pago,
            Valor: pago === undefined ? parseFloat(produtoSelecionado?.Valor) : 0,
        };

        service.updateProduto(dto)
            .then(() => {
                toast.success(messages.EditadoSucesso('Produto'));
                onClose();
            })
            .catch(() => {
                toast.error(messages.EditadoErro('Produto'));
            })
    }

    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            footer={null}
            destroyOnClose
        >

            <TituloModal titulo={'Editar Produto'} />

            <Form
                initialValues={produtoSelecionado}
                onFinish={submitForm}
                layout="vertical"
            >
                <Row gutter={12}>
                    <Col md={18} xs={24}>
                        <Form.Item
                            name="Cliente"
                            label="Cliente"
                            rules={[{ required: true, message: messages.campoObrigatorio }]}
                        >
                            <Input
                                type="text"
                                autoFocus
                                maxLength={50}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={6} xs={24}>
                        <Form.Item
                            name="Telefone"
                            label="Telefone"
                            rules={[{ required: false, message: messages.campoObrigatorio }]}
                        >
                            <Input
                                type="text"
                                maxLength={15}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={12}>
                    <Col md={10} xs={24}>
                        <Form.Item
                            label="Produto"
                            name="Produto"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}
                        >
                            <Select defaultValue="Selecione">
                                <Option value="Alicate">
                                    <AiOutlineFork className="mr-1" />
                                    Alicate
                                    </Option>
                                <Option value="Tesoura">
                                    <AiOutlineScissor className="mr-1" />
                                    Tesoura
                                </Option>
                                <Option value="Faca" >
                                    <RiKnifeLine className="mr-1" />
                                    Faca
                                </Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col md={14} xs={24}>
                        <Form.Item
                            name="Marca"
                            label="Marca"
                            rules={[{ required: true, message: messages.campoObrigatorio }]}
                        >
                            <Input
                                type="text"
                                maxLength={20}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col md={8} xs={24}>
                        <Form.Item
                            name="DataCadastro"
                            label="Data de Cadastro"
                            rules={[{ required: true, message: messages.campoObrigatorio }]}
                        >
                            <Space direction="vertical">
                                <DatePicker
                                    format={'DD/MM/YYYY'}
                                    onChange={(date, dateString) => setData(dateString)}
                                    defaultValue={moment(produtoSelecionado?.dataCadastro)}
                                />
                            </Space>

                        </Form.Item>
                    </Col>
                    <Col md={5} xs={24}>
                        <Form.Item
                            name="Quantidade"
                            label="Quantidade"
                            rules={[{ required: true, message: messages.campoObrigatorio }]}
                        >
                            <Input
                                type="number"
                                max={10}
                                min={0}
                            />
                        </Form.Item>
                    </Col>

                    <Col md={3} xs={4}>
                        <Form.Item
                            name="Pago"
                            label="Pago"
                        >
                            <Switch
                                onChange={(value) => setPago(value)}
                                defaultChecked={produtoSelecionado?.Pago === 'Sim'}
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                            />
                        </Form.Item>
                    </Col>
                    {/* CORRIGIR O BUG */}
                    {pago &&
                        <Col md={6}>
                            <Form.Item
                                name="Valor"
                                label="Valor"
                                rules={[{ required: true, message: messages.campoObrigatorio }]}
                            >
                                <Input
                                    type="number"
                                    min={0}
                                    max={1000}
                                    step="0.10"
                                />
                            </Form.Item>
                        </Col>
                    }
                </Row>

                <BotaoCadastrar
                    possuiCancelar
                    funcaoCancelar={onClose}
                />
            </Form>
        </Modal>
    )
}

export default AmolacaoEditModal;