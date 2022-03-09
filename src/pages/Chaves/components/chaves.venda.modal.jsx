import React, { Component } from 'react';
import { messages } from '../../../common/Messages/messages';
import { Modal, Form, Input, DatePicker } from 'antd';
import { Row, Col } from 'antd';
import BotaoCadastar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';
import { toast } from 'react-toastify';

import copiaService from '../service/venda.service';
import chaveService from '../service/chave.service';

class modalVendaVisible extends Component {
    constructor(props) {
        super(props);
        this.state = {
            IdProduto: undefined,
            Data: undefined,
            QuantidadeDeCopias: 0,
            Valor: undefined,
        };
        this.submitForm = this.submitForm.bind(this);
    }

    async submitForm() {
        debugger;

        this.setState({ IdProduto: this.props?.chaveSelecionada?.Id });
        let novaQuantidade = this.props.chaveSelecionada.Quantidade - this.state.QuantidadeDeCopias;

        if (novaQuantidade < 0) {
            toast.error(messages.quantidadeIncorreta());
            return;
        }

        copiaService.post(this.state, 'Chave')
            .then(() => {

                this.props.chaveSelecionada.Quantidade = novaQuantidade;
                chaveService.update(this.props.chaveSelecionada);
                toast.success(messages.cadastradoSucesso('Venda'));

                this.props.onClose();
            })
            .catch(() => {
                toast.error(messages.cadastradoErro('Venda'))
            });
    }

    render() {
        const { visible, onClose } = this.props;

        return (
            <Modal
                visible={visible}
                onCancel={onClose}
                destroyOnClose
                footer={null}
            >
                <h2 className="t-center">
                    Cópia de Chave
                </h2>

                <Form onFinish={this.submitForm}>
                    <Row>
                        <Form.Item
                            label="Data da Cópia"
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

                    <Row gutter={10} className="mb-2">
                        <Col span={12}>
                            <Form.Item
                                label="Quantidade de Cópias"
                                name="Quantidade"
                                rules={[{ required: true, message: messages.CampoObrigatorio }]}
                            >
                                <Input
                                    type="number"
                                    min="0"
                                    onChange={(e) => this.setState({ QuantidadeDeCopias: Number(e.target.value) })}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item
                                label="Valor"
                                name="Valor"
                                rules={[{ required: true, message: messages.CampoObrigatorio }]}
                            >
                                <Input
                                    type="number"
                                    min="0"
                                    step="0.10"
                                    onChange={(e) => this.setState({ Valor: parseFloat(e.target.value) })}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <BotaoCadastar
                        possuiCancelar
                        funcaoCancelar={onClose}
                    />

                </Form>

            </Modal>
        );
    }
}

export default modalVendaVisible;