import React from 'react';
import { messages } from '../../../common/Enum/messages';
import { Modal, Form, Input, Select } from 'antd';
import { Row, Col } from 'antd';
import { toast } from 'react-toastify';
import moment from 'moment';

import TituloModal from '../../../common/components/TituloModal/TituloModal';
import ChaveService from '../../../services/chave.service';
import BotaoCadastar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';

import { FaRegMoneyBillAlt } from "react-icons/fa";
import { AiOutlineCreditCard, AiOutlineSlack } from "react-icons/ai";

const ChaveCopiaModal = ({ visible, onClose, chaveSelecionada }) => {

    const { Option } = Select;

    const submitForm = async (form) => {
        let novaQuantidade = chaveSelecionada.Quantidade - Number(form.Quantidade);

        if (novaQuantidade < 0){
            toast.error(messages.estoqueIncorreto());
            return;
        }

        const dtoCopia = {
            IdChave: chaveSelecionada.Id,
            Data: moment().format('DD/MM/yyyy'),
            Quantidade: Number(form.Quantidade),
            Valor: parseFloat(form.Valor),
            TipoPagamento: form.TipoPagamento
        };

        await ChaveService.PostCopiaChave(dtoCopia)
            .then( async () => {
                
                chaveSelecionada.Quantidade = novaQuantidade;
                await ChaveService.Update(chaveSelecionada.Id, chaveSelecionada);
                toast.success(messages.cadastradoSucesso('Cópia de Chave'));
                onClose();

            })
            .catch(() => {
                toast.error(messages.cadastradoErro('Cópia de Chave'));
            })
    }

    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            destroyOnClose
            footer={null}
        >

            <TituloModal 
                titulo={'Cópia de Chave'} 
                subTitulo={'Preencha as informações sobre a cópia de chave'}
            />

            <Form layout={'vertical'} onFinish={submitForm}>
                <Row gutter={12}>

                    <Col md={6} sm={6} xs={12}>
                        <Form.Item
                            label="Quantidade"
                            name="Quantidade"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}
                        >
                            <Input
                                type="number"
                                placeholder="Quantidade"
                                max={chaveSelecionada.Quantidade}
                                min={1}
                                tabIndex={2}
                            />
                        </Form.Item>
                    </Col>

                    <Col md={6} sm={6} xs={12}>
                        <Form.Item
                            label="Valor da cópia"
                            name="Valor"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}
                        >
                            <Input
                                type="number"
                                placeholder="Valor"
                                min={1}
                                max={1000}
                                step="0.1"
                                tabIndex={3}
                            />
                        </Form.Item>
                    </Col>

                    <Col md={12} sm={12} xs={24}>
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
                </Row>

                <BotaoCadastar
                    funcaoCancelar={onClose}
                />

            </Form>

        </Modal >
    );
}

export default ChaveCopiaModal;