import React, { useState, useEffect } from 'react';
import { Modal, Form, DatePicker, Row, Col, Button, Progress } from 'antd';
import { toast } from "react-toastify";

import Loading from '../../../common/components/Loading/Loading';
import TituloModal from '../../../common/components/TituloModal/TituloModal'
import BotaoCadastrar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';
import { messages } from '../../../common/Enum/messages'

const EstatisticasDetalhesModal = ({ visible, onClose, arrayInformacoes }) => {
    const [loading, setLoading] = useState(false);
    const [dataInicial, setDataInicial] = useState('');
    const [dataFinal, setDataFinal] = useState('');
    const [valorCoincidente, setValorCoincidente] = useState(null);

    useEffect(() => {
        setValorCoincidente(null);
        console.log(arrayInformacoes);
    }, [arrayInformacoes]);

    const handleChangeData = (funcionalidade, date) => {
        if (funcionalidade === 'dataInicial') {
            setDataInicial(date);
        }
        else {
            setDataFinal(date);
        }
        setValorCoincidente(null);
    }

    const submitForm = (form) => {
        if (!dataInicial && !dataFinal) {
            toast.warning('Obrigatório preencher ao menos um dos campos !');
            return;
        }

        let dataInicialConvertida = dataInicial.toDate();
        let dataFinalConvertida = dataFinal.toDate();

        if (dataInicialConvertida > dataFinalConvertida) {
            toast.error('Data Inicial não pode ser maior do que a data final !');
            return;
        }

        setLoading(true);

        const valoresCoincidentes =
            arrayInformacoes.DatasConvertidas
                .filter(x => x >= dataInicialConvertida && x <= dataFinalConvertida)
                .length;

        setValorCoincidente(valoresCoincidentes);
        setLoading(false);
    }

    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            footer={null}
            destroyOnClose
        >
            <TituloModal
                titulo={'Busca Detalhada'}
                subTitulo={'Selecione o período pelo qual deseja buscar informação'}
            />

            <Form
                layout={'vertical'}
                onFinish={submitForm}
                style={{
                    padding: '10px',
                    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)'
                }}
            >
                <Row>
                    <Col xs={24} sm={24} md={10}>
                        <Form.Item
                            label={'Data Inicial'}
                            name={'dataInicial'}
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}
                        >
                            <DatePicker
                                format={'DD/MM/YYYY'}
                                onChange={(date, dateString) => handleChangeData('dataInicial', date)}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={10}>
                        <Form.Item
                            label={'Data Final'}
                            name={'dataFinal'}
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}
                        >
                            <DatePicker
                                format={'DD/MM/YYYY'}
                                onChange={(date, dateString) => handleChangeData('dataFinal', date)}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={4} sm={4} md={4}>
                        <Button
                            type={'primary'}
                            style={{ marginTop: '30px' }}
                            htmlType="submit"
                        >
                            Calcular
                        </Button>
                    </Col>
                </Row>


                {
                    loading ?
                        <Loading /> :
                        <>
                            {
                                valorCoincidente &&
                                <div className="t-center">
                                    <Progress
                                        type="circle"
                                        strokeColor={{
                                            '0%': '#004878',
                                            '100%': '#004878',
                                        }}
                                        showInfo
                                        percent={100}
                                        format={() => `${valorCoincidente === 0 ? valorCoincidente : 0}`}
                                    />
                                </div>
                            }
                        </>
                }

            </Form>

            <BotaoCadastrar
                isView
                funcaoCancelar={onClose}
            />
        </Modal>
    )
}

export default EstatisticasDetalhesModal;