import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { Modal, Form, Input, Select } from 'antd';
import { messages } from '../../../common/Enum/messages';
import { toast } from "react-toastify";
import moment from 'moment';

import TituloModal from '../../../common/components/TituloModal/TituloModal';
import BotaoCadastrar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';

import ChaveService from '../../../services/chave.service';
import ConfiguracoesService from '../../../services/configuracoes.service';

const ChaveDescarteModal = ({ visible, onClose, chaveSelecionada }) => {

    const { Option } = Select;
    const [arrayMotivos, setArrayMotivos] = useState([]);


    useEffect( () => {

        function GetMotivosDescarte (){
            ConfiguracoesService.GetAllMotivosDescartes()
            .then((x) => {
                setArrayMotivos(x);
            });
        }

        GetMotivosDescarte();
        
    }, []);

    const submitForm = async (form) => {
        let novaQuantidade = chaveSelecionada.Quantidade - Number(form.Quantidade);

        if (novaQuantidade < 0) {
            toast.error(messages.estoqueIncorreto());
            return;
        }

        const dtoDescarte = {
            IdChave: chaveSelecionada.Id,
            IdMotivo: form.Motivo,
            Quantidade: Number(form.Quantidade),
            Data: moment().format('DD/MM/yyyy'),
        };

        await ChaveService.PostDescarte(dtoDescarte)
            .then( async() => {

                chaveSelecionada.Quantidade = novaQuantidade
                await ChaveService.Update(chaveSelecionada.Id, chaveSelecionada);
                toast.success(messages.cadastradoSucesso('Descarte de Chave'));
                onClose();
            })
            .catch(() => {
                toast.error(messages.cadastradoErro('Descarte de Chave'));
            })
    }

    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            footer={null}
            destroyOnClose
        >
            <TituloModal
                titulo={'Descarte de Chave'}
                subTitulo={'Selecione o motivo pelo qual esta chave deve ser descartada'}
            />

            <Form onFinish={submitForm} layout='vertical'>
                <Row gutter={10}>

                    <Col md={8} sm={8} xs={12}>
                        <Form.Item
                            label="Quantidade"
                            name="Quantidade"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}
                        >
                            <Input
                                type="number"
                                min={1}
                                max={chaveSelecionada?.Quantidade}
                                placeholder="Quantidade"
                                tabIndex={2}
                            />
                        </Form.Item>
                    </Col>

                </Row>

                <Row>

                    <Col md={24} sm={24} xs={24}>
                        <Form.Item
                            label={'Selecione o motivo do descarte'}
                            name={'Motivo'}
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}
                        >
                            <Select 
                                defaultValue="Selecione" 
                                tabIndex={3}
                            >
                                {arrayMotivos?.map(({Index, Motivo}) => (
                                    <Option 
                                        key={Index} 
                                        value={Index}
                                    >
                                        {Motivo}
                                    </Option>
                        ))}

                            </Select>
                        </Form.Item>
                    </Col>

                </Row>

                <BotaoCadastrar
                    funcaoCancelar={onClose}
                />
            </Form>

        </Modal >
    );

}

export default ChaveDescarteModal;