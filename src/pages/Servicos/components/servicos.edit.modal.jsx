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
    const valorRef = React.useRef(servicoSelecionado);
    const [data, setData] = useState('');
    const [pago, setPago] = useState(false);

    const submitForm = (form) => {
        const dto = {
            Id: servicoSelecionado.Id,
            Servico: form.Servico,
            Data: data ? data : servicoSelecionado.Data,
            Pago: pago === undefined ? (servicoSelecionado.Pago === 'Sim') : pago,
            Valor: pago === undefined ? parseFloat(servicoSelecionado.Valor) : 0,
            //CONFERIR VALOR
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

    const change = (value) => {
        setPago(value);
        console.log(valorRef)
    }

    const closeModal = () => {
        setData('');
        setPago(false);
    }

    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            footer={null}
            destroyOnClose
            afterClose={closeModal}
        >
            <TituloModal titulo={'Edição de Serviço'} />

            <Form
                initialValues={servicoSelecionado}
                layout="vertical"
                onFinish={submitForm}
            >
                <Row>
                    <Col md={24} xs={24}>
                        <Form.Item
                            name="Servico"
                            label="Serviço"
                            rules={[
                                { required: true, message: messages.campoObrigatorio }
                            ]}
                        >
                            <Input.TextArea
                                showCount
                                maxLength={200}
                                rows={5}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col md={8} xs={8}>
                        <Form.Item
                            name="Data"
                            label="Data de Cadastro"
                        >
                            <Space direction="vertical">
                                <DatePicker
                                    format={'DD/MM/YYYY'}
                                    onChange={(date, dateString) => setData(dateString)}
                                    defaultValue={moment(servicoSelecionado.Data, 'DD/MM/YYYY')} />
                            </Space>
                        </Form.Item>
                    </Col>
                    <Col md={4} xs={4}>
                        <Form.Item
                            name="Pago"
                            label="Pago"
                        >
                            <Switch
                                checked={pago === undefined ? servicoSelecionado.Pago === 'Sim' : pago}
                                //onChange={(value) => setPago(value)}
                                onChange={change}
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={8} xs={8}>
                        <Form.Item
                            name="Valor"
                            label="Valor"
                            rules={[{ required: true, message: messages.campoObrigatorio }]}
                        >
                            <Input
                                type="number"
                                ref={valorRef}
                                min={0}
                                max={1000}
                                step="0.10"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <BotaoCadastrar
                    possuiCancelar
                    funcaoCancelar={onClose}
                />
            </Form>
        </Modal>
    )
}

export default ServicoEditModal;