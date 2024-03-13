import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Switch, Select } from 'antd';
import { Row, Col } from 'antd';
import { messages } from '../../../common/Enum/messages';
import { toast } from "react-toastify";

import service from '../../../services/servicos.service';
import TituloModal from '../../../common/components/TituloModal/TituloModal';
import BotaoCadastrar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';

import { AiOutlineCreditCard, AiOutlineSlack } from "react-icons/ai";
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { FaRegMoneyBillAlt } from "react-icons/fa";

const ServicoEditModal = ({ visible, onClose, servicoSelecionado }) => {
    const { Option } = Select;
    const [pago, setPago] = useState(false);

    useEffect(() => {
        setPago(servicoSelecionado?.Pago === "Sim");
    }, [visible]);

    const submitForm = async (form) => {

        const dto = {
            Descricao: form.Descricao,
            Data: servicoSelecionado.Data,
            Pago: pago ?? false,
            Valor: form.Valor ? parseFloat(form.Valor) : 0,
            TipoPagamento: pago ? form.TipoPagamento : ''
        };

        await service.Update(servicoSelecionado.Id, dto)
            .then(() => {
                toast.success(messages.EditadoSucesso('Serviço'));
                onClose();
            })
            .catch(() => {
                toast.error(messages.EditadoErro('Serviço'));
            })
    }

    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            footer={null}
            destroyOnClose={true}
        >
            <TituloModal
                titulo={'Editar Serviço'} />

            <Form
                initialValues={servicoSelecionado}
                layout="vertical"
                onFinish={submitForm}
            >
                <Row>

                    <Col md={24} xs={24}>
                        <Form.Item
                            label="Descrição do serviço"
                            name="Descricao"
                            rules={[
                                { required: true, message: messages.CampoObrigatorio }
                            ]}
                        >
                            <Input.TextArea
                                showCount
                                maxLength={200}
                                rows={3}
                                placeholder="Descrição do Serviço"
                            />
                        </Form.Item>
                    </Col>

                </Row>

                <Row gutter={10}>

                    <Col md={4} xs={4}>
                        <Form.Item
                            label="Pago"
                            name="Pago"
                        >
                            <Switch
                                defaultChecked={servicoSelecionado?.Pago === 'Sim'}
                                onChange={(value) => setPago(value)}
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                                disabled={servicoSelecionado?.Pago === 'Sim'}
                            />
                        </Form.Item>
                    </Col>
                    {
                        pago ?
                            <>
                                <Col md={6} sm={5} xs={8}>
                                    <Form.Item
                                        label="Valor"
                                        name="Valor"
                                        rules={[{ required: pago, message: messages.CampoObrigatorio }]}
                                    >
                                        <Input
                                            type="number"
                                            placeholder="Valor"
                                            min={0}
                                            max={10000}
                                            step="0.10"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col lg={10} md={10} sm={10} xs={24}>
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
                            :
                            <></>
                    }



                </Row>

                <BotaoCadastrar
                    funcaoCancelar={onClose}
                />
            </Form>
        </Modal>
    )
}

export default ServicoEditModal;