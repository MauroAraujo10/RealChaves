import React, { useEffect, useState } from 'react';
import { Modal, Form, Col, Row, Input, Select } from 'antd';
import { messages } from '../../../common/Enum/messages';
import { toast } from 'react-toastify';

import AmolacaoService from '../../../services/amolacao.service';
import TituloModal from '../../../common/components/TituloModal/TituloModal';
import BotaoCadastrar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';

import { FaRegMoneyBillAlt } from "react-icons/fa";
import { AiOutlineCreditCard, AiOutlineSlack } from "react-icons/ai";

const AmolacaoBaixaModal = ({ visible, onClose, produtoSelecionado }) => {
    const { Option } = Select;
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
            TipoPagamento: novaQuantidade === 0 && form.TipoPagamento ? form.TipoPagamento : produtoSelecionado.TipoPagamento,
            Entregue: novaQuantidade === 0,
            Deletado: false
        };        

        await AmolacaoService.Update(produtoSelecionado.Id, dtoProduto)
            .then(async () => {
                if (!pago) {
                    const dtoPagamento = {
                        IdProduto: produtoSelecionado.Id,
                        Quantidade: Number(form.Quantidade),
                        TipoProduto: produtoSelecionado.Tipo,
                        Valor: parseFloat(form.Valor),
                        TipoPagamento: form.TipoPagamento
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
                            <Col md={10} sm={12} xs={24}>
                                <Form.Item
                                    label={"Tipo de Pagamento"}
                                    name="TipoPagamento"
                                    rules={[{ required: true, message: messages.CampoObrigatorio }]}
                                >
                                    <Select defaultValue="Selecione" tabIndex={4}>
                                        <Option value="Dinheiro">
                                            <FaRegMoneyBillAlt size={16} className="mr-2" />
                                            Dinheiro
                                        </Option>
                                        <Option value="CartaoDebito">
                                            <AiOutlineCreditCard size={16} className="mr-2" />
                                            Cartão de Débito
                                        </Option>
                                        <Option value="CartaoCredito">
                                            <AiOutlineCreditCard size={16} className="mr-2" />
                                            Cartão de Crédito
                                        </Option>
                                        <Option value="Pix" >
                                            <AiOutlineSlack size={16} className="mr-2" />
                                            Pix
                                        </Option>
                                    </Select>
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