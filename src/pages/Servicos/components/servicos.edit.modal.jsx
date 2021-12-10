import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Modal, Form, Input, DatePicker, Space, Switch } from 'antd';
import { Row, Col } from 'antd';
import { messages } from '../../../common/messages';
import { toast } from "react-toastify";
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

import moment from 'moment';
import service from '../service/servicos.service';

class ServicoEditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Servico: undefined,
            Data: undefined,
            Valor: undefined,
            Pago: undefined
        };
    }

    render() {
        const { visible, onClose } = this.props;
        const { servicoSelecionado } = this.props;

        const submitForm = () => {
            const dto = {
                Id: servicoSelecionado.Id,
                Servico: this.state.Servico ?? servicoSelecionado.Servico,
                Data: this.state.Data ?? servicoSelecionado.Data,
                Valor: this.state.Valor ?? servicoSelecionado.Valor,
                Pago: this.state.Pago ?? servicoSelecionado.Pago
            };

            service.update(dto)
                .then(() => {
                    toast.success(messages.EditadoSucesso('Serviço'));
                    this.setState({ Pago: undefined })
                    this.props.onClose();
                })
                .catch(() => {
                    toast.error(messages.EditadoErro('Serviço'));
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
                    Edição de Serviço
                </h2>

                <Form
                    initialValues={servicoSelecionado}
                    layout="vertical"
                >
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="Servico"
                                label="Serviço"
                                rules={[
                                    { required: true, message: messages.campoObrigatorio }
                                ]}
                            >
                                <Input.TextArea
                                    showCount
                                    maxLength={200}
                                    onChange={(e) => this.setState({ Servico: e.target.value })} 
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={8}>
                        <Col span={8}>
                            <Form.Item
                                name="Data"
                                label="Data de Cadastro"
                            >
                                <Space direction="vertical">
                                    <DatePicker
                                        format={'DD/MM/YYYY'}
                                        onChange={(date, dateString) => this.setState({ Data: dateString })}
                                        defaultValue={moment(servicoSelecionado.dataCadastro)} />
                                </Space>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
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
                        <Col span={4}>
                            <Form.Item
                                name="Pago"
                                label="Pago"
                            >
                                <Switch
                                    checked={
                                        this.state.Pago === undefined ?
                                            servicoSelecionado.Pago === 'Sim'
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
        )
    }
}


export default withRouter(ServicoEditModal);