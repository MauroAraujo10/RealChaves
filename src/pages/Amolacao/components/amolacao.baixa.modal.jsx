import React, { useEffect, useState } from 'react';
import { Modal, Form, Col, Row, Input } from 'antd';
import { messages } from '../../../common/Enum/messages';
import { toast } from 'react-toastify';

import AmolacaoService from '../../../services/amolacao.service';
import TituloModal from '../../../common/components/TituloModal/TituloModal';
import BotaoCadastrar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';

const AmolacaoBaixaModal = ({ visible, onClose, produtoSelecionado }) => {
    const [pago, setPago] = useState(false);

    useEffect(() => {
        setPago(produtoSelecionado.Pago === "Sim");
    }, [produtoSelecionado])

    const submitForm = async (form) => {

        const novaQuantidade = pago ? 0 : produtoSelecionado.QuantidadeEstoque - Number(form.Quantidade);

        const dtoProduto = {
            Cliente: produtoSelecionado.Cliente,
            Telefone: produtoSelecionado.Telefone,
            Tipo: produtoSelecionado.Tipo,
            Marca: produtoSelecionado.Marca,
            DataRecebimento: produtoSelecionado.DataRecebimento,
            QuantidadeEstoque: novaQuantidade,
            Pago: novaQuantidade === 0,
            Entregue: novaQuantidade === 0,
            Deletado: false
        };

        await AmolacaoService.Update(produtoSelecionado.Id, dtoProduto)
            .then(async () => {
                if (!pago) {
                    const dtoPagamento = {
                        IdProduto: produtoSelecionado.Id,
                        Quantidade: Number(form.Quantidade),
                        Valor: parseFloat(form.Valor)
                    };

                    await AmolacaoService.PostPagamento(dtoPagamento);
                }

                toast.success(`Baixa de ${produtoSelecionado.Produto} realizada com sucesso`);
                onClose();
            })
            .catch(() => {
                toast.error(`Erro ao realizar essa operação`);
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
                titulo={'Baixa de Produto'}
                subTitulo={'Preencha as informações para dar baixa no produto'} />

            <Form layout="vertical" onFinish={submitForm}>
                <Row gutter={12}>

                    {
                        pago && <p>Este(a) <b>{produtoSelecionado.Tipo}</b> ja está pago, deseja confirmar a baixa ?</p>
                    }

                    {
                        !pago &&
                        <>
                            <Col md={8} sm={8} xs={12}>
                                <Form.Item
                                    label="Quantidade entregue"
                                    name="Quantidade"
                                    rules={[{ required: true, message: messages.CampoObrigatorio }]}
                                >
                                    <Input
                                        type="number"
                                        placeholder="Quantidade"
                                        min={1}
                                        max={produtoSelecionado.QuantidadeEstoque}
                                    />
                                </Form.Item>
                            </Col>

                            <Col md={6} xs={10}>
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
                        </>
                    }

                </Row>

                <BotaoCadastrar
                    funcaoCancelar={onClose}
                />

            </Form >
        </Modal>
    );
}

export default AmolacaoBaixaModal;