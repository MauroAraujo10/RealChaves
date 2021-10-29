import React, { Component } from 'react';
import { messages } from '../../../common/messages';
import { Modal, Form, Input, DatePicker} from 'antd';
import { Row, Col } from 'antd';

class modalVendaVisible extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.submitForm = this.submitForm.bind(this);
    }

    async submitForm(){

    }

    render() {
        const { visible, onClose } = this.props;
        return (
            <Modal
                visible={visible}
                onCancel={onClose}
            >
                <h2 style={{ textAlign: 'center' }}>Venda de Chave</h2>
                <Form 
                    onFinish={(e) => this.submitForm(e)}>
                    <Row gutter={10}>
                        <Col span={12}>
                            <Form.Item
                                label="Quantidade"
                                name="Quantidade"
                                rules={[{ required: true, message: messages.CampoObrigatorio }]}
                            >
                                <Input type="Number" min="0" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Valor"
                                name="Valor"
                                rules={[{ required: true, message: messages.CampoObrigatorio }]}
                            >
                                <Input type="Number" min="0" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Item 
                            label="Data da Venda"
                            name="Data" 
                            rules={[{required: true, message: messages.CampoObrigatorio}]}>
                            <DatePicker />
                        </Form.Item>
                    </Row>
                </Form>

            </Modal>
        );
    }
}

export default modalVendaVisible;