import React, { useState } from 'react';
import { Modal, Form, Row, Col, Select, Button, DatePicker } from 'antd';
import { ResponsiveContainer, AreaChart, BarChart, LineChart, PieChart, Area, Bar, Line, Pie, Tooltip, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';

import Loading from '../../../common/components/Loading/Loading';

import TituloModal from '../../../common/components/TituloModal/TituloModal';
import { messages } from '../../../common/Enum/messages';
import { toast } from 'react-toastify';

const EstatisticasGraficoValorModal = ({ visible, onClose, arrayInformacoes }) => {
    const { Option } = Select;
    const [loading, setLoading] = useState(false);

    const [tipoDatePicker, setTipoDatePicker] = useState(null);
    const [date, setDate] = useState('');
    const [tipoGrafico, setTipoGrafico] = useState('');

    const [chartData, setChartData] = useState([]);
    const [chartVisible, setChartVisible] = useState(false);

    const closeModal = () => {
        setTipoDatePicker(null);
        setDate(null);
        setTipoGrafico(null);
        setChartData([]);
        setChartVisible(false);
    }

    const submitForm = (form) => {

        if (arrayInformacoes.Vetor.length > 0) {
            try {
                switch (form.Periodo) {
                    case "month":
                        let chartDataPerMonth = [];
                        let selectedMonth = form.DataPeriodo._d.getMonth() + 1;
                        let sizeOfVetor = new Date(new Date().getFullYear(), selectedMonth, 0).getDate();

                        for (let index = 1; index <= sizeOfVetor; index++) {
                            chartDataPerMonth.push({ name: index, valor: 0 });
                        }

                        arrayInformacoes.Vetor.forEach((x) => {
                            let monthConvertedDate = x.datasConvertida.Data.getMonth() + 1;
                            let dayConvertedDate = x.datasConvertida.Data.getDate();

                            if (monthConvertedDate === selectedMonth) {

                                if (form.TipoInformacao === 'Quantidade') {
                                    chartDataPerMonth[dayConvertedDate].valor = chartDataPerMonth[dayConvertedDate].valor + x.datasConvertida.Quantidade;
                                }

                                if (form.TipoInformacao === 'Valor') {
                                    chartDataPerMonth[dayConvertedDate].valor = chartDataPerMonth[dayConvertedDate].valor + x.datasConvertida.Valor;
                                }
                            }
                        })

                        setChartData(chartDataPerMonth);
                        break;

                    case "year":
                        let charDataPerYear = [
                            { name: 'Janeiro', valor: 0 },
                            { name: 'Fevereiro', valor: 0 },
                            { name: 'Março', valor: 0 },
                            { name: 'Abril', valor: 0 },
                            { name: 'Maio', valor: 0 },
                            { name: 'Junho', valor: 0 },
                            { name: 'Julho', valor: 0 },
                            { name: 'Agosto', valor: 0 },
                            { name: 'Setembro', valor: 0 },
                            { name: 'Outubro', valor: 0 },
                            { name: 'Novembro', valor: 0 },
                            { name: 'Dezembro', valor: 0 },
                        ];

                        arrayInformacoes.Vetor.forEach((x) => {
                            let anoSelecionado = form.DataPeriodo._d.getFullYear();
                            let anoDataConvertida = x.datasConvertida.Data.getFullYear();

                            if (anoSelecionado === anoDataConvertida) {
                                let indice = x.datasConvertida.Data.getMonth();

                                if (form.TipoInformacao === 'Quantidade')
                                    charDataPerYear[indice].valor = charDataPerYear[indice].valor + x.datasConvertida.Quantidade;

                                if (form.TipoInformacao === 'Valor')
                                    charDataPerYear[indice].valor = charDataPerYear[indice].valor + x.datasConvertida.Valor;
                            }
                        })

                        setChartData(charDataPerYear);
                        break;

                    default:
                        break;
                }

                setChartVisible(true);
                setLoading(false);
                setTipoGrafico(form.TipoGráfico);

            } catch (error) {
                setChartVisible(false);
                setLoading(false);
                toast.error('Erro ao gerar gráfico !');
            }
        }
    }

    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            footer={null}
            destroyOnClose={true}
            width={'1000px'}
            afterClose={() => closeModal()}
        >

            <TituloModal
                titulo={'Gráfico de Valores'}
                subTitulo={'Preencha as informações para gerar o gráfico'}
            />

            <Form layout={'vertical'} onFinish={submitForm}>
                <Row gutter={10}>
                    <Col md={4}>
                        <Form.Item
                            label={'Tipo de Informação'}
                            name={'TipoInformacao'}
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}
                        >
                            <Select
                                defaultValue="Selecione"
                            >
                                <Option value="Quantidade">Quantidade</Option>
                                <Option value="Valor">Valor</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col md={4}>
                        <Form.Item
                            label={'Período'}
                            name={'Periodo'}
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}
                        >
                            <Select
                                defaultValue="Selecione"
                                onChange={(value) => setTipoDatePicker(value)}
                            >
                                <Option value="month">Mês</Option>
                                <Option value="year">Ano</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col md={4}>
                        <Form.Item
                            label={tipoDatePicker ? tipoDatePicker === 'month' ? 'Selecione o Mês' : 'Selecione o Ano' : 'Selecione'}
                            name="DataPeriodo"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}>
                            <DatePicker
                                format={'MM'}
                                disabled={tipoDatePicker === null}
                                picker={tipoDatePicker}
                                onChange={(date, dateString) => setDate(date)}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={4}>
                        <Form.Item
                            label={'Tipo de Gráfico'}
                            name={'TipoGráfico'}
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}
                        >
                            <Select defaultValue="Selecione">
                                <Option value="Area">Area</Option>
                                <Option value="Barra">Barra</Option>
                                <Option value="Linhas">Linhas</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col md={2}>
                        <Button type="primary" htmlType="submit" style={{ marginTop: '30px' }}>
                            Gerar gráfico
                        </Button>
                    </Col>
                </Row>
                {
                    chartVisible &&
                    <div className="container">
                        {
                            loading ? <Loading /> :
                                <ResponsiveContainer height={500} style={{ margin: '20px' }}>
                                    {
                                        tipoGrafico === 'Area' ?
                                            <AreaChart data={chartData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Area
                                                    type="monotone"
                                                    dataKey="valor"
                                                    stroke="#004878"
                                                    fill="#8884d8"
                                                    label={{ position: 'top' }}
                                                    activeDot={{ r: 8 }} />
                                            </AreaChart>
                                            :
                                            tipoGrafico === 'Barra' ?
                                                <BarChart data={chartData}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="name" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Bar
                                                        dataKey="valor"
                                                        fill="#004878"
                                                        label={{ position: 'top' }}
                                                    />
                                                </BarChart>
                                                :
                                                tipoGrafico === 'Linhas' ?
                                                    <LineChart data={chartData}>
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <XAxis dataKey="name" />
                                                        <YAxis />
                                                        <Tooltip />
                                                        <Legend />
                                                        <Line
                                                            type="monotone"
                                                            dataKey="valor"
                                                            stroke="#004878"
                                                            label={{ position: 'top' }}
                                                            activeDot={{ r: 8 }} />
                                                    </LineChart>
                                                    :
                                                    <></>
                                    }
                                </ResponsiveContainer>
                        }
                    </div>
                }
            </Form>

        </Modal>
    )
}

export default EstatisticasGraficoValorModal;