import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Input, Select, DatePicker, Switch, Breadcrumb } from 'antd';
import { Row, Col } from 'antd';
import { messages } from '../../../common/Enum/messages';
import { Rotas } from '../../../Routes/rotas';
import { toast } from "react-toastify";
import moment from 'moment';

import amolacaoService from '../service/amolacao.service';
import BotaoCadastar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';

import { AiOutlineHome, AiOutlineFork, AiOutlineScissor } from "react-icons/ai";
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { RiKnifeLine } from "react-icons/ri";

const AmolacaoCadastro = () => {
    const history = useHistory();
    const { Option } = Select;
    const [pago, setPago] = useState(false);
    const [data, setData] = useState('');

    const submitForm = (form) => {
        const dto = {
            Cliente: form.Cliente,
            Telefone: form.Telefone,
            Produto: form.Produto,
            Marca: form.Marca,
            DataRecebimento: data,
            Quantidade: Number(form.Quantidade),
            Pago: pago,
            Valor: pago ? parseFloat(form.Valor) : 0
        }

        if (pago) {
            dto.DataEntrega = moment().format('DD/MM/YYYY');
            amolacaoService.postBaixaProduto(dto)
                .then(() => {
                    toast.success(messages.cadastradoSucesso('Produto'));
                    // Refatora: Limpar os campos
                    history.push(Rotas.AmolacaoCadastro);
                })
                .catch(() => {
                    toast.error(messages.cadastradoErro('Produto'));
                });
        }
        else {
            amolacaoService.postProduto(dto)
                .then(() => {
                    toast.success(messages.cadastradoSucesso('Produto'));
                    history.push(Rotas.AmolacaoEstoque);
                })
                .catch(() => {
                    toast.error(messages.cadastradoErro('Produto'));
                });
        }
    }

    return (
        <div className="container">
            <div className="t-center mb-2">
                <h1> Cadastrar Produto </h1>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to={Rotas.Home}>
                            <AiOutlineHome className="mr-1" />
                            Início
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Amolação</Breadcrumb.Item>
                    <Breadcrumb.Item>Cadastro</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <Form layout="vertical" onFinish={submitForm}>
                <Row gutter={10}>
                    <Col md={8} xs={24}>
                        <Form.Item
                            label="Cliente"
                            name="Cliente"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}>
                            <Input
                                type="text"
                                placeholder="Cliente"
                                maxLength="50"
                            />
                        </Form.Item>
                    </Col>
                    <Col md={4} xs={24} className="mr-2">
                        <Form.Item
                            label="Telefone"
                            name="Telefone">
                            <Input
                                type="text"
                                placeholder="Telefone"
                                maxLength="15"
                            />
                        </Form.Item>
                    </Col>
                    <Col md={4} xs={24}>
                        <Form.Item
                            label="Produto"
                            name="Produto"
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
                    <Col md={6} xs={24}>
                        <Form.Item
                            label="Marca"
                            name="Marca"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}>
                            <Input
                                type="text"
                                placeholder="Marca"
                                maxLength="15"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col md={3} xs={10}>
                        <Form.Item
                            label="Data Recebimento"
                            name="Data"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}>
                            <DatePicker
                                format="DD/MM/YYYY"
                                onChange={(date, dateString) => setData(dateString)}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={3} xs={10}>
                        <Form.Item
                            label="Quantidade"
                            name="Quantidade"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}>
                            <Input
                                type="number"
                                placeholder="Quantidade"
                                min={1}
                                max={25}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={1} xs={4} className="mr-2">
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
                    <Col md={2} xs={14}>
                        {pago &&
                            <Form.Item
                                label="Valor pago"
                                name="Valor"
                                rules={[{ required: true, message: messages.CampoObrigatorio }]}>
                                <Input
                                    type="number"
                                    placeholder="Valor"
                                    min="0.1"
                                    step="0.10"
                                />
                            </Form.Item>
                        }
                    </Col>
                </Row>
                <BotaoCadastar
                    funcaoCancelar={() => history.push(Rotas.AmolacaoHistoricoAmolacoes)}
                />
            </Form>
        </div>
    )
}

export default AmolacaoCadastro;