import React from 'react';
import { Modal, Form, Col, Row, Input, Select } from 'antd';
import { toast } from 'react-toastify';
import { messages } from '../../../common/Enum/messages';

import AmolacaoService from '../../../services/amolacao.service';
import TituloModal from '../../../common/components/TituloModal/TituloModal';
import BotaoCadastrar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';

import { AiOutlineFork, AiOutlineScissor, AiOutlineCreditCard, AiOutlineSlack } from "react-icons/ai";
import { RiKnifeLine } from "react-icons/ri";
import { FaRegMoneyBillAlt } from "react-icons/fa";

const AmolacaoEditModal = ({ visible, onClose, produtoSelecionado }) => {

    const { Option } = Select;

    const submitForm = async (form) => {

        const dto = {
            Cliente: form.Cliente,
            Telefone: form.Telefone ?? "",
            Tipo: form.Tipo,
            Marca: form.Marca,
            DataRecebimento: produtoSelecionado.DataRecebimento,
            QuantidadeEstoque: produtoSelecionado.QuantidadeEstoque,
            Pago: produtoSelecionado.Pago === "Sim",
            TipoPagamento: produtoSelecionado.Pago === "Sim" ? form.TipoPagamento : '',
            Entregue: false,
            Deletado: false
        };

        await AmolacaoService.Update(produtoSelecionado.Id, dto)
            .then(() => {
                toast.success(messages.EditadoSucesso('Produto'));
                onClose();
            })
            .catch(() => {
                toast.error(messages.EditadoErro('Produto'));
            })
    }

    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            footer={null}
            destroyOnClose
        >
            <TituloModal titulo={'Editar Produto'} />

            <Form
                initialValues={produtoSelecionado}
                layout="vertical"
                onFinish={submitForm}
            >
                <Row gutter={12}>
                    <Col md={16} xs={24}>
                        <Form.Item
                            label="Cliente"
                            name="Cliente"
                            rules={[{ required: true, message: messages.campoObrigatorio }]}
                        >
                            <Input
                                type="text"
                                placeholder="Cliente"
                                autoFocus
                                maxLength={50}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={8} xs={24}>
                        <Form.Item
                            label="Telefone"
                            name="Telefone"
                            rules={[{ required: false, message: messages.campoObrigatorio }]}
                        >
                            <Input
                                type="text"
                                maxLength={15}
                                placeholder={"Telefone"}
                                tabIndex={0}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={12}>

                    <Col md={8} xs={24}>
                        <Form.Item
                            label="Produto"
                            name="Tipo"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}
                        >
                            <Select defaultValue="Selecione">
                                <Option value="Alicate">
                                    <AiOutlineFork className="mr-1" />
                                    Alicate
                                </Option>
                                <Option value="Tesoura">
                                    <AiOutlineScissor className="mr-1" />
                                    Tesoura
                                </Option>
                                <Option value="Faca" >
                                    <RiKnifeLine className="mr-1" />
                                    Faca
                                </Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col md={8} xs={24}>
                        <Form.Item
                            label="Marca"
                            name="Marca"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}
                        >
                            <Input
                                type="text"
                                maxLength={20}
                                placeholder={"Marca"}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                {
                    produtoSelecionado.Pago === "Sim" ?
                        <Row>
                            <Col lg={12} md={8} sm={24} xs={24}>
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
                        </Row>
                        :
                        <></>
                }

                <BotaoCadastrar
                    funcaoCancelar={onClose}
                />
            </Form>
        </Modal>
    )
}

export default AmolacaoEditModal;