import React, { Component } from 'react';
import { messages } from '../../../common/Messages/messages';
import { Modal, Form, Input, DatePicker, Button } from 'antd';
import { Row, Col } from 'antd';
import { BiSave } from "react-icons/bi";
import service from '../service/venda.service';

class modalVendaVisible extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: undefined,
            Quantidade: undefined,
            Valor: undefined,
        };
    }

    render() {
        const { visible, onClose } = this.props;

        const submitForm = () => {
            service.post(this.state);
        }

        return (
            <Modal
                visible={visible}
                onCancel={onClose}
                footer={null}
            >
                <h2 className="t-center">
                    Cópia de Chave
                </h2>

                <Form onFinish={submitForm}>
                    <Row>
                        <Form.Item
                            label="Data da Venda"
                            name="Data"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}
                        >
                            <DatePicker
                                format="DD/MM/YYYY"
                                onChange={(date, dateString) => this.setState({ Data: dateString })}
                                value={this.state.data}
                            />
                        </Form.Item>
                    </Row>

                    <Row gutter={10}>
                        <Col span={12}>
                            <Form.Item
                                label="Quantidade"
                                name="Quantidade"
                                rules={[{ required: true, message: messages.CampoObrigatorio }]}
                            >
                                <Input
                                    type="number"
                                    min="0"
                                    onChange={(e) => this.setState({ Quantidade: e.target.value })}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Valor"
                                name="Valor"
                                rules={[{ required: true, message: messages.CampoObrigatorio }]}
                            >
                                <Input
                                    type="number"
                                    min="0"
                                    onChange={(e) => this.setState({ Valor: e.target.value })}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <div className="mt-2 t-right">
                        <Button className="mr-3" onClick={onClose}>
                            Cancelar
                        </Button>

                        <Button type="primary" htmlType="submit">
                            <BiSave className="mr-2" size={16} />
                            Salvar
                        </Button>

                    </div>

                </Form>

            </Modal>
        );
    }
}

export default modalVendaVisible;