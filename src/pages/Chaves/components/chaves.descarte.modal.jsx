import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Modal, Form, Radio, DatePicker, Space, Input } from 'antd';
import { messages } from '../../../common/Messages/messages';
import { toast } from "react-toastify";

import { Descarte } from '../../../common/Messages/descarte'
import BotaoCadastrar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';

import descarteService from '../service/descarte.service';
import chaveService from '../service/chave.service';

class ChavesDescarteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            IdChave: undefined,
            Motivo: Descarte.Quebrou,
            QuantidadeDescartada: 0,
        };
        this.submitForm = this.submitForm.bind(this);
    }

    async submitForm() {

        this.setState({ IdChave: this.props.chaveSelecionada.Id });
        let novaQuantidade = this.props.chaveSelecionada.Quantidade - this.state.QuantidadeDescartada;

        if (novaQuantidade < 0) {
            toast.error(messages.estoqueIncorreto());
            return;
        }

        await descarteService.post(this.state)
            .then(() => {

                this.props.chaveSelecionada.Quantidade = novaQuantidade
                chaveService.update(this.props.chaveSelecionada);
                toast.success(messages.cadastradoSucesso('Descarte'));

                this.props.onClose();
            })
            .catch(() => {
                toast.error(messages.cadastradoErro('Descarte'));
            })
    }

    render() {
        const { visible, onClose } = this.props;

        return (
            <Modal
                visible={visible}
                onCancel={onClose}
                footer={null}
                destroyOnClose
            >
                <div className="t-center">
                    <h2 className="m-0">Descarte de Chave</h2>
                    <h5 style={{ color: 'gray' }}>Selecione o motivo pelo qual esta chave deve ser descartada</h5>
                    <hr />
                    <br />
                </div>

                <Form onFinish={this.submitForm}>
                    <Row gutter={6}>
                        <Col span={12}>
                            <Form.Item
                                label="Quantidade descartada"
                                name="QuantidadeDescartada"
                                rules={[{ required: true, message: messages.CampoObrigatorio }]}
                            >
                                <Input
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                    onChange={(e) => this.setState({ QuantidadeDescartada: Number(e.target.value) })}
                                />

                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item
                                label="Data"
                                name="Data"
                                rules={[{ required: true, message: messages.CampoObrigatorio }]}>
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    onChange={(date, dateString) => this.setState({ DataDescarte: dateString })}
                                    value={this.state.data} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Radio.Group
                        defaultValue={Descarte.Quebrou}
                        style={{ marginBottom: '10px' }}
                        onChange={(e) => this.setState({ Motivo: e.target.value })}
                    >
                        <Space direction="vertical">
                            <Radio value={Descarte.Quebrou} checked>{Descarte.Quebrou}</Radio>
                            <Radio value={Descarte.NaoFuncionou} >{Descarte.NaoFuncionou}</Radio>
                            <Radio value={Descarte.Perda} >{Descarte.Perda}</Radio>
                        </Space>
                    </Radio.Group>

                    <BotaoCadastrar
                        possuiCancelar
                        funcaoCancelar={onClose}
                    />
                </Form>

            </Modal >
        );
    }
}

export default ChavesDescarteModal;