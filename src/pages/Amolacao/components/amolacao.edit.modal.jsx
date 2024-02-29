import React from 'react';
import { Modal, Form, Col, Row, Input, Select } from 'antd';
import { toast } from 'react-toastify';
import { messages } from '../../../common/Enum/messages';

import AmolacaoService from '../../../services/amolacao.service';
import TituloModal from '../../../common/components/TituloModal/TituloModal';
import BotaoCadastrar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';

import { AiOutlineFork, AiOutlineScissor } from "react-icons/ai";
import { RiKnifeLine } from "react-icons/ri";

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

                    <Col md={10} xs={24}>
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

                <BotaoCadastrar
                    funcaoCancelar={onClose}
                />
            </Form>
        </Modal>
    )
}

export default AmolacaoEditModal;