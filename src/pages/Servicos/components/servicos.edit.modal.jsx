import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, DatePicker, Space, Switch } from 'antd';
import { Row, Col } from 'antd';
import { messages } from '../../../common/Messages/messages';
import { toast } from "react-toastify";
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

import moment from 'moment';
import service from '../service/servicos.service';
import TituloModal from '../../../common/components/TituloModal/TituloModal';
import BotaoCadastrar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';

const ServicoEditModal = ({ visible, onClose, servicoSelecionado }) => {
    const [data, setData] = useState();
    const [pago, setPago] = useState(false);

    useEffect(() => {
        setData(servicoSelecionado?.Data);
        setPago(servicoSelecionado?.Pago === "Sim");
    }, [servicoSelecionado]);

    const submitForm = (form) => {

        const dto = {
            Id: servicoSelecionado.Id,
            Servico: form.Servico,
            Data: data,
            Pago: pago,
            Valor: pago ? parseFloat(form.Valor) : 0,
        };

        service.update(dto)
            .then(() => {
                toast.success(messages.EditadoSucesso('Serviço'));
                onClose();
            })
            .catch(() => {
                toast.error(messages.EditadoErro('Serviço'));
            })
    }

    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            footer={null}
            destroyOnClose
        >
            <TituloModal titulo={'Editar Serviço'} />

            <Form
                initialValues={servicoSelecionado}
                layout="vertical"
                onFinish={submitForm}
            >
                <Row>
                    <Col md={24} xs={24}>
                        <Form.Item
                            name="Servico"
                            label="Descrição do serviço"
                            rules={[
                                { required: true, message: messages.campoObrigatorio }
                            ]}
                        >
                            <Input.TextArea
                                showCount
                                maxLength={200}
                                rows={3}
                                placeholder="Descrição do Serviço"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col md={8} xs={8}>
                        <Form.Item
                            name="Data"
                            label="Data de Cadastro"
                            rules={[{ required: true, message: messages.campoObrigatorio }]}
                        >
                            <Space direction="vertical">
                                <DatePicker
                                    format={'DD/MM/YYYY'}
                                    onChange={(date, dateString) => setData(dateString)}
                                    defaultValue={moment(servicoSelecionado?.Data, 'DD/MM/YYYY')} />
                            </Space>
                        </Form.Item>
                    </Col>
                    <Col md={4} xs={4}>
                        <Form.Item
                            name="Pago"
                            label="Pago"
                        >
                            <Switch
                                defaultChecked={servicoSelecionado?.Pago === 'Sim'}
                                onChange={(value) => setPago(value)}
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                            />
                        </Form.Item>
                    </Col>
                    {
                        pago &&
                        <Col md={8} xs={8}>
                            <Form.Item
                                name="Valor"
                                label="Valor"
                                rules={[{ required: pago, message: messages.campoObrigatorio }]}
                            >
                                <Input
                                    type="number"
                                    placeholder="Valor"
                                    min={0}
                                    max={1000}
                                    step="0.10"
                                />
                            </Form.Item>
                        </Col>
                    }
                </Row>

                <BotaoCadastrar
                    funcaoCancelar={onClose}
                />
            </Form>
        </Modal>
    )
}

export default ServicoEditModal;