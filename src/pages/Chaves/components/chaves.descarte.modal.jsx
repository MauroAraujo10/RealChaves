import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { Modal, Form, Radio, DatePicker, Space, Input } from 'antd';
import { messages } from '../../../common/Messages/messages';
import { toast } from "react-toastify";
import { Descarte } from '../../../common/Messages/descarte'

import TituloModal from '../../../common/components/TituloModal/TituloModal';
import BotaoCadastrar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';

import chaveService from '../service/chave.service';

const ChaveDescarteModal = ({ visible, onClose, chaveSelecionada }) => {
    const [data, setData] = useState('');
    const [motivo, setMotivo] = useState(Descarte.Quebrou);

    const submitForm = (form) => {
        let novaQuantidade = chaveSelecionada.Quantidade - Number(form.Quantidade);

        if (novaQuantidade < 0) {
            toast.error(messages.estoqueIncorreto());
            return;
        }

        const dto = {
            IdChave: chaveSelecionada.Id,
            Quantidade: Number(form.Quantidade),
            Motivo: motivo,
            Data: data
        };

        chaveService.postDescarte(dto)
            .then(() => {
                chaveSelecionada.Quantidade = novaQuantidade
                chaveService.update(chaveSelecionada);
                toast.success(messages.cadastradoSucesso('Descarte de Chave'));
                onClose();
            })
            .catch(() => {
                toast.error(messages.cadastradoErro('Descarte de Chave'));
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
                titulo={'Descarte de Chave'}
                subTitulo={'Selecione o motivo pelo qual esta chave deve ser descartada'}
            />

            <Form onFinish={submitForm} layout='vertical'>
                <Row gutter={10}>
                    <Col md={8} xs={10}>
                        <Form.Item
                            label="Data"
                            name="Data"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}>
                            <DatePicker
                                format="DD/MM/YYYY"
                                onChange={(date, dateString) => setData(dateString)}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={5} xs={12}>
                        <Form.Item
                            label="Quantidade"
                            name="Quantidade"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}
                        >
                            <Input
                                type="number"
                                min={1}
                                max={chaveSelecionada?.Quantidade}
                                placeholder="Quantidade"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Radio.Group
                    defaultValue={Descarte.Quebrou}
                    style={{ marginBottom: '10px' }}
                    onChange={(motivo) => setMotivo(motivo.target.value)}
                >
                    <Space direction="vertical">
                        <Radio value={Descarte.Quebrou} checked>{Descarte.Quebrou}</Radio>
                        <Radio value={Descarte.NaoFuncionou} >{Descarte.NaoFuncionou}</Radio>
                        <Radio value={Descarte.Perda} >{Descarte.Perda}</Radio>
                    </Space>
                </Radio.Group>

                <BotaoCadastrar
                    funcaoCancelar={onClose}
                />
            </Form>

        </Modal >
    );

}

export default ChaveDescarteModal;