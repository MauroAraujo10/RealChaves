import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Switch, Select } from 'antd';
import { Row, Col } from 'antd';
import { messages } from '../../../common/Enum/messages';
import { Rotas } from '../../../Routes/rotas';
import { toast } from "react-toastify";

import service from '../../../services/servicos.service';
import HeaderForm from '../../../common/components/HeaderForm/HeaderForm';
import BotaoCadastrar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';

import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { AiOutlineCreditCard, AiOutlineSlack } from "react-icons/ai";
import { FaRegMoneyBillAlt } from "react-icons/fa";

const ServicosCadastro = () => {
    const { Option } = Select;
    const history = useHistory();

    const [pago, setPago] = useState();

    const submitForm = async (form) => {
        const dto = {
            Descricao: form.Descricao,
            Pago: pago ?? false,
            Valor: pago ? parseFloat(form.Valor) : 0,
            TipoPagamento: pago ? form.TipoPagamento : ''
        };

        await service.Post(dto)
            .then(() => {
                toast.success(messages.cadastradoSucesso('Serviço'));
                history.push(Rotas.Servico);
            })
            .catch(() => {
                toast.error(messages.cadastradoErro('Serviço'));
            });
    }

    return (
        <div className="mt-2">

            <HeaderForm
                titulo={'Cadastrar Serviço'}
                listaCaminhos={['Serviços', 'Cadastrar Serviço']}
            />

            <Form
                layout="vertical"
                onFinish={submitForm}
                className='container-form'
            >
                <Row gutter={12}>

                    <Col md={12} xs={24}>
                        <Form.Item
                            label="Descrição do Serviço"
                            name="Descricao"
                            rules={[{ required: true, message: messages.CampoObrigatorio, }]}
                        >
                            <Input.TextArea
                                showCount
                                maxLength={200}
                                rows={4}
                                placeholder="Descrição do serviço"
                                autoFocus
                            />
                        </Form.Item>
                    </Col>

                    <Col md={1} sm={3} xs={8}>
                        <Form.Item
                            label="Pago"
                            name="Pago">
                            <Switch
                                defaultChecked={false}
                                onChange={(value) => setPago(value)}
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                                tabIndex={1}
                            />
                        </Form.Item>

                    </Col>

                    {pago &&
                        <>
                            <Col md={2} sm={6} xs={12}>
                                <Form.Item
                                    label="Valor"
                                    name="Valor"
                                    rules={[{ required: pago, message: messages.CampoObrigatorio }]}>
                                    <Input
                                        type="number"
                                        placeholder="Valor"
                                        min={1}
                                        step="0.1"
                                        tabIndex={2}
                                    />
                                </Form.Item>

                            </Col>
                            <Col lg={4} md={4} sm={7} xs={24}>
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
                    funcaoCancelar={() => history.push(Rotas.Servico)}
                />
            </Form>
        </div>
    );
}

export default ServicosCadastro;
