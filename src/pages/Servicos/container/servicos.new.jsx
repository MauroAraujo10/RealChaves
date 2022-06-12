import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, DatePicker, Switch } from 'antd';
import { Row, Col } from 'antd';
import { messages } from '../../../common/Enum/messages';
import { Rotas } from '../../../Routes/rotas';
import { toast } from "react-toastify";
import service from '../service/servicos.service';
import HeaderForm from '../../../common/components/HeaderForm/HeaderForm';
import BotaoCadastrar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

const ServicosCadastro = () => {
    const [data, setData] = useState();
    const [pago, setPago] = useState();
    const history = useHistory();

    const submitForm = (form) => {
        const dto = {
            Servico: form.Servico,
            Data: data,
            Pago: pago,
            Valor: pago ? parseFloat(form.Valor) : 0
        };

        service.post(dto)
            .then(() => {
                toast.success(messages.cadastradoSucesso('Serviço'));
                history.push(Rotas.Servico);
            })
            .catch(() => {
                toast.error(messages.cadastradoErro('Serviço'));
            });
    }

    return (
        <div className="container mt-2">
            <HeaderForm
                titulo={'Cadastrar Serviço'}
                listaCaminhos={['Serviços', 'Cadastrar Serviço']}
            />

            <Form
                layout="vertical"
                onFinish={submitForm}
            >
                <Row gutter={20}>
                    <Col md={12} xs={24}>
                        <Form.Item
                            name="Servico"
                            label="Descrição do Serviço"
                            rules={[{ required: true, message: messages.CampoObrigatorio, }]}
                        >
                            <Input.TextArea
                                showCount
                                maxLength={200}
                                rows={5}
                                placeholder="Descrição do serviço"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item
                            label="Data"
                            name="Data"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}>
                            <DatePicker
                                format="DD/MM/YYYY"
                                onChange={(date, dateString) => setData(dateString)}
                            />
                        </Form.Item>
                        <Row gutter={10}>
                            <Col xs={8} sm={4} md={4} lg={4} xl={3} xxl={2}>
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
                            <Col xs={4} sm={8} md={8} lg={6} xl={4} xxl={4}>
                                {pago &&
                                    <Form.Item
                                        label="Valor"
                                        name="Valor"
                                        rules={[{ required: pago, message: messages.CampoObrigatorio }]}>
                                        <Input
                                            type="number"
                                            placeholder="Valor"
                                            min={1}
                                            step="0.1"
                                        />
                                    </Form.Item>
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <BotaoCadastrar
                    funcaoCancelar={() => history.push(Rotas.Servico)}
                />
            </Form>
        </div>
    );
}

export default ServicosCadastro;
