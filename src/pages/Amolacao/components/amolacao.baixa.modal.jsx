import React, { useState } from 'react';
import { Modal, Form, Col, Row, DatePicker, Input } from 'antd';
import { messages } from '../../../common/Messages/messages';
import { toast } from 'react-toastify';

import service from '../service/amolacao.service';
import TituloModal from '../../../common/components/TituloModal/TituloModal';
import BotaoCadastrar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';

const AmolacaoBaixaModal = ({ visible, onClose, produtoSelecionado }) => {
    const [data, setData] = useState('');

    const submitForm = (form) => {

        const dto = {
            IdProduto: produtoSelecionado.Id,
            DataEntrega: data,
            Produto: produtoSelecionado.Produto,
            Quantidade: produtoSelecionado.Quantidade,
            Valor: produtoSelecionado.Pago === "Sim" ? produtoSelecionado.Valor : parseFloat(form.Valor)
        };

        service.postBaixaProduto(dto)
            .then(() => {
                service.delete(dto.IdProduto);
                toast.success(messages.cadastradoSucesso('Baixa de Produto'));
                onClose();
            })
            .catch(() => {
                toast.error(messages.cadastradoErro('Baixa de Produto'));
            })
    }


    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            footer={null}
            destroyOnClose
        >

            <TituloModal titulo={'Entregar Produto'} />

            <Form
                layout="vertical"
                onFinish={submitForm}
            >

                <Row gutter={8}>
                    <Col span={10}>
                        <Form.Item
                            label="Data da Entrega"
                            name="DataEntrega"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}>
                            <DatePicker
                                format="DD/MM/YYYY"
                                onChange={(date, dateString) => setData(dateString)}
                            />
                        </Form.Item>
                    </Col>
                    {
                        produtoSelecionado?.Pago === "Não" && (
                            <Col span={10}>
                                <Form.Item
                                    label="Valor Pago"
                                    name="Valor"
                                    rules={[{ required: true, message: messages.CampoObrigatorio }]}
                                >
                                    <Input
                                        type="text"
                                        placeholder="0,00"
                                        min={0}
                                        step="0.10"
                                        value="0,20"
                                    />
                                </Form.Item>
                            </Col>
                        )
                    }
                </Row>

                {
                    produtoSelecionado?.Pago === 'Sim' &&
                    (
                        <div className="mb-1 t-right">
                            {
                                produtoSelecionado.Quantidade === 1 ?
                                    <b>* Este Alicate Já está Pago</b> :
                                    <b>* Estes Alicates Já estão Pagos</b>
                            }
                        </div>
                    )
                }

                <BotaoCadastrar
                    possuiCancelar
                    funcaoCancelar={onClose}
                />

            </Form >
        </Modal>
    );
}

export default AmolacaoBaixaModal;