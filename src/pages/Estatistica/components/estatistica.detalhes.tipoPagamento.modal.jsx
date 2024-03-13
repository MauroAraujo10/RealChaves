import React, { useState } from 'react'
import { Modal, Form, DatePicker, Table, Row, Col, Button } from 'antd';
import { toast } from "react-toastify";

import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

import Loading from '../../../common/components/Loading/Loading';
import TituloModal from '../../../common/components/TituloModal/TituloModal'
import BotaoCadastrar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';
import { messages } from '../../../common/Enum/messages';

const EstatisticaDetalhesTipoPagamentomodal = ({ visible, onClose, arrayInformacoes }) => {
    const [dataInicial, setDataInicial] = useState('');
    const [dataFinal, setDataFinal] = useState('');

    const [dataGrid, setDataGrid] = useState([]);
    const [quantidadeTotal, setQuantidadeTotal] = useState(0);
    const [valorTotal, setValorTotal] = useState(0);
    const [dataGraficoQuantidade, setDataGraficoQuantidade] = useState([]);
    const [dataGraficoValor, setDataGraficoValor] = useState([]);

    const [loading, setLoading] = useState(false);
    const [visibleDashBoard, setVisibleDashBoard] = useState(false);

    const handleChangeData = (funcionalidade, date) => {
        if (date) {
            date = date.set({
                hour: 0,
                minute: 0,
                second: 0,
                millisecond: 0
            });
        }

        if (funcionalidade === 'dataInicial')
            setDataInicial(date);
        else
            setDataFinal(date);
    }

    const submitForm = () => {

        if (!dataInicial && !dataFinal) {
            toast.warning('Obrigatório preencher ao menos um dos campos !');
            return;
        }

        let dataInicialConvertida = dataInicial.toDate();
        let dataFinalConvertida = dataFinal.toDate();

        if (dataInicialConvertida > dataFinalConvertida) {
            toast.warning('Data Inicial não pode ser maior do que a data final !');
            return;
        }

        setVisibleDashBoard(true);
        setLoading(true);

        let valoresCoincidentes = [];
        let quantidadeTotal = 0;
        let valorTotal = 0;

        let dinheiroQuantidade = 0;
        let CartaoDebitoQuantidade = 0;
        let CartaoCreditoQuantidade = 0;
        let PixQuantidade = 0;

        let dinheiroValor = 0;
        let CartaoDebitoValor = 0;
        let CartaoCreditoValor = 0;
        let PixValor = 0;

        arrayInformacoes.Vetor.forEach((element) => {
            if (element.DataCadastroConvertida >= dataInicialConvertida && element.DataCadastroConvertida <= dataFinalConvertida) {
                valoresCoincidentes.push({
                    DataCadastroReal: element.DataCadastroReal,
                    Quantidade: element.Quantidade,
                    Valor: element.Valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                })

                quantidadeTotal += element.Quantidade;
                valorTotal += element.Valor;

                switch (element.TipoPagamento) {
                    case 'Dinheiro':
                        dinheiroQuantidade += element.Quantidade;
                        dinheiroValor += element.Valor;
                        break;
                    case 'CartaoDebito':
                        CartaoDebitoQuantidade += element.Quantidade;
                        CartaoDebitoValor += element.Valor;
                        break;
                    case 'CartaoCredito':
                        CartaoCreditoQuantidade += element.Quantidade;
                        CartaoCreditoValor += element.Valor;
                        break;
                    case 'Pix':
                        PixQuantidade += element.Quantidade;
                        PixValor += element.Valor;
                        break;
                    default:
                        break;
                }

            }
        })

        let dataTipoPagamentoQuantidade = [
            { name: 'Dinheiro', value: dinheiroQuantidade },
            { name: 'CartaoDebito', value: CartaoDebitoQuantidade },
            { name: 'CartaoCredito', value: CartaoCreditoQuantidade },
            { name: 'Pix', value: PixQuantidade },
        ];

        let dataTipoPagamentoValor = [
            { name: 'Dinheiro', value: dinheiroValor },
            { name: 'CartaoDebito', value: CartaoDebitoValor },
            { name: 'CartaoCredito', value: CartaoCreditoValor },
            { name: 'Pix', value: PixValor },
        ];

        setDataGrid(valoresCoincidentes);
        setQuantidadeTotal(quantidadeTotal);
        setValorTotal(valorTotal);
        setDataGraficoQuantidade(dataTipoPagamentoQuantidade);
        setDataGraficoValor(dataTipoPagamentoValor);
        setLoading(false);
    }

    const columns = [
        { title: 'Data', dataIndex: 'DataCadastroReal', key: 'DataCadastroReal', width: '20%' },
        { title: 'Quantidade', dataIndex: 'Quantidade', key: 'Quantidade', width: '20%' },
        { title: 'Valor', dataIndex: 'Valor', key: 'Valor', width: '20%' },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const cancelModal = () => {
        setVisibleDashBoard();
        onClose();
    }

    return (
        <Modal
            visible={visible}
            onCancel={() => cancelModal()}
            width={1200}
            footer={null}
            destroyOnClose={true}

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
                    <Col md={4} xs={24}>
                        <Form.Item
                            label={'Data Inicial'}
                            name={'dataInicial'}
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}
                        >
                            <DatePicker
                                format={'DD/MM/YYYY'}
                                disabledTime
                                onChange={(date, dateString) => handleChangeData('dataInicial', date)}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={4} xs={24}>
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
                    <Col md={4} xs={24}>
                        <Button
                            type={'primary'}
                            style={{ marginTop: '30px' }}
                            htmlType="submit"
                        >
                            Calcular
                        </Button>
                    </Col>
                </Row>
            </Form>

            {
                visibleDashBoard ?
                    loading ?
                        <Loading />
                        :
                        <>
                            <Row gutter={12}>

                                <Col md={4} xs={24}>
                                    <div className='Estatistica-Busca-Detalhada-Card'>
                                        Quantidade encontrada
                                        <p style={{ fontSize: '24px' }}>
                                            <b>{quantidadeTotal}</b>
                                        </p>
                                    </div>
                                </Col>

                                <Col md={4} xs={24}>
                                    <div className='Estatistica-Busca-Detalhada-Card'>
                                        Valor registrado
                                        <p style={{ fontSize: '24px' }}>
                                            <b>{valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</b>
                                        </p>
                                    </div>
                                </Col>

                                <Col md={8} xs={24}>
                                    <div className='Estatistica-Busca-Detalhada-Card'>
                                        <p>Tipo de pagamento por quantidade</p>
                                        <PieChart width={200} height={300}>
                                            <Pie
                                                dataKey="value"
                                                data={dataGraficoQuantidade}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}

                                                outerRadius={80}
                                                fill="#8884d8"
                                            >
                                                {dataGraficoQuantidade.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Legend />
                                            <Tooltip />
                                        </PieChart>
                                    </div>
                                </Col>

                                <Col md={8} xs={24}>
                                    <div className='Estatistica-Busca-Detalhada-Card'>
                                        <p>Tipo de pagamento por valor (R$)</p>
                                        <PieChart width={200} height={300}>
                                            <Pie
                                                dataKey="value"
                                                data={dataGraficoValor}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}

                                                outerRadius={80}
                                                fill="#8884d8"
                                            >
                                                {dataGraficoValor.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Legend />
                                            <Tooltip />
                                        </PieChart>
                                    </div>
                                </Col>
                            </Row>

                            <Table
                                className='Grid container'
                                dataSource={dataGrid}
                                columns={columns}
                            />
                        </>
                    :
                    <></>
            }

            <BotaoCadastrar
                isView
                funcaoCancelar={onClose}
            />

        </Modal>
    )
}

export default EstatisticaDetalhesTipoPagamentomodal;