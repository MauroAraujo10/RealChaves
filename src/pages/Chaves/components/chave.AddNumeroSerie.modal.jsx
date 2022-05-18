import React from 'react';
import { Row, Col, Modal, Form, Input } from 'antd';
import { messages } from '../../../common/Messages/messages';
import BotaoCadastrar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';
import TituloModal from '../../../common/components/TituloModal/TituloModal';

const ChaveAddNumeroSerieModal = ({ visible, onClose, addNumeroSerie }) => {

    const submitForm = (form) => {
        addNumeroSerie(form.Marca, form.NumeroSerie)
        onClose();
    }

    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            footer={null}
            destroyOnClose
        >

            <TituloModal titulo={"Cadastro Número de Série"} />

            <Form onFinish={submitForm}>
                <Row gutter={10}>
                    <Col md={12} xs={24}>
                        <Form.Item
                            name="Marca"
                            label="Marca"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}
                        >
                            <Input
                                autoFocus
                                type="text"
                                placeholder="Marca"
                                maxLength="30"
                            />
                        </Form.Item>
                    </Col>
                    <Col md={12} xs={24}>
                        <Form.Item
                            name="NumeroSerie"
                            label="Número de Série"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}
                        >
                            <Input
                                type="number"
                                placeholder="Número de Série"
                                step="1"
                                min={1}
                                max={9999}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <BotaoCadastrar
                    funcaoCancelar={onClose}
                />
            </Form>
        </Modal >
    );
}

export default ChaveAddNumeroSerieModal;