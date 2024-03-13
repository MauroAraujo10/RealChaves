import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Select, Switch } from 'antd';
import { Row, Col } from 'antd';
import { messages } from '../../../common/Enum/messages';
import { Rotas } from '../../../Routes/rotas';
import { toast } from "react-toastify";

import AmolacaoService from '../../../services/amolacao.service';
import BotaoCadastar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';
import HeaderForm from '../../../common/components/HeaderForm/HeaderForm';
import Inputmask from 'inputmask';

import { AiOutlineFork, AiOutlineScissor, AiOutlineCreditCard, AiOutlineSlack } from "react-icons/ai";
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { RiKnifeLine } from "react-icons/ri";
import { FaRegMoneyBillAlt } from "react-icons/fa";

const AmolacaoCadastro = () => {
    const { Option } = Select;
    const [pago, setPago] = useState(false);
    const history = useHistory();
    const telefoneRef = useRef(null);

    useEffect(() => {
        Inputmask({ mask: '(99) 9999-9999[9]' }).mask(telefoneRef.current);
    }, [])

    const submitForm = async (form) => {

        const dto = {
            Cliente: form.Cliente,
            Telefone: form.Telefone ?? "",
            Tipo: form.Tipo,
            Marca: form.Marca,
            Quantidade: Number(form.Quantidade),
            Pago: pago ?? false,
            TipoPagamento: pago ? form.TipoPagamento : ''
        };

        await AmolacaoService.Post(dto)
            .then(async (idProduto) => {
                if (dto.Pago) {
                    const dto = {
                        IdProduto: idProduto,
                        Quantidade: Number(form.Quantidade),
                        TipoProduto: form.Tipo,
                        Valor: parseFloat(form.Valor ?? 0),
                        TipoPagamento: form.TipoPagamento
                    };
                    await AmolacaoService.PostPagamento(dto);
                }
                toast.success(messages.cadastradoSucesso(form.Tipo));
                history.push(Rotas.AmolacaoEstoque);
            })
            .catch(() => {
                toast.error(messages.cadastradoErro(dto.Produto));
            })
    }

    return (
        <div className="mt-2">

            <HeaderForm
                titulo={'Cadastrar Produto'}
                listaCaminhos={['Amolação', 'Cadastro']}
            />

            <Form
                layout="vertical"
                onFinish={submitForm}
                className='container-form'
            >

                <Row gutter={10}>

                    <Col md={8} xs={24}>
                        <Form.Item
                            label="Cliente"
                            name="Cliente"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}>
                            <Input
                                type="text"
                                placeholder="Cliente"
                                maxLength={70}
                                autoFocus
                            />
                        </Form.Item>
                    </Col>

                    <Col md={4} xs={24} className="mr-2">
                        <Form.Item
                            label="Telefone"
                            name="Telefone">
                            <Input
                                type="text"
                                placeholder="Telefone"
                                ref={telefoneRef}
                                maxLength={15}
                                tabIndex={0}
                            />
                        </Form.Item>
                    </Col>

                    <Col md={4} xs={24}>
                        <Form.Item
                            label="Produto"
                            name="Tipo"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}
                            tabIndex={1}
                        >
                            <Select defaultValue="Selecione" >
                                <Option value="Alicate">
                                    <AiOutlineFork className="mr-1" />
                                    Alicate
                                </Option>
                                <Option value="Tesoura">
                                    <AiOutlineScissor className="mr-1" />
                                    Tesoura
                                </Option>
                                <Option value="Faca" >
                                    <RiKnifeLine className="mr-1" />
                                    Faca
                                </Option>
                            </Select>

                        </Form.Item>
                    </Col>

                    <Col md={6} xs={24}>
                        <Form.Item
                            label="Marca"
                            name="Marca"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}
                            tabIndex={2}>
                            <Input
                                type="text"
                                placeholder="Marca"
                                maxLength={15}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={10}>

                    <Col md={2} sm={7} xs={24}>
                        <Form.Item
                            label="Quantidade"
                            name="Quantidade"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}
                            tabIndex={3}
                        >
                            <Input
                                type="number"
                                placeholder="Quantidade"
                                min={1}
                                max={25}
                            />
                        </Form.Item>

                    </Col>

                    <Col md={1} sm={3} xs={6} className="mr-2">

                        <Form.Item
                            label="Pago"
                            name="Pago"
                            tabIndex={4}
                        >
                            <Switch
                                onChange={(value) => setPago(value)}
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                                tabIndex={4}
                            />
                        </Form.Item>
                    </Col>


                    {pago &&
                        <>
                            <Col md={2} sm={6} xs={14}>
                                <Form.Item
                                    label="Valor pago"
                                    name="Valor"
                                    rules={[{ required: true, message: messages.CampoObrigatorio }]}>
                                    <Input
                                        type="number"
                                        placeholder="Valor"
                                        min="0.1"
                                        step="0.10"
                                        tabIndex={5}
                                    />
                                </Form.Item>
                            </Col>
                            <Col lg={4} md={2} sm={7} xs={24}>
                                <Form.Item
                                    label={"Tipo de Pagamento"}
                                    name="TipoPagamento"
                                    rules={[{ required: true, message: messages.CampoObrigatorio }]}
                                >
                                    <Select defaultValue="Selecione" tabIndex={4}>
                                        <Option value="Dinheiro">
                                            <FaRegMoneyBillAlt size={16} className="mr-2" />
                                            Dinheiro
                                        </Option>
                                        <Option value="CartaoDebito">
                                            <AiOutlineCreditCard size={16} className="mr-2" />
                                            Cartão de Débito
                                        </Option>
                                        <Option value="CartaoCredito">
                                            <AiOutlineCreditCard size={16} className="mr-2" />
                                            Cartão de Crédito
                                        </Option>
                                        <Option value="Pix" >
                                            <AiOutlineSlack size={16} className="mr-2" />
                                            Pix
                                        </Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </>
                    }
                </Row>

                <BotaoCadastar
                    funcaoCancelar={() => history.push(Rotas.AmolacaoEstoque)}
                    tabIndex={6}
                />
            </Form>
        </div >
    )
}

export default AmolacaoCadastro;