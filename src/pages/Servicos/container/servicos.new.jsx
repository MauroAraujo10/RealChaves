import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Switch } from 'antd';
import { Row, Col } from 'antd';
import { messages } from '../../../common/Enum/messages';
import { Rotas } from '../../../Routes/rotas';
import { toast } from "react-toastify";
import moment from 'moment';

import service from '../service/servicos.service';
import HeaderForm from '../../../common/components/HeaderForm/HeaderForm';
import BotaoCadastrar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';

import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

const ServicosCadastro = () => {
    const [pago, setPago] = useState();
    const history = useHistory();

    const submitForm = async (form) => {
        const dto = {
            Descricao: form.Descricao,
            Data: moment().format('DD/MM/yyyy'),
            Pago: pago ?? false,
            Valor: form.Valor ? parseFloat(form.Valor) : 0
        };

        await service.Post(dto)
            .then(() => {
                toast.success(messages.cadastradoSucesso('Serviço'));
                history.push(Rotas.Servico);
            })
            .catch(() => {
                toast.error(messages.cadastradoErro('Serviço'));
            });
    }

    return (
        <div className="mt-2">

            <HeaderForm
                titulo={'Cadastrar Serviço'}
                listaCaminhos={['Serviços', 'Cadastrar Serviço']}
            />

            <Form
                layout="vertical"
                onFinish={submitForm}
                className='container-form'
            >
                <Row gutter={12}>

                    <Col md={12} xs={24}>
                        <Form.Item
                            label="Descrição do Serviço"
                            name="Descricao"
                            rules={[{ required: true, message: messages.CampoObrigatorio, }]}
                        >
                            <Input.TextArea
                                showCount
                                maxLength={200}
                                rows={4}
                                placeholder="Descrição do serviço"
                                autoFocus
                            />
                        </Form.Item>
                    </Col>
                    
                    <Col md={1} sm={3} xs={8}>
                        <Form.Item
                            label="Pago"
                            name="Pago">
                                <Switch
                                    defaultChecked={false}
                                    onChange={(value) => setPago(value)}
                                    checkedChildren={<CheckOutlined />}
                                    unCheckedChildren={<CloseOutlined />}
                                    tabIndex={1}
                                />
                        </Form.Item>

                    </Col>

                    <Col md={2} sm={8} xs={12}>
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
                                    tabIndex={2}
                                />
                            </Form.Item>
                        }
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
