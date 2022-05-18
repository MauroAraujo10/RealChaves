import React, { useState } from 'react';
import { messages } from '../../../common/Messages/messages';
import { Modal, Form, Input, DatePicker } from 'antd';
import { Row, Col } from 'antd';
import { toast } from 'react-toastify';

import TituloModal from '../../../common/components/TituloModal/TituloModal';
import BotaoCadastar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';

import chaveService from '../service/chave.service';

const ChaveCopiaModal = ({ visible, onClose, chaveSelecionada }) => {
    const [data, setData] = useState('');

    const submitForm = (form) => {
        let novaQuantidade = chaveSelecionada?.Quantidade - Number(form.Quantidade);

        if (novaQuantidade < 0) {
            toast.error(messages.estoqueIncorreto());
            return;
        }

        const dto = {
            IdChave: chaveSelecionada?.Id,
            Data: data,
            Quantidade: Number(form.Quantidade),
            Valor: parseFloat(form.Valor)
        };

        chaveService.postCopiaChave(dto)
            .then(() => {
                chaveSelecionada.Quantidade = novaQuantidade;
                chaveService.update(chaveSelecionada);
                toast.success(messages.cadastradoSucesso('Cópia de Chave'));
                onClose();

            })
            .catch(() => {
                toast.error(messages.cadastradoErro('Cópia de Chave'));
            })
    }

    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            destroyOnClose
            footer={null}
        >

            <TituloModal titulo={'Cópia de Chave'} />

            <Form layout={'vertical'} onFinish={submitForm}>
                <Row gutter={12}>
                    <Col md={8} xs={24}>
                        <Form.Item
                            label="Data"
                            name="Data"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}
                        >
                            <DatePicker
                                format="DD/MM/YYYY"
                                onChange={(date, dateString) => setData(dateString)}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={6} xs={12}>
                        <Form.Item
                            label="Quantidade"
                            name="Quantidade"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}
                        >
                            <Input
                                type="number"
                                placeholder="Quantidade"
                                max={chaveSelecionada?.Quantidade}
                                min={1}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={8} xs={12}>
                        <Form.Item
                            label="Valor"
                            name="Valor"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}
                        >
                            <Input
                                type="number"
                                placeholder="Valor"
                                min={1}
                                max={1000}
                                step="0.10"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <BotaoCadastar
                    funcaoCancelar={onClose}
                />

            </Form>

        </Modal >
    );
}

export default ChaveCopiaModal;