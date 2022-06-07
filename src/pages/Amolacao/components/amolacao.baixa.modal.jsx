import React, { useState } from 'react';
import { Modal, Form, Col, Row, DatePicker, Input } from 'antd';
import { messages } from '../../../common/Enum/messages';
import { toast } from 'react-toastify';

import service from '../service/amolacao.service';
import TituloModal from '../../../common/components/TituloModal/TituloModal';
import BotaoCadastrar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';

const AmolacaoBaixaModal = ({ visible, onClose, produtoSelecionado }) => {
    const [dataEntrega, setDataEntrega] = useState('');

    const submitForm = async (form) => {
        const quantidadeForm = Number(form.Quantidade);

        let dto = {
            Id: produtoSelecionado.Id,
            Cliente: produtoSelecionado.Cliente,
            Telefone: produtoSelecionado.Telefone,
            Produto: produtoSelecionado.Produto,
            Marca: produtoSelecionado.Marca,
            DataRecebimento: produtoSelecionado.DataRecebimento,
            DataEntrega: dataEntrega,
            Valor: parseFloat(form.Valor),
        };

        if (quantidadeForm === produtoSelecionado.Quantidade) {
            dto.Quantidade = quantidadeForm;
            await service.delete(produtoSelecionado.Id);
        }
        else{
            dto.Quantidade = produtoSelecionado?.Quantidade - Number(form.Quantidade);
            await service.updateProduto(dto);
        }

        await service.postBaixaProduto(dto)
                .then(() => {
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

            <TituloModal titulo={'Baixa de Produto'} />

            <Form layout="vertical" onFinish={submitForm}>
                <Row gutter={12}>
                    <Col md={8} xs={24}>
                        <Form.Item
                            label="Data da Entrega"
                            name="DataEntrega"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}>
                            <DatePicker
                                format="DD/MM/YYYY"
                                onChange={(date, dateString) => setDataEntrega(dateString)}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={6} xs={24}>
                        <Form.Item
                            label="Valor Pago"
                            name="Valor"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}
                        >
                            <Input
                                type="number"
                                placeholder="Valor"
                                max={999}
                                min="0.1"
                                step="0.1"
                            />
                        </Form.Item>
                    </Col>
                    <Col md={8} xs={24}>
                        <Form.Item
                            label="Quantidade entregue"
                            name="Quantidade"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}
                        >
                            <Input
                                type="number"
                                placeholder="Quantidade"
                                min={1}
                                max={produtoSelecionado?.Quantidade}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <BotaoCadastrar
                    funcaoCancelar={onClose}
                />

            </Form >
        </Modal>
    );
}

export default AmolacaoBaixaModal;