import React, { Component } from 'react'
import { Modal, Form, Row, Col, Input, DatePicker } from 'antd';
import { messages } from '../../../common/Messages/messages';
import { toast } from 'react-toastify';

import BotaoCadastrar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';
import Service from '../service/alicates.service';

class AlicatesBaixaModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            IdAlicate: undefined,
            DataEntrega: undefined,
            Quantidade: undefined,
            Valor: undefined
        }

        this.submitForm = this.submitForm.bind(this);
    }

    submitForm() {

        const { alicateSelecionado } = this.props;
        this.setState({ IdAlicate: alicateSelecionado.Id });

        const dto = {
            IdAlicate: alicateSelecionado.Id,
            DataEntrega: this.state.DataEntrega,
            Quantidade: alicateSelecionado.Quantidade
        };

        if (alicateSelecionado.Pago === "Sim")
            dto.Valor = alicateSelecionado.Valor
        else
            dto.Valor = this.state.Valor

        Service.postAmolacao(dto)
            .then(() => {
                Service.delete(dto.IdAlicate);
                toast.success(messages.cadastradoErro('Amolação'));
                this.props.onClose();
            })
            .catch(() => {
                toast.error(messages.cadastradoErro('Amolação'));
            })
    }

    render() {

        const { visible, onClose } = this.props;
        const { alicateSelecionado } = this.props;

        return (
            <Modal
                visible={visible}
                onCancel={onClose}
                footer={null}
                destroyOnClose
            >
                <div className="mb-2 t-center">
                    <h2>Baixa em Alicate</h2>
                    <hr />
                </div>

                <Form
                    layout="vertical"
                    onFinish={this.submitForm}
                >

                    <Row gutter={8}>
                        <Col span={10}>
                            <Form.Item
                                label="Data da Entrega"
                                name="Data"
                                rules={[{ required: true, message: messages.CampoObrigatorio }]}>
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    onChange={(date, dateString) => this.setState({ DataEntrega: dateString })}
                                />
                            </Form.Item>
                        </Col>
                        {
                            alicateSelecionado.Pago === "Não" && (
                                <Col span={10}>
                                    <Form.Item
                                        label="Valor pago"
                                        name="Valor"
                                        rules={[{ required: true, message: messages.CampoObrigatorio }]}>
                                        <Input
                                            type="text"
                                            placeholder="0,00"
                                            min={0}
                                            step="0.10"
                                            defaultValue="0,20"
                                            value="0,20"
                                            onChange={(e) => this.setState({ Valor: parseFloat(e.target.value) })}
                                        />
                                    </Form.Item>
                                </Col>
                            )
                        }
                    </Row>

                    {
                        alicateSelecionado.Pago === 'Sim' &&
                        (
                            <div className="mb-1 t-right">
                                {
                                    alicateSelecionado.Quantidade === 1 ?
                                        <b>* Este Alicate Já está Pago</b> :
                                        <b>* Estes Alicates Já estão Pagos</b>
                                }
                            </div>
                        )
                    }

                    <BotaoCadastrar
                        possuiCancelar
                        funcaoCancelar={onClose}
                    />

                </Form >

            </Modal >
        );
    }
}

export default AlicatesBaixaModal;