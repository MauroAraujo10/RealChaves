import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Switch } from 'antd';
import { Row, Col } from 'antd';
import { messages } from '../../../common/Enum/messages';
import { toast } from "react-toastify";
import moment from 'moment';

import service from '../../../services/servicos.service';
import TituloModal from '../../../common/components/TituloModal/TituloModal';
import BotaoCadastrar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';

import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

const ServicoEditModal = ({ visible, onClose, servicoSelecionado }) => {
    const [pago, setPago] = useState(false);

    useEffect(() => {
        setPago(servicoSelecionado?.Pago === "Sim");
    }, [servicoSelecionado]);

    const submitForm = async (form) => {

        const dto = {
            Descricao: form.Descricao,
            Data: moment().format('DD/MM/yyyy'),
            Pago: pago ?? false,
            Valor: form.Valor ? parseFloat(form.Valor) : 0
        };

        await service.Update(servicoSelecionado.Id, dto)
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
            <TituloModal 
                titulo={'Editar Serviço'} />

            <Form
                initialValues={servicoSelecionado}
                layout="vertical"
                onFinish={submitForm}
            >
                <Row>

                    <Col md={24} xs={24}>
                        <Form.Item
                            label="Descrição do serviço"
                            name="Descricao"
                            rules={[
                                { required: true, message: messages.CampoObrigatorio }
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
                    
                    <Col md={4} xs={4}>
                        <Form.Item
                            label="Pago"
                            name="Pago"
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
                        <Col md={6} xs={8}>
                            <Form.Item
                                label="Valor"
                                name="Valor"
                                rules={[{ required: pago, message: messages.CampoObrigatorio }]}
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