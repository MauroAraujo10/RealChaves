import React, { useState, useEffect } from 'react';
import { Modal, Form, Col, Row, Input, Select, DatePicker, Space } from 'antd';
import { toast } from 'react-toastify';
import { messages } from '../../../common/Messages/messages';
import moment from 'moment';

import service from '../service/amolacao.service';
import TituloModal from '../../../common/components/TituloModal/TituloModal';
import BotaoCadastrar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';

import { AiOutlineFork, AiOutlineScissor } from "react-icons/ai";
import { RiKnifeLine } from "react-icons/ri";

const AmolacaoEditModal = ({ visible, onClose, produtoSelecionado }) => {
    const [data, setData] = useState('');
    const { Option } = Select;

    useEffect(() => {
        setData(produtoSelecionado?.DataRecebimento);
    }, [produtoSelecionado]);

    const submitForm = (form) => {

        const dto = {
            Id: produtoSelecionado.Id,
            Cliente: form.Cliente,
            Telefone: form.Telefone,
            Produto: form.Produto,
            Marca: form.Marca,
            DataRecebimento: data,
            Quantidade: produtoSelecionado?.Quantidade
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
                layout="vertical"
                onFinish={submitForm}
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
                                placeholder="Cliente"
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
                                placeholder={"Telefone"}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={12}>
                    <Col md={9} xs={24}>
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

                    <Col md={6} xs={24}>
                        <Form.Item
                            name="Marca"
                            label="Marca"
                            rules={[{ required: true, message: messages.campoObrigatorio }]}
                        >
                            <Input
                                type="text"
                                maxLength={20}
                                placeholder={"Marca"}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={8} xs={24}>
                        <Form.Item
                            name="DataRecebimento"
                            label="Data Recebimento"
                            rules={[{ required: true, message: messages.campoObrigatorio }]}
                        >
                            <Space direction="vertical">
                                <DatePicker
                                    format={'DD/MM/YYYY'}
                                    onChange={(date, dateString) => setData(dateString)}
                                    defaultValue={moment(produtoSelecionado?.DataRecebimento, 'DD/MM/YYYY')}
                                />
                            </Space>
                        </Form.Item>
                    </Col>
                </Row>

                <BotaoCadastrar
                    funcaoCancelar={onClose}
                />
            </Form>
        </Modal>
    )
}

export default AmolacaoEditModal;