import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Form, Input, DatePicker, Space, Switch } from 'antd';
import { Row, Col } from 'antd';
import { messages } from '../../../common/Messages/messages';
import { toast } from "react-toastify";
import moment from 'moment';

import service from '../service/alicates.service';

import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

class AlicatesEditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Cliente: undefined,
            Marca: undefined,
            Quantidade: undefined,
            Valor: undefined,
            Data: undefined,
            Pago: undefined
        };
    }

    render() {
        const { visible, onClose } = this.props;
        const { alicateSelecionado } = this.props;

        const submitForm = () => {
            const dto = {
                Id: alicateSelecionado.Id,
                Cliente: this.state.Cliente ?? alicateSelecionado.Cliente,
                Marca: this.state.Marca ?? alicateSelecionado.Marca,
                Quantidade: this.state.Quantidade ?? alicateSelecionado.Quantidade,
                Valor: this.state.Valor ?? alicateSelecionado.Valor,
                Data: this.state.Data ?? alicateSelecionado.Data,
                Pago: this.state.Pago ?? alicateSelecionado.Pago
            };

            service.update(dto)
                .then(() => {
                    toast.success(messages.EditadoSucesso('Alicate'));
                    this.setState({ Pago: undefined })
                    this.props.onClose();
                })
                .catch(() => {
                    toast.error(messages.EditadoErro('Alicate'));
                })
        }

        return (
            <Modal
                visible={visible}
                onCancel={onClose}
                onOk={submitForm}
                destroyOnClose
            >
                <h2 className="t-center">
                    Edição de Alicate
                </h2>

                <Form
                    initialValues={alicateSelecionado}
                    layout="vertical"
                >

                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="Cliente"
                                label="Cliente"
                                rules={[
                                    { required: true, message: messages.campoObrigatorio }
                                ]}
                            >
                                <Input
                                    type="text"
                                    autoFocus
                                    maxLength={50}
                                    onChange={(e) => this.setState({ Cliente: e.target.value })}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="Marca"
                                label="Marca"
                                rules={[
                                    { required: true, message: messages.campoObrigatorio }
                                ]}
                            >
                                <Input
                                    type="text"
                                    maxLength={20}
                                    onChange={(e) => this.setState({ Marca: e.target.value })}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={8}>
                        <Col span={6}>
                            <Form.Item
                                name="Quantidade"
                                label="Quantidade"
                                rules={[
                                    { required: true, message: messages.campoObrigatorio }
                                ]}
                            >
                                <Input
                                    type="number"
                                    max={10}
                                    min={0}
                                    onChange={(e) => this.setState({ Quantidade: e.target.value })}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="Valor"
                                label="Valor"
                                rules={[
                                    { required: true, message: messages.campoObrigatorio }
                                ]}
                            >
                                <Input
                                    type="number"
                                    min={0}
                                    max={1000}
                                    onChange={(e) => this.setState({ Valor: e.target.value })}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="Data"
                                label="Data de Cadastro"
                            >
                                <Space direction="vertical">
                                    <DatePicker
                                        format={'DD/MM/YYYY'}
                                        onChange={(date, dateString) => this.setState({ Data: dateString })}
                                        defaultValue={moment(alicateSelecionado.dataCadastro)} />
                                </Space>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                name="Pago"
                                label="Pago"
                            >
                                <Switch
                                    checked={
                                        this.state.Pago === undefined ?
                                            alicateSelecionado.Pago === 'Sim'
                                            :
                                            this.state.Pago
                                    }
                                    onChange={(value) => this.setState({ Pago: value })}
                                    checkedChildren={<CheckOutlined />}
                                    unCheckedChildren={<CloseOutlined />}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        );
    }

}

export default withRouter(AlicatesEditModal);