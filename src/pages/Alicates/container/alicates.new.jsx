import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Form, Input, DatePicker, Switch, Breadcrumb } from 'antd';
import { Row, Col } from 'antd';
import { messages } from '../../../common/Messages/messages';
import { Rotas } from '../../../Routes/rotas';
import { toast } from "react-toastify";

import service from '../service/alicates.service';
import BotaoCadastar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';

import { AiOutlineHome } from "react-icons/ai";
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

class AlicatesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Marca: '',
            Cliente: '',
            Quantidade: '',
            Valor: '',
            Data: '',
            Pago: false
        };
    }

    render() {
        const submitForm = (e) => {
            service.post(this.state)
                .then(() => {
                    toast.success(messages.cadastradoSucesso('Alicate'));
                })
                .catch(() => {
                    toast.error(messages.cadastradoErro('Alicate'));
                });
        }

        return (
            <div className="container">
                <div className="t-center mb-2">
                    <h1> Cadastrar Alicate </h1>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={Rotas.Home}>
                                <AiOutlineHome className="mr-2" />
                                Início
                        </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={Rotas.Alicates}>
                                Alicates
                        </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link>
                                Cadastrar Alicate
                        </Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <Form layout="vertical" onFinish={submitForm}>
                    <Row gutter={10}>
                        <Col span={12}>
                            <Form.Item
                                label="Cliente"
                                name="Cliente"
                                rules={[{ required: false, message: messages.CampoObrigatorio }]}>
                                <Input
                                    type="text"
                                    placeholder="Cliente"
                                    maxLength="50"
                                    onChange={(e) => this.setState({ Cliente: e.target.value })}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Marca"
                                name="Marca"
                                rules={[{ required: true, message: messages.CampoObrigatorio }]}>
                                <Input
                                    type="text"
                                    placeholder="Marca"
                                    maxLength="15"
                                    onChange={(e) => this.setState({ Marca: e.target.value })}
                                />
                            </Form.Item>
                        </Col>
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
                    </Row>
                    <Row gutter={10}>
                        <Col span={4}>
                            <Form.Item
                                label="Quantidade"
                                name="Quantidade"
                                rules={[{ required: true, message: messages.CampoObrigatorio }]}>
                                <Input
                                    type="number"
                                    placeholder="Quantidade"
                                    min={0}
                                    onChange={(e) => this.setState({ Quantidade: e.target.value })}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
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
                        <Col span={1}>
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

                    <BotaoCadastar/>
                </Form>
            </div>
        );
    }
}

export default withRouter(AlicatesForm);