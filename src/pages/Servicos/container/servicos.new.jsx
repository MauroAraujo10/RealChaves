import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Input, DatePicker, Switch, Breadcrumb } from 'antd';
import { Row, Col } from 'antd';
import { messages } from '../../../common/Messages/messages';
import { Rotas } from '../../../Routes/rotas';
import { toast } from "react-toastify";

import service from '../service/servicos.service';
import BotaoCadastrar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';

import { AiOutlineHome } from "react-icons/ai";
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

const ServicosCadastro = () => {
    const [data, setData] = useState();
    const [pago, setPago] = useState();
    const history = useHistory();

    const submitForm = (form) => {
        const dto = {
            Servico: form.Servico,
            Data: data,
            Pago: pago,
            Valor: pago ? parseFloat(form.Valor) : 0
        };

        service.post(dto)
            .then(() => {
                toast.success(messages.cadastradoSucesso('Serviço'));
                history.push(Rotas.Servico);
            })
            .catch(() => {
                toast.error(messages.cadastradoErro('Serviço'));
            });
    }

    return (
        <div className="container">
            <div className="t-center mb-2">
                <h1> Cadastrar Serviço </h1>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to={Rotas.Home}>
                            <AiOutlineHome className="mr-1" />
                            Início
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to={Rotas.Servico}>
                            Serviço
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link>
                            Cadastrar Serviço
                            </Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <Form
                layout="vertical"
                onFinish={submitForm}
            >
                <Row gutter={8}>
                    <Col md={12} xs={24}>
                        <Form.Item
                            name="Servico"
                            label="Descrição do Serviço"
                            rules={[{ required: true, message: messages.CampoObrigatorio, }]}
                        >
                            <Input.TextArea
                                showCount
                                maxLength={200}
                                placeholder="Descrição do serviço"
                            />
                        </Form.Item>
                    </Col>
                    <Col md={4} xs={12}>
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
                    <Col md={2} xs={4}>
                        <Form.Item
                            label="Pago"
                            name="Pago">
                            <Switch
                                onChange={(value) => setPago(value)}
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                            />
                        </Form.Item>
                    </Col>
                    {pago &&
                        <Col md={3} xs={8}>
                            <Form.Item
                                label="Valor"
                                name="Valor"
                                rules={[{ required: pago, message: messages.CampoObrigatorio }]}>
                                <Input
                                    type="number"
                                    placeholder="Valor"
                                    min={0}
                                    step="0.1"
                                />
                            </Form.Item>
                        </Col>
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
