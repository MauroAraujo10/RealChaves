import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Form, Input, DatePicker, Switch, Breadcrumb } from 'antd';
import { Row, Col } from 'antd';
import { messages } from '../../../common/Messages/messages';
import { Rotas } from '../../../Routes/rotas';
import { toast } from "react-toastify";

import service from '../service/servicos.service';
import BotaoCadastrar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';

import { AiOutlineHome } from "react-icons/ai";
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

class ServicosNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Servico: '',
            Data: '',
            Valor: '',
            Pago: false
        };
    }

    render() {
        const submitForm = (e) => {
            service.post(this.state)
                .then(() => {
                    toast.success(messages.cadastradoSucesso('Serviço'));
                    this.props.history.replace(Rotas.Servico);
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
                                <AiOutlineHome className="mr-2" />
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
                        <Col span={24}>
                            <Form.Item
                                name="Descricao"
                                label="Descrição do Serviço"
                                rules={[{ required: true, message: messages.CampoObrigatorio, }]}
                            >
                                <Input.TextArea
                                    showCount
                                    maxLength={200}
                                    onChange={(e) => this.setState({ Servico: e.target.value })}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={12}>
                        <Col span={4}>
                            <Form.Item
                                label="Data"
                                name="Data"
                                rules={[{ required: true, message: messages.CampoObrigatorio }]}>
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    onChange={(date, dateString) => this.setState({ Data: dateString })}
                                    value={this.state.data} />
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Form.Item
                                label="Valor"
                                name="Valor"
                                rules={[{ required: true, message: messages.CampoObrigatorio }]}>
                                <Input
                                    type="number"
                                    placeholder="Valor"
                                    min={0}
                                    onChange={(e) => this.setState({ Valor: e.target.value })}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                label="Pago"
                                name="Pago">
                                <Switch
                                    onChange={(value) => this.setState({ Pago: value })}
                                    checkedChildren={<CheckOutlined />}
                                    unCheckedChildren={<CloseOutlined />}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <BotaoCadastrar />

                </Form>
            </div>
        );
    }
}

export default withRouter(ServicosNew);